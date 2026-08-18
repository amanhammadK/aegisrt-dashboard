# AegisRT Dashboard — AI Security Audit Platform

Autonomous Red Team security agent that stress-tests your LLM applications for vulnerabilities.

## Features

- **27 built-in probes** covering OWASP LLM Top 10
- **636 test seeds** for comprehensive coverage
- **Real-time HUD** showing attack vectors and threat levels
- **Security grading** (A-F) with detailed reports
- **SARIF/JUnit export** for CI/CD integration

## Quick Start

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn api:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

## API

```bash
POST /api/scan
{
  "target_url": "https://api.your-app.com/v1/chat",
  "scan_type": "full"
}
```

## Pricing

- Single Audit: $99
- Monthly (10 audits): $499
- Enterprise (unlimited): $1999

## License

MIT
