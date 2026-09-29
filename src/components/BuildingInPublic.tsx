import React from 'react';
import { Github, ExternalLink, GitBranch, Terminal, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

export const BuildingInPublic: React.FC = () => {
  return (
    <section id="github" className="py-20 bg-[#FBFBFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Card */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text description */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                <Github className="w-4 h-4 text-neutral-900" />
                <span>Open Source &amp; Code Repository</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                Building in Public
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl">
                I share my learning progress, small coding assignments, and exploratory Python experiments on GitHub. As a 1st-semester student, I use version control to document my growth, practice regular git commit hygiene, and maintain clean directory structures.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={PERSONAL_INFO.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-all shadow-sm active:scale-[0.99]"
                >
                  <Github className="w-4 h-4" />
                  <span>Visit My GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <div className="text-xs text-neutral-500 font-mono">
                  @charysaiteja110-dev
                </div>
              </div>
            </div>

            {/* Quiet Code preview / Repo representation */}
            <div className="lg:col-span-4 bg-[#FAF9F6] rounded-xl border border-neutral-200 p-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-500 border-b border-neutral-200/80 pb-2">
                <span className="font-semibold text-neutral-800">Learning Repositories</span>
                <span className="font-mono text-[11px]">Git Verified</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {PROJECTS.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    className="p-2.5 bg-white rounded-lg border border-neutral-200/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 truncate mr-2">
                      <GitBranch className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="font-mono font-medium text-neutral-800 truncate">
                        {p.title.toLowerCase().replace(/\s+/g, '-')}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-500 font-mono shrink-0">
                      {p.technology.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-neutral-400 text-center pt-1">
                Committed to transparent, continuous learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
