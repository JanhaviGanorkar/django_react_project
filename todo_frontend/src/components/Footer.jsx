import React from "react"
import { ClipboardList } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/60 bg-white py-6 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          
          {/* Left: Branding & Copy */}
          <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
            <ClipboardList className="h-4 w-4 text-indigo-600" />
            <span>
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-50">DevSpace</span>. 
              All rights reserved.
            </span>
          </div>

          {/* Right: Technical Stack Badges */}
          <div className="flex items-center space-x-4 text-xs font-medium text-slate-400 dark:text-slate-500">
            <span className="hover:text-indigo-600 transition-colors">Django REST</span>
            <span>&bull;</span>
            <span className="hover:text-indigo-600 transition-colors">React Vite</span>
            <span>&bull;</span>
            <span className="hover:text-indigo-600 transition-colors">Tailwind v4</span>
          </div>

        </div>
      </div>
    </footer>
  )
}