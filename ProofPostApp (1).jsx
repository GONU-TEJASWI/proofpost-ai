import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Upload as UploadIcon,
  History,
  Settings,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Download,
  Plus,
  Image as ImageIcon,
  FileText,
  Hash,
  Video,
  TrendingUp,
  Bell,
} from "lucide-react";

/* ---------------------------------------------------------------
   ProofPost AI — "Signal Room" design system
   A calm, instrument-panel aesthetic: deep graphite canvas, glass
   panels, a single confident accent, and a gauge that reads like
   precision equipment rather than a dashboard template.
----------------------------------------------------------------*/

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');

  .pp-root {
    --bg: #0A0D12;
    --bg-grad: radial-gradient(1200px 500px at 15% -10%, rgba(108,140,255,0.10), transparent 60%),
                radial-gradient(900px 500px at 100% 0%, rgba(212,175,106,0.06), transparent 55%);
    --panel: #12161D;
    --panel-2: #171C24;
    --glass: rgba(23,28,36,0.6);
    --border: rgba(232,236,242,0.08);
    --border-strong: rgba(232,236,242,0.16);
    --accent: #6C8CFF;
    --accent-soft: #93AAFF;
    --gold: #D4AF6A;
    --success: #34D399;
    --danger: #F0715C;
    --text: #E8ECF2;
    --text-dim: #8A93A6;
    --text-faint: #5B6478;
    font-family: 'Inter', sans-serif;
    background: var(--bg-grad), var(--bg);
    color: var(--text);
    min-height: 100%;
  }
  .pp-display { font-family: 'Fraunces', serif; letter-spacing: -0.01em; }
  .pp-mono { font-family: 'IBM Plex Mono', monospace; }

  .pp-panel {
    background: var(--glass);
    backdrop-filter: blur(14px);
    border: 1px solid var(--border);
    border-radius: 14px;
  }
  .pp-panel-solid {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 14px;
  }

  .pp-card-light {
    background: linear-gradient(180deg, #F7F8FA, #ECEEF2);
    color: #14161B;
    border-radius: 14px;
  }

  .pp-nav-item {
    transition: background 0.15s ease, color 0.15s ease;
    color: var(--text-dim);
  }
  .pp-nav-item:hover { background: rgba(232,236,242,0.05); color: var(--text); }
  .pp-nav-item.active {
    background: linear-gradient(135deg, rgba(108,140,255,0.16), rgba(108,140,255,0.05));
    color: var(--text);
    box-shadow: inset 0 0 0 1px rgba(108,140,255,0.28);
  }

  .pp-btn-primary {
    background: linear-gradient(135deg, var(--accent), #5A78E8);
    color: #0A0D12;
    font-weight: 600;
    box-shadow: 0 8px 24px -8px rgba(108,140,255,0.5);
    transition: transform 0.12s ease, box-shadow 0.12s ease, filter 0.12s ease;
    border-radius: 10px;
  }
  .pp-btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); box-shadow: 0 10px 28px -6px rgba(108,140,255,0.6); }
  .pp-btn-primary:active { transform: translateY(0); }
  .pp-btn-primary:disabled { opacity: 0.35; filter: none; transform: none; box-shadow: none; }

  .pp-btn-ghost {
    border: 1px solid var(--border-strong);
    color: var(--text);
    background: rgba(232,236,242,0.02);
    border-radius: 10px;
    transition: border-color 0.12s ease, background 0.12s ease;
  }
  .pp-btn-ghost:hover { border-color: var(--accent-soft); background: rgba(108,140,255,0.08); }

  .pp-dropzone {
    border: 1.5px dashed var(--border-strong);
    border-radius: 12px;
    transition: border-color 0.15s ease, background 0.15s ease;
  }
  .pp-dropzone:hover, .pp-dropzone.filled {
    border-color: var(--accent);
    background: rgba(108,140,255,0.06);
  }

  .pp-bar-track { background: rgba(255,255,255,0.06); border-radius: 999px; overflow: hidden; }
  .pp-bar-track.on-light { background: rgba(20,22,27,0.08); }
  .pp-bar-fill { height: 100%; border-radius: 999px; }

  .pp-input {
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text);
    transition: border-color 0.15s ease;
  }
  .pp-input:focus { outline: none; border-color: var(--accent); }
  .pp-input::placeholder { color: var(--text-faint); }

  .pp-fade-in { animation: pp-fade 0.4s cubic-bezier(.2,.8,.2,1) both; }
  @keyframes pp-fade { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateY(0);} }

  .pp-scan {
    animation: pp-scan-rotate 1.6s linear infinite;
    transform-origin: 90px 90px;
  }
  @keyframes pp-scan-rotate { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }

  .pp-glow { filter: drop-shadow(0 0 10px rgba(108,140,255,0.45)); }

  .pp-badge {
    border-radius: 999px;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
  }

  ::selection { background: var(--accent); color: #0A0D12; }
`;

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "upload", label: "New Analysis", icon: UploadIcon },
  { id: "history", label: "History", icon: History },
];

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="flex items-center justify-center pp-glow"
        style={{
          width: 32,
          height: 32,
          borderRadius: 9,
          background: "linear-gradient(135deg, var(--accent), #4A63C9)",
        }}
      >
        <Sparkles size={15} color="#0A0D12" strokeWidth={2.4} />
      </div>
      <div>
        <div className="pp-display" style={{ fontSize: 16, fontWeight: 600, lineHeight: 1 }}>
          ProofPost <span style={{ color: "var(--gold)" }}>AI</span>
        </div>
        <div className="pp-mono" style={{ fontSize: 9, color: "var(--text-faint)", letterSpacing: "0.12em", marginTop: 3 }}>
          KNOW BEFORE YOU POST
        </div>
      </div>
    </div>
  );
}

/* ---------------- Gauge (signature element) ---------------- */
function Gauge({ score, size = 168, ready }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  const pct = score / 100;
  const color = ready ? "var(--success)" : "var(--danger)";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 180 180" width={size} height={size}>
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={ready ? "#34D399" : "#F0715C"} />
            <stop offset="100%" stopColor={ready ? "#6C8CFF" : "#D4AF6A"} />
          </linearGradient>
        </defs>
        <circle cx="90" cy="90" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
        <circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${c * pct} ${c}`}
          transform="rotate(-90 90 90)"
          style={{ transition: "stroke-dasharray 0.8s cubic-bezier(.2,.8,.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="pp-display" style={{ fontSize: 40, fontWeight: 600, color: "var(--text)" }}>
          {score}
        </span>
        <span className="pp-mono" style={{ fontSize: 10, color: "var(--text-faint)", letterSpacing: "0.1em" }}>
          PROOFSCORE
        </span>
      </div>
    </div>
  );
}

