import { useState } from "react"
import type { Page } from "../App"
import { sahaiLogo } from "./assets"
interface NavProps {
  current: Page
  navigate: (p: Page) => void
}

const links: { label: string page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Check Issue", page: "check" },
  { label: "Submit", page: "submit" },
  { label: "Track", page: "track" },
  { label: "Insights", page: "insights" },
]

export default function Nav({ current, navigate }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 bg-violet/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 h-[69px] flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-3 group"
        >
          <img
            src={sahaiLogo}
            alt="SAHAI logo"
            className="w-16 h-16 object-contain group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col items-start">
            <span className="font-body font-semibold text-cream text-lg leading-none tracking-wide">
              SAHAI
            </span>
            <span className="text-peach/60 text-[10px] leading-none font-light hidden sm:block">
              AI Grievance Intelligence
            </span>
          </div>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                current === page
                  ? "bg-peach text-violet shadow-sm"
                  : "text-cream/70 hover:text-cream hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-violet border-t border-white/10 px-5 py-4 flex flex-col gap-1">
          {links.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => {
                navigate(page)
                setMenuOpen(false)
              }}
              className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                current === page
                  ? "bg-peach text-violet"
                  : "text-cream/70 hover:text-cream hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
