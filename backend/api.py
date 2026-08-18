from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import json
import tempfile
import os
from datetime import datetime

app = FastAPI(title="AegisRT Dashboard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanRequest(BaseModel):
    target_url: str
    api_key: str = None
    scan_type: str = "full"  # full, quick, custom

class ScanResponse(BaseModel):
    scan_id: str
    status: str
    target: str
    started_at: str

@app.post("/api/scan", response_model=ScanResponse)
async def start_scan(request: ScanRequest):
    scan_id = f"scan_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    
    # Create temporary config
    config = {
        "target": request.target_url,
        "scan_type": request.scan_type,
        "probes": ["prompt_injection", "data_leakage", "jailbreak", "data_exfiltration"],
    }
    
    config_path = os.path.join(tempfile.gettempdir(), f"{scan_id}.yaml")
    with open(config_path, "w") as f:
        import yaml
        yaml.dump(config, f)
    
    # In production, this would run aegisrt
    # subprocess.run(["aegisrt", "run", "-c", config_path])
    
    return ScanResponse(
        scan_id=scan_id,
        status="started",
        target=request.target_url,
        started_at=datetime.now().isoformat()
    )

@app.get("/api/scan/{scan_id}")
async def get_scan_results(scan_id: str):
    # In production, this would read actual results
    return {
        "scan_id": scan_id,
        "status": "completed",
        "overall_score": 72,
        "grade": "C+",
        "results": [
            {"name": "Prompt Injection", "severity": "HIGH", "score": 45},
            {"name": "Data Leakage", "severity": "CRITICAL", "score": 30},
            {"name": "Jailbreak Resistance", "severity": "HIGH", "score": 52},
            {"name": "Data Exfiltration", "severity": "CRITICAL", "score": 25},
        ]
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}
