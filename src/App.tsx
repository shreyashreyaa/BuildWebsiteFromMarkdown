import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import CheckIssue from "./pages/CheckIssue";
import SubmitGrievance from "./pages/SubmitGrievance";
import Track from "./pages/Track";
import Insights from "./pages/Insights";

export type Page = "home" | "check" | "submit" | "track" | "insights";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [helpOpen, setHelpOpen] = useState(false);

  const navigate = (p: Page) => {
    setPage(p);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 10);
  };

  return (
    <div className="min-h-full font-body bg-cream text-violet">
      <Nav current={page} navigate={navigate} />

      <main>
        {page === "home" && <Home navigate={navigate} />}
        {page === "check" && <CheckIssue navigate={navigate} />}
        {page === "submit" && <SubmitGrievance navigate={navigate} />}
        {page === "track" && <Track navigate={navigate} />}
        {page === "insights" && <Insights />}
      </main>

      {/* Floating help button */}
      <div className="fixed bottom-6 right-6 z-50">
        {helpOpen && (
          <div className="absolute bottom-14 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-plum/10 p-5 animate-fade-up">
            <p className="font-body text-base font-semibold text-violet mb-3">Need help?</p>
            <div className="space-y-2 text-sm text-violet/70">
              <p> Helpline: 1800-111-SAHAI (72424)</p>
              <p> Available Mon–Sat, 9 AM – 6 PM</p>
              <p>support@sahai.gov.in</p>
            </div>
            <div className="mt-4 pt-3 border-t border-plum/10 text-xs text-plum">
              AI suggestions are informational and do not replace official legal or administrative advice.
            </div>
          </div>
        )}
        <button
          onClick={() => setHelpOpen(!helpOpen)}
          className="bg-plum text-cream px-4 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold hover:bg-violet transition-all duration-200 hover:scale-105"
        >
          <span>Need Help?</span>
        </button>
      </div>
    </div>
  );
}
