#!/usr/bin/env node
/**
 * Lightweight offline security scanner for this repo.
 * - Scans for likely secrets and risky patterns
 * - Optionally runs npm audit where available
 * - Outputs Security_Results.md at repo root
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'Security_Results.md');
const now = new Date().toISOString();

const IGNORE_DIRS = new Set([
  '.git','node_modules','.next','.cache','dist','build','.expo','.vscode','.idea','coverage','.DS_Store'
]);
const TEXT_EXT = new Set(['.js','.jsx','.ts','.tsx','.json','.md','.env','.yml','.yaml','.sql','.sh','.html','.css']);

const secretRegexes = [
  {name: 'AWS Access Key ID', re: /(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])/},
  {name: 'AWS Secret Access Key', re: /(?<![A-Za-z0-9+\/])[A-Za-z0-9+\/]{40}(?![A-Za-z0-9+\/])/},
  {name: 'Generic API Key', re: /(api[-_ ]?key)\s*[:=]\s*['\"]?[A-Za-z0-9_\-]{16,}['\"]?/i},
  {name: 'Bearer/Access Token', re: /(bearer|access|secret|token)\s*[:=]\s*['\"][A-Za-z0-9_\-\.]{16,}['\"]/i},
  {name: 'Private Key PEM', re: /-----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY-----/},
  {name: 'Password assignment', re: /(password|pass|pwd)\s*[:=]\s*['\"][^'\"]{4,}['\"]/i},
  {name: '.env file reference', re: /(secrets?\.env|\.env)/i},
];

const riskyJsRegexes = [
  {name: 'eval()', re: /\beval\s*\(/},
  {name: 'new Function()', re: /new\s+Function\s*\(/},
  {name: 'child_process exec/spawn', re: /child_process\.(exec|execSync|spawn|spawnSync)/},
  {name: 'Insecure HTTP URL', re: /(fetch|axios\.|XMLHttpRequest|http\.)[^\n]*http:\/\//},
];

const sqlRegexes = [
  {name: 'GRANT ALL', re: /GRANT\s+ALL\b/i},
  {name: 'DROP without IF EXISTS', re: /\bDROP\s+(TABLE|DATABASE)\s+(?!IF\s+EXISTS)/i},
];

function isTextFile(file){
  const ext = path.extname(file).toLowerCase();
  if (TEXT_EXT.has(ext)) return true;
  // Heuristic: small files without NUL bytes
  try {
    const buf = fs.readFileSync(file);
    if (buf.length > 1024*1024) return false; // skip big unknown files
    return buf.indexOf(0) === -1;
  } catch {return false;}
}

function walk(dir){
  const out = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})){
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    try{
      if (entry.isDirectory()) out.push(...walk(full));
      else out.push(full);
    }catch{/* ignore permission errors */}
  }
  return out;
}

function scanFile(file){
  const ext = path.extname(file).toLowerCase();
  if (!isTextFile(file)) return [];
  let content;
  try { content = fs.readFileSync(file, 'utf8'); } catch { return []; }
  const findings = [];

  const addMatches = (rules, severity) => {
    for (const rule of rules){
      const re = rule.re;
      let m;
      const regex = new RegExp(re.source, re.flags?.includes('g') ? re.flags : (re.flags||'') + 'g');
      while ((m = regex.exec(content))){
        const idx = m.index;
        const start = content.lastIndexOf('\n', idx) + 1;
        const end = content.indexOf('\n', idx);
        const line = content.slice(start, end === -1 ? undefined : end).trim();
        const lineNo = content.slice(0, start).split('\n').length;
        findings.push({ file, lineNo, line: line.slice(0, 300), rule: rule.name, severity });
        if (findings.length > 50) break; // cap per-file
      }
    }
  };

  addMatches(secretRegexes, 'high');
  if (ext === '.js' || ext === '.jsx' || ext === '.ts' || ext === '.tsx') addMatches(riskyJsRegexes, 'medium');
  if (ext === '.sql') addMatches(sqlRegexes, 'medium');

  return findings;
}

function npmAudit(dir){
  if (!fs.existsSync(path.join(dir, 'package.json'))) return null;
  try {
    const stdout = execSync('npm audit --json', { cwd: dir, stdio: ['ignore','pipe','pipe'], timeout: 60_000 });
    const data = JSON.parse(stdout.toString());
    return data;
  } catch (e){
    // return textual error to include
    return { error: (e.stdout?.toString() || e.message || 'npm audit failed') };
  }
}

function formatAudit(audit){
  if (!audit) return '';
  if (audit.error) return `npm audit error: ${audit.error}`;
  const advisories = audit.vulnerabilities || audit.advisories || {};
  const counts = audit.metadata?.vulnerabilities || audit.vulnerabilities || {};
  const lines = [];
  lines.push('Vulnerability counts by severity:');
  for (const sev of ['critical','high','moderate','low']){
    const n = counts[sev] || 0;
    lines.push(`- ${sev}: ${n}`);
  }
  return lines.join('\n');
}

function main(){
  const files = walk(ROOT);
  const findings = [];
  for (const f of files){
    findings.push(...scanFile(f));
  }

  const rootAudit = npmAudit(ROOT);
  const clientAudit = npmAudit(path.join(ROOT, 'client'));

  const lines = [];
  lines.push(`# Security Scan Results`);
  lines.push(`- Generated: ${now}`);
  lines.push('');
  lines.push('## Summary');
  const high = findings.filter(f=>f.severity==='high').length;
  const med = findings.filter(f=>f.severity==='medium').length;
  lines.push(`- Potential secrets: ${high}`);
  lines.push(`- Risky patterns: ${med}`);
  lines.push('');

  lines.push('## Potential Secrets (high severity)');
  const secrets = findings.filter(f=>f.severity==='high');
  if (secrets.length===0) lines.push('- None found.');
  else {
    for (const f of secrets.slice(0, 200)){
      lines.push(`- ${path.relative(ROOT, f.file)}:${f.lineNo} — ${f.rule}`);
      lines.push('  - Snippet: ' + f.line.replace(/\t/g,' ').slice(0,200));
    }
    if (secrets.length>200) lines.push(`- ...and ${secrets.length-200} more`);
  }

  lines.push('');
  lines.push('## Risky Patterns (medium severity)');
  const risky = findings.filter(f=>f.severity==='medium');
  if (risky.length===0) lines.push('- None found.');
  else {
    for (const f of risky.slice(0, 200)){
      lines.push(`- ${path.relative(ROOT, f.file)}:${f.lineNo} — ${f.rule}`);
      lines.push('  - Snippet: ' + f.line.replace(/\t/g,' ').slice(0,200));
    }
    if (risky.length>200) lines.push(`- ...and ${risky.length-200} more`);
  }

  lines.push('');
  lines.push('## Dependency Audit');
  lines.push('### Root');
  lines.push(formatAudit(rootAudit) || 'No package.json or audit output.');
  lines.push('');
  lines.push('### client/');
  lines.push(formatAudit(clientAudit) || 'No package.json or audit output.');

  lines.push('');
  lines.push('## Notes');
  lines.push('- This is an automated, heuristic scan. Review findings for false positives.');
  lines.push('- Secrets referenced via env files are noted; ensure .env/secrets files are git-ignored.');

  fs.writeFileSync(OUTPUT, lines.join('\n'));
  console.log(`Security scan complete. Wrote ${OUTPUT}`);
}

main();
