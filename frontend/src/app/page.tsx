"use client";

import { useState } from "react";

interface ScanResult {
  id: string;
  name: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";
  score: number;
  details: string;
}

interface AuditReport {
  target: string;
  timestamp: string;
  overallScore: number;
  grade: string;
  results: ScanResult[];
}

export default function Home() {
  const [targetUrl, setTargetUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [report, setReport] = useState<AuditReport | null>(null);

  const startScan = async () => {
    if (!targetUrl) return;
    setIsScanning(true);
    
    // Simulate scan - in production, this calls the Python backend
    setTimeout(() => {
      setReport({
        target: targetUrl,
        timestamp: new Date().toISOString(),
        overallScore: 72,
        grade: "C+",
        results: [
          { id: "1", name: "Prompt Injection", severity: "HIGH", score: 45, details: "32 tests performed. 14 vulnerable responses detected." },
          { id: "2", name: "Data Leakage", severity: "CRITICAL", score: 30, details: "API keys and credentials exposed in 3 responses." },
          { id: "3", name: "Instruction Hierarchy", severity: "MEDIUM", score: 68, details: "Role-play attacks bypassed restrictions in 5/20 tests." },
          { id: "4", name: "Jailbreak Resistance", severity: "HIGH", score: 52, details: "DAN and character attacks succeeded 40% of the time." },
          { id: "5", name: "Data Exfiltration", severity: "CRITICAL", score: 25, details: "System prompt extracted in 8/10 attempts." },
          { id: "6", name: "Content Safety", severity: "LOW", score: 85, details: "Harmful content blocked in 92% of attempts." },
          { id: "7", name: "Resource Exhaustion", severity: "MEDIUM", score: 70, details: "Long input handling degraded after 4K tokens." },
          { id: "8", name: "Cross-Tenant Isolation", severity: "HIGH", score: 55, details: "Potential data leak between sessions detected." },
        ],
      });
      setIsScanning(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "bg-red-600";
      case "HIGH": return "bg-orange-500";
      case "MEDIUM": return "bg-yellow-500";
      case "LOW": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-400";
    if (grade.startsWith("B")) return "text-yellow-400";
    if (grade.startsWith("C")) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold">AEGIS<span className="text-red-500">RT</span></h1>
            <p className="text-gray-400">Autonomous Red Team Security Agent</p>
          </div>
        </div>

        {/* Scan Input */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Target Endpoint</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://api.your-ai-app.com/v1/chat"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
            />
            <button
              onClick={startScan}
              disabled={isScanning || !targetUrl}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {isScanning ? "SCANNING..." : "START AUDIT"}
            </button>
          </div>
        </div>

        {/* Scanning Animation */}
        {isScanning && (
          <div className="bg-gray-900 rounded-xl p-8 mb-8 border border-red-500/50">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 font-mono">Running 27 probes against target...</span>
            </div>
            <div className="mt-4 bg-gray-800 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full animate-progress"></div>
            </div>
          </div>
        )}

        {/* Results */}
        {report && (
          <>
            {/* Score Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <p className="text-gray-400 text-sm">Overall Score</p>
                <p className={`text-5xl font-bold ${getGradeColor(report.grade)}`}>{report.overallScore}</p>
                <p className="text-gray-500 text-sm">out of 100</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <p className="text-gray-400 text-sm">Security Grade</p>
                <p className={`text-5xl font-bold ${getGradeColor(report.grade)}`}>{report.grade}</p>
                <p className="text-gray-500 text-sm">needs improvement</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <p className="text-gray-400 text-sm">Vulnerabilities</p>
                <p className="text-5xl font-bold text-red-400">4</p>
                <p className="text-gray-500 text-sm">critical/high found</p>
              </div>
            </div>

            {/* Threat Matrix */}
            <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Threat Matrix</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {report.results.map((result) => (
                  <div key={result.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${getSeverityColor(result.severity)}`}></div>
                      <span className="text-xs text-gray-400">{result.severity}</span>
                    </div>
                    <p className="font-medium text-sm">{result.name}</p>
                    <p className="text-2xl font-bold mt-1">{result.score}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Results */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Detailed Results</h2>
              <div className="space-y-4">
                {report.results.map((result) => (
                  <div key={result.id} className="bg-gray-800 rounded-lg p-4 flex items-start gap-4">
                    <div className={`px-2 py-1 rounded text-xs font-bold ${getSeverityColor(result.severity)}`}>
                      {result.severity}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{result.name}</p>
                      <p className="text-gray-400 text-sm mt-1">{result.details}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{result.score}</p>
                      <p className="text-gray-500 text-xs">score</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Button */}
            <div className="mt-8 flex gap-4">
              <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                Export SARIF Report
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                Export PDF Report
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                Share Results
              </button>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Powered by aegisRT • OWASP LLM Top 10 Compliance • 27 Probes • 636 Test Seeds</p>
        </div>
      </div>
    </div>
  );
}
