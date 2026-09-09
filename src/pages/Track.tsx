import { useState } from "react";
import type { Page } from "../App";

interface Props {
  navigate: (p: Page) => void;
}

type TimelineStatus = "done" | "active" | "pending";

interface TimelineStep {
  label: string;
  date?: string;
  note?: string;
  status: TimelineStatus;
}

const sampleGrievance = {
  id: "SAH-2026-48291",
  category: "Judicial Delay",
  subCategory: "Hearing repeatedly postponed",
  priority: "HIGH",
  department: "Delhi High Court — Grievance Cell",
  submitted: "12 Aug 2026",
  expectedResponse: "10 Sep 2026",
  currentStatus: "Under Review",
  location: "Saket District Court, New Delhi — 110017",
};

const timeline: TimelineStep[] = [
  { label: "Submitted", date: "12 Aug 2026, 10:34 AM", note: "Grievance received and logged", status: "done" },
  { label: "AI Classified", date: "12 Aug 2026, 10:35 AM", note: "Category: Judicial Delay | Priority: HIGH", status: "done" },
  { label: "Assigned to Authority", date: "13 Aug 2026, 9:00 AM", note: "Routed to Delhi High Court Grievance Cell", status: "done" },
  { label: "Under Review", date: "18 Aug 2026", note: "Authority has acknowledged and is reviewing", status: "active" },
  { label: "Action Taken", status: "pending" },
  { label: "Citizen Verification", status: "pending" },
  { label: "Resolved", status: "pending" },
];

const authorityResolved = true;

