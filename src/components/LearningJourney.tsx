import React from 'react';
import { JOURNEY_MILESTONES } from '../data/portfolioData';
import { CheckCircle2, CircleDot, Clock } from 'lucide-react';

export const LearningJourney: React.FC = () => {
  return (
    <section id="journey" className="py-20 bg-white border-y border-neutral-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Chronological Progression
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            My Learning Journey
          </h2>
          <p className="mt-3 text-base text-neutral-600 leading-relaxed">
            A milestone-by-milestone reflection of how curiosity turned into systematic code study, project building, and a clear career trajectory toward AI Engineering.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l-2 border-neutral-200 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {JOURNEY_MILESTONES.map((item) => (
            <div key={item.step} className="relative group">
              {/* Timeline marker on the left line */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-1.5 flex items-center justify-center w-7 h-7 rounded-full border-2 bg-white transition-colors ${
                  item.status === 'completed'
                    ? 'border-neutral-900 text-neutral-900'
                    : item.status === 'in-progress'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-neutral-300 text-neutral-400'
                }`}
              >
                {item.status === 'completed' && <CheckCircle2 className="w-4 h-4 fill-neutral-900 text-white" />}
                {item.status === 'in-progress' && <CircleDot className="w-4 h-4 animate-pulse" />}
                {item.status === 'future' && <Clock className="w-3.5 h-3.5" />}
              </div>

              {/* Milestone Box */}
              <div className="p-6 rounded-xl bg-[#FAF9F6] border border-neutral-200 group-hover:border-neutral-300 transition-all max-w-3xl">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-neutral-400">
                      STEP {item.step}
                    </span>
                    <span aria-hidden="true" className="text-neutral-300">·</span>
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wider ${
                        item.status === 'completed'
                          ? 'text-neutral-700'
                          : item.status === 'in-progress'
                          ? 'text-blue-700'
                          : 'text-neutral-500'
                      }`}
                    >
                      {item.status === 'completed'
                        ? 'Completed Baseline'
                        : item.status === 'in-progress'
                        ? 'Current Focus'
                        : 'Target Trajectory'}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