function Sparkline() {
  const points = [40, 55, 48, 62, 58, 74, 68, 82, 79, 91];
  const w = 240, h = 56, max = 100, min = 30;
  const step = w / (points.length - 1);
  const coords = points.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / (max - min)) * h;
    return `${x},${y}`;
  });
  const path = "M " + coords.join(" L ");
  const areaPath = `${path} L ${w},${h} L 0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(108,140,255,0.35)" />
          <stop offset="100%" stopColor="rgba(108,140,255,0)" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#sparkFill)" />
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------------------- Dashboard ---------------------------- */
function Dashboard({ goTo, reports }) {
  return (
    <div className="pp-fade-in">
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="pp-mono" style={{ color: "var(--accent-soft)", fontSize: 11, letterSpacing: "0.14em" }}>
            WELCOME BACK, RIYA
          </p>
          <h1 className="pp-display" style={{ fontSize: 32, fontWeight: 600, marginTop: 4 }}>
            Ready when you are.
          </h1>
        </div>
        <button onClick={() => goTo("upload")} className="pp-btn-primary px-5 py-3 flex items-center gap-2 text-sm">
          <Plus size={16} /> New Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="pp-panel p-5">
          <p className="pp-mono" style={{ fontSize: 10, color: "var(--text-faint)", letterSpacing: "0.1em" }}>
            AI CREDITS LEFT
          </p>
          <p className="pp-display" style={{ fontSize: 28, marginTop: 8 }}>15 <span style={{ color: "var(--text-faint)", fontSize: 16 }}>/ 20</span></p>
          <div className="pp-bar-track mt-3" style={{ height: 5 }}>
            <div className="pp-bar-fill" style={{ width: "75%", background: "var(--accent)" }} />
          </div>
        </div>
        <div className="pp-panel p-5">
          <p className="pp-mono" style={{ fontSize: 10, color: "var(--text-faint)", letterSpacing: "0.1em" }}>
            AVG. CONFIDENCE
          </p>
          <p className="pp-display" style={{ fontSize: 28, marginTop: 8 }}>89%</p>
          <div className="flex items-center gap-1 mt-3 text-xs" style={{ color: "var(--success)" }}>
            <TrendingUp size={13} /> +18% this month
          </div>
        </div>
        <div className="pp-panel p-5">
          <p className="pp-mono" style={{ fontSize: 10, color: "var(--text-faint)", letterSpacing: "0.1em" }}>
            WEEKLY TREND
          </p>
          <div className="mt-2">
            <Sparkline />
          </div>
        </div>
      </div>

      <p className="pp-mono" style={{ fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.12em", marginBottom: 14 }}>
        RECENT REPORTS
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reports.map((r) => (
          <button
            key={r.title}
            onClick={() => goTo("report", r)}
            className="pp-card-light text-left p-5 flex items-center justify-between hover:brightness-105 transition"
          >
            <div>
              <p className="pp-display" style={{ fontWeight: 600, fontSize: 16 }}>{r.title}</p>
              <p className="pp-mono" style={{ fontSize: 11, color: "#6B7280", marginTop: 4 }}>{r.date}</p>
            </div>
            <div
              className="pp-mono flex items-center justify-center"
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: r.score >= 80 ? "rgba(52,211,153,0.14)" : "rgba(240,113,92,0.14)",
                color: r.score >= 80 ? "#0F9D6A" : "#C74B36",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {r.score}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- Upload ------------------------------ */
function UploadScreen({ onAnalyze }) {
  const [video, setVideo] = useState(false);
  const [thumb, setThumb] = useState(false);
  const [caption, setCaption] = useState("");
  const [script, setScript] = useState("");

  return (
    <div className="pp-fade-in max-w-3xl">
      <p className="pp-mono" style={{ color: "var(--accent-soft)", fontSize: 11, letterSpacing: "0.14em" }}>
        STEP 01 OF 02
      </p>
      <h1 className="pp-display" style={{ fontSize: 30, fontWeight: 600, marginTop: 4, marginBottom: 6 }}>
        Upload your content.
      </h1>
      <p style={{ color: "var(--text-dim)", marginBottom: 28, maxWidth: 520 }}>
        We'll check originality, hook strength, thumbnail, and caption before you commit to posting.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div
          onClick={() => setVideo(true)}
          className={`pp-dropzone ${video ? "filled" : ""} p-6 flex flex-col items-center justify-center gap-2 cursor-pointer`}
          style={{ minHeight: 140 }}
        >
          <Video size={22} color={video ? "var(--accent)" : "var(--text-faint)"} />
          <p className="pp-mono text-sm">{video ? "reel_final_v3.mp4" : "Upload Video / Reel"}</p>
        </div>
        <div
          onClick={() => setThumb(true)}
          className={`pp-dropzone ${thumb ? "filled" : ""} p-6 flex flex-col items-center justify-center gap-2 cursor-pointer`}
          style={{ minHeight: 140 }}
        >
          <ImageIcon size={22} color={thumb ? "var(--accent)" : "var(--text-faint)"} />
          <p className="pp-mono text-sm">{thumb ? "thumbnail.jpg" : "Upload Thumbnail"}</p>
        </div>
      </div>

      <div className="mb-5">
        <label className="pp-mono flex items-center gap-2 mb-2" style={{ fontSize: 11, color: "var(--text-faint)" }}>
          <FileText size={13} /> CAPTION
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Paste your caption..."
          rows={2}
          className="pp-input w-full p-3 text-sm"
          style={{ resize: "none" }}
        />
      </div>

      <div className="mb-5">
        <label className="pp-mono flex items-center gap-2 mb-2" style={{ fontSize: 11, color: "var(--text-faint)" }}>
          <FileText size={13} /> SCRIPT (OPTIONAL)
        </label>
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Paste your script..."
          rows={3}
          className="pp-input w-full p-3 text-sm"
          style={{ resize: "none" }}
        />
      </div>

      <div className="mb-8">
        <label className="pp-mono flex items-center gap-2 mb-2" style={{ fontSize: 11, color: "var(--text-faint)" }}>
          <Hash size={13} /> HASHTAGS (OPTIONAL)
        </label>
        <input type="text" placeholder="#studytips #college #coding" className="pp-input w-full p-3 text-sm" />
      </div>

      <button
        onClick={onAnalyze}
        disabled={!video}
        className="pp-btn-primary px-6 py-3 flex items-center gap-2 text-sm"
      >
        <Sparkles size={16} /> Analyze Content
      </button>
      {!video && (
        <p className="pp-mono" style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 10 }}>
          Upload a video to continue.
        </p>
      )}
    </div>
  );
}

/* --------------------------- Processing ----------------------------- */
function Processing({ onDone }) {
  const [pct, setPct] = useState(0);
  const steps = [
    "Checking originality",
    "Analyzing hook strength",
    "Evaluating thumbnail",
    "Reviewing caption",
    "Calculating confidence score",
  ];
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setPct((p) => {
        const next = Math.min(100, p + 4);
        if (next >= 100) {
          clearInterval(t);
          setTimeout(onDone, 450);
        }
        return next;
      });
    }, 90);
    return () => clearInterval(t);
  }, [onDone]);

  useEffect(() => {
    setStepIdx(Math.min(steps.length - 1, Math.floor((pct / 100) * steps.length)));
  }, [pct]);

  return (
    <div className="pp-fade-in flex flex-col items-center justify-center" style={{ minHeight: 440 }}>
      <div className="relative flex items-center justify-center mb-8" style={{ width: 180, height: 180 }}>
        <svg width="180" height="180" viewBox="0 0 180 180" className="absolute">
          <circle cx="90" cy="90" r="82" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
        </svg>
        <svg width="180" height="180" viewBox="0 0 180 180" className="absolute pp-scan">
          <circle cx="90" cy="10" r="4" fill="var(--accent)" className="pp-glow" />
        </svg>
        <span className="pp-display" style={{ fontSize: 32, fontWeight: 600 }}>{pct}%</span>
      </div>
      <p className="pp-display" style={{ fontSize: 21, marginBottom: 6 }}>Analyzing your content…</p>
      <p className="pp-mono" style={{ fontSize: 12, color: "var(--accent-soft)", letterSpacing: "0.06em" }}>
        {steps[stepIdx]}
      </p>
      <div className="pp-bar-track mt-8" style={{ width: 280, height: 6 }}>
        <div className="pp-bar-fill" style={{ width: `${pct}%`, background: "linear-gradient(90deg, var(--accent), var(--gold))" }} />
      </div>
    </div>
  );
}

/* ----------------------------- Report -------------------------------- */
function Report({ data, goTo }) {
  const ready = data.score >= 80;
  const metrics = [
    { label: "Originality", value: data.originality },
    { label: "Hook Strength", value: data.hook },
    { label: "Thumbnail Quality", value: data.thumbnail },
    { label: "Caption Quality", value: data.captionScore },
    { label: "Readability", value: data.readability },
  ];
  const suggestions = [
    "Improve the first 3 seconds — open on the payoff, not the setup.",
    "Add a stronger call-to-action before the outro.",
    "Trim the caption — the hook line gets buried after 2 sentences.",
    "Try a brighter accent color on the thumbnail text.",
  ];

  return (
    <div className="pp-fade-in">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="pp-mono" style={{ color: "var(--accent-soft)", fontSize: 11, letterSpacing: "0.14em" }}>
            CREATOR CONFIDENCE REPORT
          </p>
          <h1 className="pp-display" style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>{data.title}</h1>
        </div>
        <button className="pp-btn-ghost px-4 py-2.5 flex items-center gap-2 text-sm">
          <Download size={14} /> Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        <div className="pp-panel-solid p-6 flex flex-col items-center justify-center">
          <Gauge score={data.score} ready={ready} />
          <div
            className="pp-badge flex items-center gap-2 mt-5 px-3 py-1.5 text-xs"
            style={{
              background: ready ? "rgba(52,211,153,0.12)" : "rgba(240,113,92,0.12)",
              color: ready ? "var(--success)" : "var(--danger)",
              border: `1px solid ${ready ? "rgba(52,211,153,0.3)" : "rgba(240,113,92,0.3)"}`,
            }}
          >
            {ready ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />}
            {ready ? "READY TO POST" : "IMPROVE BEFORE POSTING"}
          </div>
        </div>

        <div>
          <div className="pp-card-light p-6 mb-5">
            <p className="pp-mono" style={{ fontSize: 10, color: "#6B7280", letterSpacing: "0.1em", marginBottom: 16 }}>
              SCORE BREAKDOWN
            </p>
            <div className="flex flex-col gap-4">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm" style={{ fontWeight: 500 }}>{m.label}</span>
                    <span className="pp-mono text-sm">{m.value}%</span>
                  </div>
                  <div className="pp-bar-track on-light" style={{ height: 6 }}>
                    <div
                      className="pp-bar-fill"
                      style={{ width: `${m.value}%`, background: m.value >= 80 ? "#0F9D6A" : "#C74B36" }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3" style={{ borderTop: "1px solid rgba(20,22,27,0.1)" }}>
                <span className="text-sm" style={{ fontWeight: 500 }}>Trend Saturation</span>
                <span className="pp-mono text-xs px-2.5 py-1" style={{ background: "rgba(212,175,106,0.18)", color: "#8A6420", borderRadius: 999 }}>
                  {data.trend}
                </span>
              </div>
            </div>
          </div>

          <div className="pp-panel p-6">
            <p className="pp-mono" style={{ fontSize: 10, color: "var(--accent-soft)", letterSpacing: "0.1em", marginBottom: 16 }}>
              AI SUGGESTIONS
            </p>
            <ul className="flex flex-col gap-3">
              {suggestions.map((s) => (
                <li key={s} className="flex gap-2 text-sm" style={{ color: "var(--text-dim)" }}>
                  <ChevronRight size={15} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button onClick={() => goTo("dashboard")} className="pp-btn-ghost px-5 py-3 text-sm">
          Back to Dashboard
        </button>
        <button onClick={() => goTo("upload")} className="pp-btn-primary px-5 py-3 text-sm">
          New Analysis
        </button>
      </div>
    </div>
  );
}

/* ------------------------------- App --------------------------------- */
export default function ProofPostApp() {
  const [screen, setScreen] = useState("dashboard");
  const [activeReport, setActiveReport] = useState(null);

  const reports = [
    { title: "Study Tips Reel", date: "2 days ago", score: 91 },
    { title: "5 Tools for Students", date: "5 days ago", score: 78 },
    { title: "Campus Vlog", date: "1 week ago", score: 65 },
    { title: "Morning Routine", date: "1 week ago", score: 88 },
  ];

  const fullReport = {
    title: "Study Tips Reel",
    score: 91,
    originality: 92,
    hook: 88,
    thumbnail: 94,
    captionScore: 89,
    readability: 91,
    trend: "Medium",
  };

  function goTo(dest, payload) {
    if (dest === "report") {
      setActiveReport(payload ? { ...fullReport, title: payload.title, score: payload.score } : fullReport);
      setScreen("report");
    } else {
      setScreen(dest);
    }
  }

  function handleAnalyze() {
    setScreen("processing");
  }

  function handleProcessingDone() {
    setActiveReport(fullReport);
    setScreen("report");
  }

  return (
    <div className="pp-root">
      <style>{css}</style>
      <div className="flex" style={{ minHeight: 640 }}>
        {/* Sidebar */}
        <div
          className="flex flex-col justify-between p-5"
          style={{ width: 232, borderRight: "1px solid var(--border)", flexShrink: 0 }}
        >
          <div>
            <div className="mb-10 px-1">
              <Logo />
            </div>
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  screen === item.id || (item.id === "upload" && (screen === "processing" || screen === "upload"));
                return (
                  <button
                    key={item.id}
                    onClick={() => goTo(item.id)}
                    className={`pp-nav-item flex items-center gap-3 px-3 py-2.5 text-sm text-left ${isActive ? "active" : ""}`}
                    style={{ borderRadius: 9 }}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
          <button
            className="pp-nav-item flex items-center gap-3 px-3 py-2.5 text-sm text-left"
            style={{ borderRadius: 9 }}
          >
            <Settings size={16} />
            Settings
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-8 sm:px-10 py-4"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <span className="pp-mono" style={{ fontSize: 11, color: "var(--text-faint)", letterSpacing: "0.1em" }}>
              CREATOR PRO
            </span>
            <div className="flex items-center gap-4">
              <Bell size={16} color="var(--text-dim)" />
              <div
                className="flex items-center justify-center pp-mono"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--accent), var(--gold))",
                  color: "#0A0D12",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                RS
              </div>
            </div>
          </div>

          <div className="flex-1 p-8 sm:p-10" style={{ maxWidth: 1000 }}>
            {screen === "dashboard" && <Dashboard goTo={goTo} reports={reports} />}
            {screen === "upload" && <UploadScreen onAnalyze={handleAnalyze} />}
            {screen === "processing" && <Processing onDone={handleProcessingDone} />}
            {screen === "report" && activeReport && <Report data={activeReport} goTo={goTo} />}
            {screen === "history" && (
              <div className="pp-fade-in">
                <p className="pp-mono" style={{ color: "var(--accent-soft)", fontSize: 11, letterSpacing: "0.14em" }}>
                  ARCHIVE
                </p>
                <h1 className="pp-display" style={{ fontSize: 28, fontWeight: 600, marginTop: 4, marginBottom: 24 }}>
                  Every report you've run.
                </h1>
                <div className="flex flex-col gap-3">
                  {reports.map((r) => (
                    <button
                      key={r.title}
                      onClick={() => goTo("report", r)}
                      className="pp-card-light p-4 flex items-center justify-between text-left"
                    >
                      <div>
                        <p style={{ fontWeight: 600 }}>{r.title}</p>
                        <p className="pp-mono" style={{ fontSize: 11, color: "#6B7280" }}>{r.date}</p>
                      </div>
                      <span
                        className="pp-mono text-xs px-2.5 py-1"
                        style={{
                          borderRadius: 999,
                          background: r.score >= 80 ? "rgba(15,157,106,0.12)" : "rgba(199,75,54,0.12)",
                          color: r.score >= 80 ? "#0F9D6A" : "#C74B36",
                        }}
                      >
                        {r.score}/100
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
