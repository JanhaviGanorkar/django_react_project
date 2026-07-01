import React from "react"
import { NavLink } from "react-router-dom"
import { ClipboardList, CheckSquare } from "lucide-react"
import { twMerge } from "tailwind-merge"

export default function Navbar() {
  // Navigation links array for clean code
  const navItems = [
    { to: "/", label: "Todos", icon: <CheckSquare className="h-4 w-4" /> },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
              <ClipboardList className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Dev<span className="text-indigo-600">Space</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-1 sm:space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  twMerge(
                    "relative flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-indigo-50/60 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-50"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.icon}
                    <span>{item.label}</span>
                    {/* Active Bottom Bar Indicator */}
                    {isActive && (
                      <span className="absolute bottom-[-17px] left-0 h-[2px] w-full bg-indigo-600 dark:bg-indigo-400" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

        </div>
      </div>
    </nav>
  )
}