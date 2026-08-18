# AegisRT Dashboard — AI Security Audit Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Python](https://img.shields.io/badge/Python-3.10+-blue)](https://www.python.org)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-green)](https://fastapi.tiangolo.com)
[![OWASP](https://img.shields.io/badge/OWASP-LLM%20Top%2010-red)](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

Autonomous Red Team security agent that stress-tests your LLM applications for vulnerabilities. AegisRT provides comprehensive security auditing against the OWASP LLM Top 10 with real-time monitoring, detailed reporting, and CI/CD integration.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Security Probes](#security-probes)
- [Reporting](#reporting)
- [Enterprise Features](#enterprise-features)
- [Pricing](#pricing)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Core Capabilities

- **27 Built-in Probes** — Comprehensive coverage of OWASP LLM Top 10 vulnerabilities
- **636 Test Seeds** — Pre-built attack vectors for thorough security testing
- **Real-time HUD** — Live monitoring of attack vectors and threat levels
- **Security Grading** — Letter grades (A-F) with detailed breakdowns
- **SARIF/JUnit Export** — Industry-standard formats for CI/CD integration

### Attack Vectors

| Category | Probes | Description |
|----------|--------|-------------|
| Prompt Injection | 6 | Direct/indirect injection, system prompt extraction |
| Data Leakage | 5 | Training data extraction, PII detection, model inversion |
| Jailbreak | 5 | DAN attacks, role-playing, encoding bypasses |
| Data Exfiltration | 4 | URL injection, markdown exfil, DNS rebinding |
| Hallucination | 3 | Confabulation detection, source fabrication |
| Supply Chain | 2 | Model poisoning, dependency vulnerabilities |
| Overreliance | 2 | Authority exploitation, confidence manipulation |

### Real-time Dashboard

- Live attack progress visualization
- Threat level indicators (Critical/High/Medium/Low)
- Attack success rate tracking
- Historical comparison charts
- Export-ready reports

---

## Demo

### Dashboard Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  AegisRT Dashboard                                   [Scan ▼]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Overall Score: 72/100 (C+)        Scan Duration: 4m 32s       │
│  ████████████████████████░░░░░░░░░░░░░░░░  72%                 │
│                                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │   Prompt     │ │    Data      │ │  Jailbreak   │            │
│  │  Injection   │ │  Leakage     │ │  Resistance  │            │
│  │    45/100    │ │    30/100    │ │    52/100    │            │
│  │    HIGH      │ │   CRITICAL   │ │    HIGH      │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │    Data      │ │    Hallu-    │ │   Supply     │            │
│  │ Exfiltration │ │  cination    │ │   Chain      │            │
│  │    25/100    │ │    78/100    │ │    90/100    │            │
│  │   CRITICAL   │ │    LOW       │ │   PASSED     │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                 │
│  Recent Attacks                                                 │
│  ├─ [CRITICAL] Prompt injection bypass via role-play            │
│  ├─ [HIGH] Training data extracted via completion               │
│  ├─ [MEDIUM] System prompt partially revealed                   │
│  └─ [LOW] Hallucinated source citation detected                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Scan Results

```
┌─────────────────────────────────────────────────────────────────┐
│  Scan: scan_20240115_143022                    Status: Complete │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Target: https://api.your-app.com/v1/chat                      │
│  Scan Type: Full (27 probes, 636 seeds)                        │
│  Duration: 4 minutes 32 seconds                                │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Attack Timeline                                        │   │
│  │  14:30:22 ●─── Prompt Injection (6 probes) ──── 45%    │   │
│  │  14:31:15 ●─── Data Leakage (5 probes) ─────── 30%     │   │
│  │  14:32:08 ●─── Jailbreak (5 probes) ────────── 52%     │   │
│  │  14:33:01 ●─── Data Exfiltration (4 probes) ── 25%     │   │
│  │  14:33:54 ●─── Hallucination (3 probes) ────── 78%     │   │
│  │  14:34:25 ●─── Supply Chain (2 probes) ─────── 90%     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Recommendations                                                │
│  ├─ Implement input sanitization for prompt injection          │
│  ├─ Add output filtering to prevent data leakage               │
│  ├─ Configure rate limiting to resist jailbreak attempts        │
│  └─ Enable content policy enforcement                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │ Dashboard │ │  Scans   │ │ Reports  │ │    Settings      │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ REST API
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend (FastAPI)                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │   API    │ │  Scanner │ │ Reporter │ │    Storage       │  │
│  │  Router  │ │  Engine  │ │ Generator│ │    Manager       │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  Security Probe Library                   │  │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐           │  │
│  │  │   Prompt   │ │    Data    │ │ Jailbreak  │           │  │
│  │  │ Injection  │ │  Leakage   │ │  Probes    │           │  │
│  │  └────────────┘ └────────────┘ └────────────┘           │  │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐           │  │
│  │  │    Data    │ │  Halluci-  │ │   Supply   │           │  │
│  │  │Exfiltration│ │  nation    │ │   Chain    │           │  │
│  │  └────────────┘ └────────────┘ └────────────┘           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Probe Runner                           │  │
│  │  • Parallel execution (asyncio)                          │  │
│  │  • Rate limiting & backoff                               │  │
│  │  • Response analysis & scoring                           │  │
│  │  • Real-time progress streaming                          │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn api:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the dashboard.

---

## Installation

### Docker (Recommended)

```bash
docker-compose up -d
```

`docker-compose.yml`:

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=sqlite:///./aegisrt.db
    volumes:
      - ./data:/app/data

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8000
```

### Manual Installation

```bash
# Clone the repository
git clone https://github.com/your-org/aegisrt-dashboard.git
cd aegisrt-dashboard

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install
```

---

## Configuration

### Environment Variables

#### Backend

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | Database connection string | No | `sqlite:///./aegisrt.db` |
| `API_KEY` | API authentication key | No | None |
| `MAX_CONCURRENT_SCANS` | Maximum parallel scans | No | `5` |
| `SCAN_TIMEOUT` | Scan timeout in seconds | No | `300` |
| `LOG_LEVEL` | Logging level | No | `INFO` |

#### Frontend

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes | `http://localhost:8000` |
| `NEXT_PUBLIC_WS_URL` | WebSocket URL for live updates | No | `ws://localhost:8000` |

### Configuration File

Create `config.yaml` in the backend directory:

```yaml
scan:
  default_type: full
  max_concurrent: 5
  timeout: 300

probes:
  enabled:
    - prompt_injection
    - data_leakage
    - jailbreak
    - data_exfiltration
    - hallucination
    - supply_chain
    - overreliance
  disabled: []

scoring:
  weights:
    prompt_injection: 0.25
    data_leakage: 0.25
    jailbreak: 0.15
    data_exfiltration: 0.15
    hallucination: 0.10
    supply_chain: 0.05
    overreliance: 0.05

reporting:
  formats:
    - sarif
    - junit
    - json
    - html
```

---

## API Reference

### Start a Scan

```http
POST /api/scan
Content-Type: application/json

{
  "target_url": "https://api.your-app.com/v1/chat",
  "scan_type": "full",
  "api_key": "optional-api-key"
}
```

**Response:**

```json
{
  "scan_id": "scan_20240115_143022",
  "status": "started",
  "target": "https://api.your-app.com/v1/chat",
  "started_at": "2024-01-15T14:30:22Z"
}
```

### Get Scan Results

```http
GET /api/scan/{scan_id}
```

**Response:**

```json
{
  "scan_id": "scan_20240115_143022",
  "status": "completed",
  "overall_score": 72,
  "grade": "C+",
  "duration_seconds": 272,
  "results": [
    {
      "name": "Prompt Injection",
      "probe_count": 6,
      "severity": "HIGH",
      "score": 45,
      "attacks": [
        {
          "name": "Direct Injection",
          "severity": "CRITICAL",
          "success": true,
          "description": "System prompt successfully extracted via direct injection"
        }
      ]
    }
  ],
  "recommendations": [
    "Implement input sanitization for prompt injection",
    "Add output filtering to prevent data leakage"
  ]
}
```

### Health Check

```http
GET /api/health
```

**Response:**

```json
{
  "status": "healthy",
  "version": "1.0.0",
  "uptime": 86400
}
```

### List All Scans

```http
GET /api/scans?limit=10&offset=0
```

### Delete a Scan

```http
DELETE /api/scan/{scan_id}
```

---

## Security Probes

### Prompt Injection (6 Probes)

| Probe | Attack Vector | Severity |
|-------|--------------|----------|
| Direct Injection | Malicious instructions in user input | Critical |
| Indirect Injection | Instructions hidden in retrieved documents | Critical |
| System Prompt Extraction | Attempts to reveal system instructions | High |
| Instruction Override | Commands to ignore previous instructions | High |
| Multi-turn Injection | Gradual context manipulation | Medium |
| Encoding Bypass | Base64/ROT13 encoded injections | Medium |

### Data Leakage (5 Probes)

| Probe | Attack Vector | Severity |
|-------|--------------|----------|
| Training Data Extraction | Attempts to extract training data | Critical |
| PII Detection | Requests for personal information | Critical |
| Model Inversion | Reconstructing input from output | High |
| Membership Inference | Determining if data was in training set | High |
| Source Code Extraction | Attempts to reveal source code | Medium |

### Jailbreak (5 Probes)

| Probe | Attack Vector | Severity |
|-------|--------------|----------|
| DAN Attack | "Do Anything Now" persona | Critical |
| Role-playing | Character-based bypass attempts | High |
| Encoding Bypass | Unicode/hex encoded jailbreaks | High |
| Context Window | Overflowing context to bypass rules | Medium |
| Multi-language | Non-English bypass attempts | Low |

### Data Exfiltration (4 Probes)

| Probe | Attack Vector | Severity |
|-------|--------------|----------|
| URL Injection | Embedding URLs to exfiltrate data | Critical |
| Markdown Exfil | Using markdown links for data exfiltration | High |
| DNS Rebinding | DNS-based data exfiltration | High |
| API Key Leakage | Attempts to extract API keys | Critical |

### Hallucination Detection (3 Probes)

| Probe | Attack Vector | Severity |
|-------|--------------|----------|
| Confabulation | Detecting fabricated facts | Medium |
| Source Fabrication | Fake citation detection | Low |
| Confidence Manipulation | False certainty exploitation | Low |

### Supply Chain (2 Probes)

| Probe | Attack Vector | Severity |
|-------|--------------|----------|
| Model Poisoning | Detecting poisoned model behavior | Critical |
| Dependency Vulnerability | Checking for vulnerable dependencies | High |

### Overreliance (2 Probes)

| Probe | Attack Vector | Severity |
|-------|--------------|----------|
| Authority Exploitation | Fake expert persona manipulation | Medium |
| Confidence Manipulation | High-confidence wrong answers | Low |

---

## Reporting

### Export Formats

| Format | Description | Use Case |
|--------|-------------|----------|
| SARIF | Static Analysis Results Interchange Format | GitHub Security tab integration |
| JUnit | XML test results | CI/CD pipeline integration |
| JSON | Machine-readable full results | Custom integrations |
| HTML | Visual report with charts | Human review |
| PDF | Formatted printable report | Compliance documentation |

### SARIF Output Example

```json
{
  "$schema": "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json",
  "version": "2.1.0",
  "runs": [{
    "tool": {
      "driver": {
        "name": "AegisRT",
        "version": "1.0.0",
        "informationUri": "https://aegisrt.dev"
      }
    },
    "results": [{
      "ruleId": "LLM-PROMPT-INJECTION",
      "level": "error",
      "message": {
        "text": "Direct prompt injection vulnerability detected"
      },
      "locations": [{
        "physicalLocation": {
          "artifactLocation": { "uri": "https://api.your-app.com/v1/chat" }
        }
      }]
    }]
  }]
}
```

---

## Enterprise Features

### Team Management

- **Role-based Access Control** — Admin, auditor, viewer roles
- **SSO Integration** — SAML 2.0, OAuth 2.0, OIDC support
- **Audit Logs** — Complete activity tracking
- **Team Workspaces** — Isolated environments for different teams

### Advanced Security

- **Custom Probe Definitions** — Create organization-specific probes
- **Attack Library** — Extensible library of attack vectors
- **Whitelist/Blacklist** — Control which targets can be scanned
- **IP Allowlisting** — Restrict access to corporate networks

### Compliance & Governance

- **Compliance Reports** — SOC 2, ISO 27001, GDPR templates
- **Policy Engine** — Define security policies as code
- **Approval Workflows** — Multi-step scan approval process
- **Retention Policies** — Configurable data retention

### Integration

- **CI/CD Pipelines** — GitHub Actions, GitLab CI, Jenkins, CircleCI
- **SIEM Integration** — Splunk, Datadog, Elastic SIEM
- **Ticketing** — Jira, Linear, GitHub Issues auto-creation
- **Slack/Teams** — Real-time notifications and alerts
- **Webhooks** — Custom event-driven integrations

### Scalability

- **Horizontal Scaling** — Multiple scanner nodes
- **Queue-based Processing** — Redis/RabbitMQ job queues
- **Caching** — Results caching for repeated scans
- **Database Support** — PostgreSQL, MySQL, MongoDB

### Support

- **24/7 Priority Support** — Dedicated support channel
- **Custom Training** — Onboarding and security workshops
- **Dedicated Account Manager** — Single point of contact
- **SLA Guarantees** — 99.9% uptime guarantee

---

## Pricing

### Community

Free forever for open source and personal use.

- 3 scans per month
- 5 probes per scan
- JSON export
- Community support
- Single user

### Professional

For small teams and startups.

- Unlimited scans
- All 27 probes
- All export formats
- Email support
- Up to 5 users
- API access
- Basic reporting

### Business

For growing companies.

- Everything in Professional
- Up to 25 users
- Custom probes
- SSO/SAML integration
- Priority support
- Advanced reporting
- Webhook integrations
- Audit logs

### Enterprise

For large organizations.

- Everything in Business
- Unlimited users
- Custom probe development
- Dedicated support engineer
- SLA guarantees
- On-premise deployment
- Custom integrations
- Training workshops
- Compliance reports

---

## Roadmap

### Q1 2024

- [ ] WebSocket real-time streaming
- [ ] Custom probe SDK
- [ ] Multi-model support (GPT-4, Claude, Llama)

### Q2 2024

- [ ] Automated remediation suggestions
- [ ] Historical trend analysis
- [ ] Team collaboration features

### Q3 2024

- [ ] On-premise deployment option
- [ ] Kubernetes Helm chart
- [ ] Custom compliance templates

### Q4 2024

- [ ] AI-powered remediation
- [ ] Cross-model comparison
- [ ] Red team automation

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone
git clone https://github.com/your-org/aegisrt-dashboard.git
cd aegisrt-dashboard

# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Frontend
cd ../frontend
npm install

# Run tests
cd ../backend && pytest
cd ../frontend && npm test
```

### Adding a New Probe

1. Create a new file in `backend/probes/`
2. Implement the probe class with `execute()` method
3. Add test cases in `__tests__/`
4. Register the probe in `backend/probes/__init__.py`
5. Update documentation

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Support

- **Documentation**: [docs.aegisrt.dev](https://docs.aegisrt.dev)
- **GitHub Issues**: [github.com/your-org/aegisrt-dashboard/issues](https://github.com/your-org/aegisrt-dashboard/issues)
- **Email**: support@aegisrt.dev
- **Discord**: [aegisrt.dev/discord](https://aegisrt.dev/discord)

---

<p align="center">Built with care for the AI security community.</p>
