import { useState } from "react";
import type { Page } from "../App";

interface Props {
  navigate: (p: Page) => void;
}

type Category = "judicial" | "bureaucratic" | "";

const judicialSubs = [
  "Case backlog",
  "Hearing repeatedly postponed",
  "Case pending for prolonged period",
  "Order / Judgment delay",
  "Other judicial delay",
];

const bureaucraticSubs = [
  "Excessive paperwork",
  "Repeated approvals required",
  "Application pending",
  "File / Process delay",
  "Unclear procedure or regulation",
  "Other administrative delay",
];

const indianLocations = [
  "Ward 12, Sector 5, New Delhi — 110015",
  "Koramangala, Bengaluru — 560034",
  "Bandra West, Mumbai — 400050",
  "Anna Nagar, Chennai — 600040",
  "Sector 17, Chandigarh — 160017",
];

const steps = ["Issue", "Location", "Description", "Documents", "Review & Submit"];

export default function SubmitGrievance({ navigate }: Props) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<Category>("");
  const [subCategory, setSubCategory] = useState("");
  const [location, setLocation] = useState("");
  const [pinDropped, setPinDropped] = useState(false);
  const [description, setDescription] = useState("");
  const [voiceActive, setVoiceActive] = useState(false);
  const [caseNumber, setCaseNumber] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const subcategories = category === "judicial" ? judicialSubs : bureaucraticSubs;

  const handleMapClick = () => {
    if (!pinDropped) {
      setLocation(indianLocations[Math.floor(Math.random() * indianLocations.length)]);
      setPinDropped(true);
    }
  };

  const simulateVoice = () => {
    setVoiceActive(true);
    setTimeout(() => {
      setDescription(
        "I filed a property mutation application with the local tehsildar office on 14th March 2025. Despite multiple follow-ups and providing all required documents, no action has been taken. The application is still showing as pending in the portal with no timeline provided."
      );
      setVoiceActive(false);
    }, 2500);
  };

  const grievanceId = `SAH-2026-${Math.floor(Math.random() * 90000) + 10000}`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{background: "var(--color-cream)"}}>
            <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" stroke="#16a34a" strokeWidth="1.5" fill="transparent"/>
              <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="font-body text-3xl text-violet font-semibold mb-3">Grievance Submitted</h2>
          <p className="text-violet/60 mb-6">
            Your grievance has been registered and is being reviewed by SAHAI&apos;s AI system. You&apos;ll receive updates as it progresses.
          </p>
          <div className="bg-white border border-plum/10 rounded-2xl p-5 mb-6 text-left">
            <p className="text-violet/50 text-xs mb-1">Grievance Reference ID</p>
            <p className="font-body text-2xl text-violet font-semibold">{grievanceId}</p>
            <p className="text-violet/40 text-xs mt-1">Save this ID to track your grievance</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate("track")} className="flex-1 bg-violet text-cream font-semibold py-3.5 rounded-xl hover:bg-violet-light transition-colors">
              Track Status
            </button>
            <button onClick={() => navigate("home")} className="flex-1 border border-plum/20 text-violet font-medium py-3.5 rounded-xl hover:bg-plum/5 transition-colors">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream font-body">
      {/* Header */}
      <div className="bg-violet/5 border-b border-plum/10 py-8 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-plum text-xs font-semibold tracking-widest uppercase mb-2">Submit Grievance</p>
          <h1 className="font-body text-3xl text-violet font-semibold">File a new grievance</h1>
        </div>
      </div>

      {/* Progress steps */}
      <div className="bg-white border-b border-plum/10 px-6 py-5">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-1 overflow-x-auto">
            {steps.map((s, i) => {
              const n = i + 1;
              const isActive = n === step;
              const isDone = n < step;
              return (
                <div key={s} className="flex items-center gap-1 min-w-0">
                  <div className="flex items-center gap-2 shrink-0">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isActive
                          ? "bg-violet text-cream"
                          : isDone
                          ? "bg-plum/80 text-cream"
                          : "bg-plum/10 text-violet/40"
                      }`}
                    >
                      {isDone ? "✓" : n}
                    </div>
                    <span className={`text-sm font-medium whitespace-nowrap hidden sm:block ${isActive ? "text-violet" : isDone ? "text-plum" : "text-violet/35"}`}>
                      {s}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-px w-6 lg:w-12 mx-1 transition-colors ${n < step ? "bg-plum/50" : "bg-plum/15"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* ── Step 1: Issue ── */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-up">
            <div>
              <h2 className="font-body text-2xl text-violet font-semibold mb-1">Select Issue Category</h2>
              <p className="text-violet/50 text-sm">Choose the type of grievance you want to report</p>
            </div>

            <div>
              <label className="text-violet/60 text-xs font-semibold uppercase tracking-wider block mb-3">Issue Category *</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "judicial" as Category, icon: "⚖️", label: "Judicial Delay" },
                  { id: "bureaucratic" as Category, icon: "🏛️", label: "Bureaucratic Delay" },
                ].map(({ id, icon, label }) => (
                  <button
                    key={id}
                    onClick={() => { setCategory(id); setSubCategory(""); }}
                    className={`flex flex-col items-start gap-2 p-5 rounded-2xl border-2 transition-all ${
                      category === id
                        ? "border-violet bg-violet/5"
                        : "border-plum/15 hover:border-plum/35 bg-white"
                    }`}
                  >
                    <span className={`font-semibold text-sm ${category === id ? "text-violet" : "text-violet/70"}`}>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {category && (
              <div>
                <label className="text-violet/60 text-xs font-semibold uppercase tracking-wider block mb-3">Subcategory *</label>
                <div className="flex flex-wrap gap-2">
                  {subcategories.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSubCategory(s)}
                      className={`px-4 py-2 rounded-full border text-sm transition-all ${
                        subCategory === s
                          ? "bg-violet text-cream border-violet"
                          : "border-plum/20 text-violet/70 hover:border-plum/40 bg-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              disabled={!category || !subCategory}
              onClick={() => setStep(2)}
              className="w-full bg-violet text-cream font-semibold py-4 rounded-xl disabled:opacity-30 hover:bg-violet-light transition-colors mt-4 disabled:cursor-not-allowed"
            >
              Next: Select Location →
            </button>
          </div>
        )}

        {/* ── Step 2: Location ── */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-up">
            <div>
              <h2 className="font-body text-2xl text-violet font-semibold mb-1">Location</h2>
              <p className="text-violet/50 text-sm">Where did this issue occur or where is it being handled?</p>
            </div>

            <div>
              <label className="text-violet/60 text-xs font-semibold uppercase tracking-wider block mb-3">Location *</label>

              {/* Map placeholder */}
              <div
                onClick={handleMapClick}
                className="relative w-full h-64 bg-plum/8 border-2 border-dashed border-plum/20 rounded-2xl overflow-hidden cursor-pointer hover:border-plum/40 transition-colors group"
              >
                {/* Grid lines to simulate map */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="absolute w-full h-px bg-plum/40" style={{ top: `${i * 12.5}%` }} />
                  ))}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="absolute h-full w-px bg-plum/40" style={{ left: `${i * 12.5}%` }} />
                  ))}
                </div>

                {/* Roads simulation */}
                <div className="absolute inset-0 opacity-15">
                  <div className="absolute w-full h-1.5 bg-plum/60 top-1/3" />
                  <div className="absolute w-full h-0.5 bg-plum/40 top-2/3" />
                  <div className="absolute h-full w-1.5 bg-plum/60 left-1/3" />
                  <div className="absolute h-full w-0.5 bg-plum/40 left-2/3" />
                </div>

                {pinDropped ? (
                  <div className="absolute" style={{ top: "42%", left: "47%" }}>
                    <div className="relative">
                      <div className="w-8 h-8 bg-violet rounded-full flex items-center justify-center shadow-lg border-2 border-cream">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-cream" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 12 6 12s6-7.582 6-12c0-3.314-2.686-6-6-6zm0 8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
                      </div>
                      <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-violet rotate-45 -translate-x-1/2 translate-y-1/2" />
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-plum/50 mb-2" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 12 6 12s6-7.582 6-12c0-3.314-2.686-6-6-6zm0 8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
                    <p className="text-plum/60 text-sm font-medium">Map picker</p>
                    <p className="text-plum/40 text-xs">Click to drop pin</p>
                  </div>
                )}
              </div>

              {/* Location options */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => { setLocation("Current Location: Connaught Place, New Delhi — 110001"); setPinDropped(true); }}
                  className="flex items-center gap-2 text-xs text-violet/70 border border-plum/15 px-3 py-2 rounded-full hover:border-plum/35 hover:bg-white transition-all bg-white/50"
                >
                   Use current location
                </button>
                <button
                  onClick={() => { setLocation("Saket District Court, New Delhi — 110017"); setPinDropped(true); }}
                  className="flex items-center gap-2 text-xs text-violet/70 border border-plum/15 px-3 py-2 rounded-full hover:border-plum/35 hover:bg-white transition-all bg-white/50"
                >
                   Search location
                </button>
              </div>

              {/* Address display */}
              {location && (
                <div className="mt-3 bg-white border border-plum/15 rounded-xl px-4 py-3 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-plum shrink-0" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 12 6 12s6-7.582 6-12c0-3.314-2.686-6-6-6zm0 8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
                  <span className="text-violet text-sm">{location}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 border border-plum/20 text-violet font-medium py-3.5 rounded-xl hover:bg-plum/5 transition-colors">
                ← Back
              </button>
              <button
                disabled={!location}
                onClick={() => setStep(3)}
                className="flex-1 bg-violet text-cream font-semibold py-3.5 rounded-xl disabled:opacity-30 hover:bg-violet-light transition-colors disabled:cursor-not-allowed"
              >
                Next: Description →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Description ── */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-up">
            <div>
              <h2 className="font-body text-2xl text-violet font-semibold mb-1">Describe what happened</h2>
              <p className="text-violet/50 text-sm">Be as specific as possible — dates, offices, officials involved</p>
            </div>

            <div className="bg-white border border-plum/10 rounded-2xl p-5">
              {/* Voice button */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-plum/10">
                <button
                  onClick={simulateVoice}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    voiceActive
                      ? "bg-plum text-cream animate-pulse"
                      : "bg-violet text-cream hover:bg-violet-light"
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>
                  {voiceActive ? "Listening…" : "Speak Description"}
                </button>
                {voiceActive && (
                  <div className="flex items-end gap-0.5 h-8">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-plum rounded-full animate-wave"
                        style={{ animationDelay: `${i * 0.08}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your grievance in detail. Include dates, office names, application numbers, and any other relevant information…"
                className="w-full min-h-[180px] text-violet/80 text-sm leading-relaxed placeholder:text-violet/30 resize-none focus:outline-none font-body"
                rows={8}
              />
              <div className="flex justify-between mt-2 pt-2 border-t border-plum/10">
                <span className="text-violet/35 text-xs">{description.length} characters</span>
                <span className="text-violet/35 text-xs">Recommended: 200+ characters</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 border border-plum/20 text-violet font-medium py-3.5 rounded-xl hover:bg-plum/5 transition-colors">
                ← Back
              </button>
              <button
                disabled={description.trim().length < 20}
                onClick={() => setStep(4)}
                className="flex-1 bg-violet text-cream font-semibold py-3.5 rounded-xl disabled:opacity-30 hover:bg-violet-light transition-colors disabled:cursor-not-allowed"
              >
                Next: Documents →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Supporting documents ── */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-up">
            <div>
              <h2 className="font-body text-2xl text-violet font-semibold mb-1">Supporting Information</h2>
              <p className="text-violet/50 text-sm">All fields are optional — add what you have</p>
            </div>

            {/* Document upload */}
            <div>
              <label className="text-violet/60 text-xs font-semibold uppercase tracking-wider block mb-3">Upload Documents</label>
              <div className="border-2 border-dashed border-plum/20 rounded-2xl p-8 text-center hover:border-plum/40 hover:bg-plum/3 transition-all cursor-pointer bg-white">
                <div className="flex items-center justify-center mb-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-plum/40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.41 17.41a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                </div>
                <p className="text-violet/60 text-sm font-medium mb-1">Drop files here or click to upload</p>
                <p className="text-violet/35 text-xs">PDF, JPG, PNG — max 10 MB each</p>
              </div>
            </div>

            {/* Screenshot upload */}
            <div>
              <label className="text-violet/60 text-xs font-semibold uppercase tracking-wider block mb-3">Screenshots</label>
              <div className="border-2 border-dashed border-plum/20 rounded-2xl p-6 text-center hover:border-plum/40 transition-all cursor-pointer bg-white">
                <p className="text-violet/50 text-sm flex items-center justify-center gap-1.5">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                  Add screenshots (portal errors, rejections, etc.)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-violet/60 text-xs font-semibold uppercase tracking-wider block mb-2">Case / Application Number</label>
                <input
                  type="text"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  placeholder="e.g. DCC/2024/8821"
                  className="w-full bg-white border border-plum/15 rounded-xl px-4 py-3 text-violet text-sm placeholder:text-violet/30 focus:outline-none focus:border-plum/40"
                />
              </div>
              <div>
                <label className="text-violet/60 text-xs font-semibold uppercase tracking-wider block mb-2">Date of Incident</label>
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  className="w-full bg-white border border-plum/15 rounded-xl px-4 py-3 text-violet text-sm focus:outline-none focus:border-plum/40"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(3)} className="flex-1 border border-plum/20 text-violet font-medium py-3.5 rounded-xl hover:bg-plum/5 transition-colors">
                ← Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="flex-1 bg-violet text-cream font-semibold py-3.5 rounded-xl hover:bg-violet-light transition-colors"
              >
                Review & Submit →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 5: Review & Submit ── */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-up">
            <div>
              <h2 className="font-body text-2xl text-violet font-semibold mb-1">Review your grievance</h2>
              <p className="text-violet/50 text-sm">Check all details before submitting</p>
            </div>

            <div className="bg-white border border-plum/10 rounded-2xl divide-y divide-plum/8">
              {[
                { label: "Category", value: category === "judicial" ? "Judicial Delay" : "🏛️ Bureaucratic Delay" },
                { label: "Subcategory", value: subCategory },
                { label: "Location", value: location || "Not specified" },
                { label: "Case Number", value: caseNumber || "Not provided" },
                { label: "Incident Date", value: incidentDate || "Not provided" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-4 px-5 py-4">
                  <p className="text-violet/45 text-xs font-semibold uppercase tracking-wide w-28 shrink-0 pt-0.5">{label}</p>
                  <p className="text-violet text-sm">{value}</p>
                </div>
              ))}
              <div className="px-5 py-4">
                <p className="text-violet/45 text-xs font-semibold uppercase tracking-wide mb-2">Description</p>
                <p className="text-violet/80 text-sm leading-relaxed line-clamp-4">{description}</p>
              </div>
            </div>

            {/* Anonymous toggle */}
            <button
              onClick={() => setAnonymous(!anonymous)}
              className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                anonymous ? "border-violet bg-violet/5" : "border-plum/15 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-left">
                  <p className="font-semibold text-violet text-sm">Submit Anonymously</p>
                  <p className="text-violet/50 text-xs">Your personal details will not be attached to this grievance</p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full transition-all ${anonymous ? "bg-violet" : "bg-plum/20"}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm m-0.5 transition-transform ${anonymous ? "translate-x-6" : "translate-x-0"}`} />
              </div>
            </button>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
              By submitting, you confirm that the information provided is true to the best of your knowledge.
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(4)} className="border border-plum/20 text-violet font-medium py-3.5 px-6 rounded-xl hover:bg-plum/5 transition-colors">
                ← Back
              </button>
              <button
                onClick={() => setSubmitted(true)}
                className="flex-1 bg-violet text-cream font-semibold py-3.5 rounded-xl hover:bg-violet-light transition-colors shadow-md"
              >
                Submit Grievance ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