export default function Track({ navigate }: Props) {
  const [inputId, setInputId] = useState("");
  const [found, setFound] = useState(false);
  const [verified, setVerified] = useState<"yes" | "no" | null>(null);
  const [reopened, setReopened] = useState(false);
  const [addingInfo, setAddingInfo] = useState(false);
  const [extraInfo, setExtraInfo] = useState("");

  const handleSearch = () => {
    if (inputId.trim()) setFound(true);
  };

  const priorityColor = {
    HIGH: "bg-red-100 text-red-700 border-red-200",
    MEDIUM: "bg-amber-100 text-amber-700 border-amber-200",
    LOW: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <div className="min-h-screen bg-cream font-body">
      {/* Header */}
      <div className="bg-violet/5 border-b border-plum/10 py-10 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-plum text-xs font-semibold tracking-widest uppercase mb-3">Grievance Tracking</p>
          <h1 className="font-body text-4xl text-violet font-semibold mb-3">Track Your Grievance</h1>
          <p className="text-violet/50 text-base">Enter your reference number to see real-time status</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Search input */}
        <div className="bg-white border border-plum/10 rounded-2xl p-6">
          <label className="text-violet/60 text-xs font-semibold uppercase tracking-wider block mb-3">
            Grievance ID / Reference Number
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="e.g. SAH-2026-48291"
              className="flex-1 bg-cream border border-plum/15 rounded-xl px-4 py-3 text-violet text-sm placeholder:text-violet/30 focus:outline-none focus:border-plum/40 font-body"
            />
            <button
              onClick={handleSearch}
              className="bg-violet text-cream font-semibold px-6 py-3 rounded-xl hover:bg-violet-light transition-colors text-sm"
            >
              Track →
            </button>
          </div>
          <button
            onClick={() => { setInputId(sampleGrievance.id); setFound(true); }}
            className="mt-3 text-plum text-xs underline hover:text-violet transition-colors"
          >
            Use sample ID: {sampleGrievance.id}
          </button>
        </div>

        {found && (
          <>
            {/* Grievance overview */}
            <div className="bg-white border border-plum/10 rounded-2xl overflow-hidden animate-fade-up">
              <div className="bg-violet px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-peach/60 text-xs font-semibold uppercase tracking-wide">Grievance ID</p>
                  <p className="font-body text-xl text-cream font-semibold">{sampleGrievance.id}</p>
                </div>
                <div className={`text-xs font-bold px-3 py-1.5 rounded-full border ${priorityColor[sampleGrievance.priority as keyof typeof priorityColor]}`}>
                  {sampleGrievance.priority} PRIORITY
                </div>
              </div>

              <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-5">
                {[
                  { label: "Category", value: sampleGrievance.category },
                  { label: "Subcategory", value: sampleGrievance.subCategory },
                  { label: "Department", value: sampleGrievance.department },
                  { label: "Submitted", value: sampleGrievance.submitted },
                  { label: "Expected Response", value: sampleGrievance.expectedResponse },
                  { label: "Current Status", value: sampleGrievance.currentStatus, highlight: true },
                ].map(({ label, value, highlight }) => (
                  <div key={label}>
                    <p className="text-violet/45 text-xs mb-0.5">{label}</p>
                    <p className={`text-sm font-medium ${highlight ? "text-plum font-semibold" : "text-violet"}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Authority resolved notice */}
            {authorityResolved && verified === null && !reopened && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 animate-fade-up">
                <div className="flex items-start gap-3">
                  <div>
                    <p className="font-semibold text-amber-900 mb-1">Authority marked this as resolved.</p>
                    <p className="text-amber-700/80 text-sm mb-4">Did this actually solve your issue?</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setVerified("yes")}
                        className="flex items-center gap-2 bg-green-700 text-white font-semibold px-5 py-2.5 rounded-full hover:bg-green-800 transition-colors text-sm"
                      >
                        ✓ Yes, close grievance
                      </button>
                      <button
                        onClick={() => { setVerified("no"); setReopened(true); }}
                        className="flex items-center gap-2 border border-red-300 text-red-700 font-semibold px-5 py-2.5 rounded-full hover:bg-red-50 transition-colors text-sm"
                      >
                        ✕ No, reopen grievance
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {verified === "yes" && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center animate-fade-up">
                <div className="flex items-center justify-center mx-auto mb-2 w-10 h-10">
                  <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11" stroke="#16a34a" strokeWidth="1.5" fill="transparent"/>
                    <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-semibold text-green-800">Grievance closed. Thank you for confirming!</p>
                <p className="text-green-700/70 text-sm mt-1">Your feedback helps improve governance.</p>
              </div>
            )}

            {reopened && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 animate-fade-up">
                <p className="font-semibold text-red-800 text-sm">✓ Grievance reopened. SAHAI has notified the authority.</p>
              </div>
            )}

            {/* Status timeline */}
            <div className="bg-white border border-plum/10 rounded-2xl p-6 animate-fade-up">
              <h3 className="font-body text-lg text-violet font-semibold mb-6">Status Timeline</h3>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-plum/10" />

                <div className="space-y-6">
                  {timeline.map((t, i) => (
                    <div key={i} className="flex items-start gap-4 relative">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 relative z-10 border-2 ${
                          t.status === "done"
                            ? "bg-violet border-violet"
                            : t.status === "active"
                            ? "bg-peach border-plum animate-pulse"
                            : "bg-cream border-plum/20"
                        }`}
                      >
                        {t.status === "done" && <span className="text-cream text-xs font-bold">✓</span>}
                        {t.status === "active" && <div className="w-2.5 h-2.5 bg-plum rounded-full" />}
                        {t.status === "pending" && <div className="w-2 h-2 bg-plum/20 rounded-full" />}
                      </div>
                      <div className="pt-0.5 flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className={`font-semibold text-sm ${t.status === "pending" ? "text-violet/35" : "text-violet"}`}>
                            {t.label}
                          </p>
                          {t.status === "active" && (
                            <span className="text-xs bg-peach text-violet font-semibold px-2.5 py-0.5 rounded-full">In Progress</span>
                          )}
                        </div>
                        {t.date && <p className="text-violet/45 text-xs mt-0.5">{t.date}</p>}
                        {t.note && <p className="text-violet/60 text-xs mt-1">{t.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setAddingInfo(!addingInfo)}
                className="flex flex-col items-center gap-2 bg-white border border-plum/15 rounded-2xl p-4 hover:border-plum/35 hover:bg-plum/3 transition-all text-center"
              >
                <span className="text-violet text-xs font-semibold">Add Information</span>
              </button>
              <button className="flex flex-col items-center gap-2 bg-white border border-plum/15 rounded-2xl p-4 hover:border-plum/35 hover:bg-plum/3 transition-all text-center">
                <span className="text-violet text-xs font-semibold">Request Escalation</span>
              </button>
              <button className="flex flex-col items-center gap-2 bg-white border border-plum/15 rounded-2xl p-4 hover:border-plum/35 hover:bg-plum/3 transition-all text-center">
                <span className="text-violet text-xs font-semibold">Share Status</span>
              </button>
            </div>

            {addingInfo && (
              <div className="bg-white border border-plum/10 rounded-2xl p-5 animate-fade-up">
                <p className="font-semibold text-violet text-sm mb-3">Add Information to this Grievance</p>
                <textarea
                  value={extraInfo}
                  onChange={(e) => setExtraInfo(e.target.value)}
                  placeholder="Add any new developments, documents, or information relevant to your grievance…"
                  className="w-full min-h-[100px] bg-cream/50 border border-plum/15 rounded-xl p-4 text-violet text-sm placeholder:text-violet/30 focus:outline-none resize-none font-body"
                />
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => setAddingInfo(false)}
                    className="text-violet/50 text-sm border border-plum/15 px-4 py-2 rounded-full hover:bg-plum/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="bg-violet text-cream text-sm font-semibold px-5 py-2 rounded-full hover:bg-violet-light transition-colors">
                    Submit Update
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {!found && (
          <div className="text-center py-12 text-violet/30">
            <p className="text-base">Enter a grievance ID above to view status</p>
          </div>
        )}
      </div>
    </div>
  );
}
