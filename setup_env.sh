cd "$(dirname "$0")/client"
if [ -f package-lock.json ]; then
    npm ci --no-audit --no-fund
else
    npm install --no-audit --no-fund
fi
CI=true npm test -- --watchAll=false
