import { useState, useEffect } from "react";
import type { Page } from "../App";

interface Props {
  navigate: (p: Page) => void;
}

type InputMode = "type" | "voice";
type AnalysisState = "idle" | "analyzing" | "result-simple" | "result-complex";
type VoiceState = "idle" | "listening" | "transcribing" | "done";

const languages = ["English", "हिंदी", "ગુજરાતી", "मराठी"];

const sampleIssues = [
  "My court case has been pending for three years and my hearings keep getting postponed.",
  "I applied for a building permit six months ago but have not received any response.",
  "My property mutation application has been rejected without any clear reason.",
];

const simpleResult = {
  category: "Procedural Delay",
  type: "Application Processing",
  urgency: "Medium",
  cause: "Standard processing delay within SLA",
  whatToDo: "File a status enquiry with the concerned office using RTI or the department's online portal.",
  documents: "Application receipt, government ID proof, RTI application form",
  where: "District Collector Office or online at rtionline.gov.in",
  nextStep: "Response expected within 30 days of RTI filing",
  resource: "Right to Information Act, 2005 — Section 6",
};

const complexResult = {
  category: "Judicial Delay",
  type: "Repeated Hearing Adjournment",
  urgency: "High",
  cause: "Repeated delay + prolonged pending status — 3+ years",
};

