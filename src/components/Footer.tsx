import React from 'react';
import { Linkedin, Github, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#FAF9F6] border-t border-neutral-200 py-12 text-neutral-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-neutral-200">
          <div>
            <div className="text-lg font-bold text-neutral-900 tracking-tight">
              {PERSONAL_INFO.name}
            </div>
            <p className="text-xs text-neutral-500 mt-1 font-medium">
              Building. Learning. Exploring AI.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-200/60 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-200/60 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-200/60 transition-colors flex items-center gap-1 text-xs"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <div>
            &copy; 2026 Sai Teja Chary. All rights reserved.
          </div>
          <div className="font-mono text-[11px] text-neutral-400">
            B.Tech 1st Semester · Student Portfolio
          </div>
        </div>
      </div>
    </footer>
  );
};
