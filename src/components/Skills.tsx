import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code2, BrainCircuit, Wrench, CheckCircle } from 'lucide-react';

export const Skills: React.FC = () => {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code2 className="w-5 h-5 text-blue-600" />;
      case 1:
        return <BrainCircuit className="w-5 h-5 text-blue-600" />;
      case 2:
      default:
        return <Wrench className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#FBFBFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Competencies &amp; Toolkit
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Skills &amp; Technologies
          </h2>
          <p className="mt-3 text-base text-neutral-600 leading-relaxed">
            Honest, transparent representation of the technical skills I am actively building during my 1st semester. No exaggerated percentage bars or fabricated senior expertise.
          </p>
        </div>

        {/* 3 Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <div
              key={category.title}
              className="flex flex-col bg-white rounded-xl border border-neutral-200/90 p-6 shadow-xs"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-neutral-100 border border-neutral-200">
                  {getCategoryIcon(catIdx)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    {category.title}
                  </h3>
                  <div className="text-xs text-neutral-500">
                    Category {catIdx + 1} of 3
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
                {category.subtitle}
              </p>

              {/* Skills List in Category */}
              <div className="space-y-4 flex-1">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-lg bg-[#FAF9F6] border border-neutral-200/80 transition-all hover:border-neutral-300"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-neutral-900">
                        {skill.name}
                      </span>
                      <span className="text-[11px] font-medium text-neutral-500 font-mono">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quiet commitment note */}
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Practiced via coursework &amp; code</span>
                <span className="font-mono">1st Sem</span>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Standard Callout */}
        <div className="mt-10 p-5 rounded-xl bg-white border border-neutral-200 text-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-neutral-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Transparent Learning Approach</span>
            </h4>
            <p className="text-xs text-neutral-600 max-w-2xl">
              I prioritize sound algorithmic thinking and solid fundamentals in data structures, rather than claiming surface-level mastery of 30 different frameworks.
            </p>
          </div>
          <div className="text-xs font-mono text-neutral-500 whitespace-nowrap">
            Status: Foundation Stage
          </div>
        </div>
      </div>
    </section>
  );
};