export default function CheckIssue({ navigate }: Props) {
  const [lang, setLang] = useState("English");
  const [mode, setMode] = useState<InputMode>("type");
  const [input, setInput] = useState("");
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [analysis, setAnalysis] = useState<AnalysisState>("idle");
  const [waveHeights, setWaveHeights] = useState<number[]>(Array(12).fill(8));

  useEffect(() => {
    if (voiceState !== "listening") return;
    const interval = setInterval(() => {
      setWaveHeights(Array(12).fill(0).map(() => Math.random() * 28 + 6));
    }, 120);
    return () => clearInterval(interval);
  }, [voiceState]);

  const startVoice = () => {
    setVoiceState("listening");
    setTimeout(() => {
      setVoiceState("transcribing");
      setTimeout(() => {
        setInput("My court case has been pending for three years and my hearings keep getting postponed.");
        setVoiceState("done");
      }, 1200);
    }, 3000);
  };

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setAnalysis("analyzing");
    const isSimple = input.toLowerCase().includes("permit") || input.toLowerCase().includes("mutation");
    setTimeout(() => {
      setAnalysis(isSimple ? "result-simple" : "result-complex");
    }, 2200);
  };

  const reset = () => {
    setInput("");
    setAnalysis("idle");
    setVoiceState("idle");
  };

  return (
    <div className="min-h-screen bg-cream font-body">
      {/* Header band */}
      <div className="bg-violet/5 border-b border-plum/10 py-10 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-plum text-xs font-semibold tracking-widest uppercase mb-3">AI Pre-Check</p>
          <h1 className="font-body text-4xl lg:text-5xl text-violet font-semibold mb-3">
            Tell us what&apos;s wrong.
          </h1>
          <p className="text-violet/55 text-base">
            Let&apos;s understand what happened. You may not need to file a grievance yet.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        {analysis === "idle" && (
          <>
            {/* Language selector */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-violet/50 text-sm">Language:</span>
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
                    lang === l
                      ? "bg-violet text-cream border-violet"
                      : "border-plum/20 text-violet/70 hover:border-plum/50"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Mode toggle */}
            <div className="bg-white border border-plum/10 rounded-2xl p-1.5 inline-flex gap-1">
              <button
                onClick={() => setMode("voice")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  mode === "voice"
                    ? "bg-violet text-cream shadow-sm"
                    : "text-violet/60 hover:text-violet"
                }`}
              >
                   Speak
              </button>
              <button
                onClick={() => setMode("type")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  mode === "type"
                    ? "bg-violet text-cream shadow-sm"
                    : "text-violet/60 hover:text-violet"
                }`}
              >
                 Type your issue
              </button>
            </div>

            {/* Voice mode UI */}
            {mode === "voice" && (
              <div className="bg-white border border-plum/10 rounded-2xl p-8 text-center">
                {voiceState === "idle" && (
                  <div>
                    <p className="text-violet/60 text-sm mb-6">Tap the microphone to start speaking your issue</p>
                    <button
                      onClick={startVoice}
                      className="w-20 h-20 bg-violet rounded-full flex items-center justify-center mx-auto shadow-lg shadow-violet/25 hover:scale-105 hover:shadow-xl transition-all relative"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="2" width="6" height="11" rx="3"/>
                        <path d="M5 10a7 7 0 0 0 14 0"/>
                        <line x1="12" y1="19" x2="12" y2="22"/>
                        <line x1="9" y1="22" x2="15" y2="22"/>
                      </svg>
                    </button>
                    <p className="text-violet/40 text-xs mt-4">Supports English, हिंदी, ગુજરાતી and मराठी</p>
                  </div>
                )}

                {voiceState === "listening" && (
                  <div>
                    <div className="relative w-20 h-20 mx-auto mb-6">
                      <div className="absolute inset-0 bg-plum/20 rounded-full animate-pulse-ring" />
                      <div className="absolute inset-0 bg-plum/10 rounded-full animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
                      <div className="w-20 h-20 bg-plum rounded-full flex items-center justify-center relative z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="2" width="6" height="11" rx="3"/>
                          <path d="M5 10a7 7 0 0 0 14 0"/>
                          <line x1="12" y1="19" x2="12" y2="22"/>
                          <line x1="9" y1="22" x2="15" y2="22"/>
                        </svg>
                      </div>
                    </div>
                    <p className="text-plum font-semibold mb-1">Listening…</p>
                    <div className="flex items-end justify-center gap-1 h-10 mb-4">
                      {waveHeights.map((h, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-plum rounded-full transition-all duration-100"
                          style={{ height: `${h}px` }}
                        />
                      ))}
                    </div>
                    <button onClick={() => setVoiceState("idle")} className="text-violet/50 text-sm underline">
                      Tap to stop
                    </button>
                  </div>
                )}

                {voiceState === "transcribing" && (
                  <div>
                    <div className="w-20 h-20 bg-violet/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 border-3 border-violet border-t-transparent rounded-full animate-spin-slow" />
                    </div>
                    <p className="text-violet/60 text-sm">Transcribing your words…</p>
                  </div>
                )}

                {voiceState === "done" && (
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-green-600 text-sm font-semibold">✓ Transcribed</span>
                    </div>
                    <div className="bg-violet/5 rounded-xl border border-plum/10 p-4 text-violet/80 text-sm leading-relaxed mb-4">
                      {input}
                    </div>
                    <div className="flex gap-3">
                      <button onClick={reset} className="text-plum text-sm border border-plum/20 px-4 py-2 rounded-full hover:bg-plum/5 transition-colors">
                        Re-record
                      </button>
                      <button onClick={handleAnalyze} className="bg-violet text-cream text-sm font-semibold px-6 py-2 rounded-full hover:bg-violet-light transition-colors">
                        Analyse Issue →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Type mode UI */}
            {mode === "type" && (
              <div className="bg-white border border-plum/10 rounded-2xl p-6">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your issue here… For example: My court case has been pending for three years and my hearings keep getting postponed."
                  className="w-full min-h-[140px] text-violet/80 text-sm leading-relaxed placeholder:text-violet/30 resize-none focus:outline-none font-body"
                  rows={6}
                />
                {/* Sample issues */}
                <div className="border-t border-plum/10 pt-4 mt-2">
                  <p className="text-violet/40 text-xs mb-2">Or try an example:</p>
                  <div className="space-y-2">
                    {sampleIssues.map((s) => (
                      <button
                        key={s}
                        onClick={() => setInput(s)}
                        className="block w-full text-left text-xs text-plum/70 hover:text-plum bg-plum/5 hover:bg-plum/10 rounded-lg px-3 py-2 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {mode === "type" && input.trim() && (
              <button
                onClick={handleAnalyze}
                className="w-full bg-violet text-cream font-semibold py-4 rounded-xl hover:bg-violet-light transition-colors shadow-md text-base"
              >
                Analyse My Issue →
              </button>
            )}

            <p className="text-center text-violet/35 text-xs">
              AI suggestions are informational and do not replace official legal or administrative advice.
            </p>
          </>
        )}

        {/* ── Analyzing state ── */}
        {analysis === "analyzing" && (
          <div className="bg-white border border-plum/10 rounded-2xl p-10 text-center animate-fade-up">
            <div className="w-16 h-16 bg-violet/8 rounded-full flex items-center justify-center mx-auto mb-5">
              <div className="w-8 h-8 border-[3px] border-violet border-t-transparent rounded-full animate-spin-slow" />
            </div>
            <p className="font-body text-xl text-violet font-semibold mb-2">SAHAI is understanding your issue…</p>
            <p className="text-violet/50 text-sm">Analysing category, urgency, and possible remedies</p>
            <div className="mt-8 space-y-3 text-left max-w-sm mx-auto">
              {["Classifying grievance type…"].map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-plum/30 border-t-plum rounded-full animate-spin-slow shrink-0" style={{ animationDelay: `${i * 0.3}s` }} />
                  <span className="text-violet/50 text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Simple result ── */}
        {analysis === "result-simple" && (
          <div className="space-y-5 animate-fade-up">
            {/* Classification card */}
            <div className="bg-white border border-plum/10 rounded-2xl p-6">
              <p className="text-plum text-xs font-semibold tracking-widest uppercase mb-4">AI Classification</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Category", value: simpleResult.category },
                  { label: "Issue Type", value: simpleResult.type },
                  { label: "Urgency", value: simpleResult.urgency },
                  { label: "Possible Cause", value: simpleResult.cause },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-violet/45 text-xs mb-0.5">{label}</p>
                    <p className="text-violet font-medium text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Success card */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-5">
                <div>
                  <h3 className="font-body text-xl text-emerald-800 font-semibold mb-1">
                    You may not need to file a grievance yet.
                  </h3>
                  <p className="text-emerald-700/70 text-sm">
                    Based on your issue, there may be an existing process or remedy that can help.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "What you can do", value: simpleResult.whatToDo },
                  { label: "Required documents", value: simpleResult.documents },
                  { label: "Where to apply", value: simpleResult.where },
                  { label: "Expected next step", value: simpleResult.nextStep },
                  { label: "Official resource", value: simpleResult.resource },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3 bg-white/60 rounded-xl p-3 border border-emerald-100">
                    <div>
                      <p className="text-emerald-700 text-xs font-semibold mb-0.5">{label}</p>
                      <p className="text-emerald-800/80 text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button className="flex-1 bg-emerald-700 text-white font-semibold py-3 rounded-xl hover:bg-emerald-800 transition-colors text-sm">
                  Try This Solution
                </button>
                <button
                  onClick={() => navigate("submit")}
                  className="flex-1 border border-emerald-300 text-emerald-800 font-medium py-3 rounded-xl hover:bg-emerald-50 transition-colors text-sm"
                >
                  Still need help? Submit Grievance
                </button>
              </div>
            </div>

            <button onClick={reset} className="w-full text-violet/50 text-sm underline">
              Check a different issue
            </button>
          </div>
        )}

        {/* ── Complex result ── */}
        {analysis === "result-complex" && (
          <div className="space-y-5 animate-fade-up">
            {/* Classification */}
            <div className="bg-white border border-plum/10 rounded-2xl p-6">
              <p className="text-plum text-xs font-semibold tracking-widest uppercase mb-4">AI Classification</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Category", value: complexResult.category },
                  { label: "Issue Type", value: complexResult.type },
                  { label: "Urgency", value: complexResult.urgency },
                  { label: "Possible Cause", value: complexResult.cause },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-violet/45 text-xs mb-0.5">{label}</p>
                    <p className={`font-medium text-sm ${value === "High" ? "text-red-600" : "text-violet"}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Escalation card */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-5">
                <div className="text-2xl">🚨</div>
                <div>
                  <h3 className="font-body text-xl text-red-800 font-semibold mb-1">
                    This appears to require official intervention.
                  </h3>
                  <p className="text-red-700/70 text-sm">
                    SAHAI has assessed that this issue needs to be formally escalated.
                  </p>
                </div>
              </div>

              <div className="bg-red-100/60 border border-red-200 rounded-xl p-4 mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-red-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">Risk Level: HIGH</span>
                </div>
                <p className="text-red-800/80 text-sm">
                  <strong>Reason:</strong> {complexResult.cause}
                </p>
              </div>

              <button
                onClick={() => navigate("submit")}
                className="w-full bg-red-700 text-white font-semibold py-3.5 rounded-xl hover:bg-red-800 transition-colors shadow-md"
              >
                Continue to File Grievance →
              </button>
            </div>

            <p className="text-center text-violet/35 text-xs">
              AI suggestions are informational and do not replace official legal or administrative advice.
            </p>

            <button onClick={reset} className="w-full text-violet/50 text-sm underline">
              Check a different issue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
