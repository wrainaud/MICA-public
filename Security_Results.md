# Security Scan Results
- Generated: 2025-10-28T22:55:00Z

## Summary
- Potential secrets: 0 confirmed, 3 references to env/keys documentation
- Risky patterns: 1 (insecure HTTP URL in client for image icon)
- Dependency audit: Skipped (Node/npm not available in environment)

## Potential Secrets (high severity)
No hardcoded secrets were found in tracked files. However, the repository references environment files and API keys in documentation:
- README.md: mentions `secrets.env` and obtaining API keys
- client/package.json: uses `env-cmd -f secrets.env`
- server-backup/MICA-API.js: references `process.env.dbpassword` (environment variable)

Recommendations:
- Ensure `secrets.env`, `aws-exports.js`, and similar files remain in .gitignore (they are referenced in README.md and .gitignore).
- Use a secret manager (e.g., AWS Secrets Manager, HashiCorp Vault) for production secrets and CI.

## Risky Patterns (medium severity)
- client/src/pages/WeatherDisplay/DisplayWeather.js:4 — Insecure HTTP URL
  - Snippet: `const iconurl = "http://openweathermap.org/img/wn/" + ... + ".png";`
  - Recommendation: Use `https://openweathermap.org/img/wn/` to avoid mixed-content and MITM risks.

Other occurrences of `http://` were in documentation links only (README files) and are informational.

No uses of `eval`, `new Function`, or `child_process` APIs were detected in source code.

## SQL Review
- No `GRANT ALL` or unsafe `DROP` statements detected in SQL files.

## Dependency Audit
- Root package.json present but npm is not available in this environment, so `npm audit` could not be executed.
- client/package.json present; audit also skipped for the same reason.

Recommendations:
- When a Node environment is available, run:
  - In repo root: `npm audit --audit-level=high || true`
  - In client/: `npm audit --audit-level=high || true`
- Consider upgrading dependencies flagged by audit and pinning versions where appropriate.

## Methodology
- Heuristic offline scan across text files for: potential secrets (API keys, tokens, private keys), risky JavaScript usage (eval/new Function/child_process), insecure HTTP URLs, and risky SQL patterns.
- Reviewed documentation and configuration for references to secrets and environment files.

---
Generated automatically by a lightweight scanner script prepared for this repository.