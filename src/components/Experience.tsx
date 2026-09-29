import React from 'react';
import { EXPERIENCE_CARDS } from '../data/portfolioData';
import { Flag, Lightbulb, Puzzle, Users, Hammer, PlusCircle } from 'lucide-react';

export const Experience: React.FC = () => {
  const getCardIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Flag className="w-5 h-5 text-blue-600" />;
      case 1:
        return <Lightbulb className="w-5 h-5 text-blue-600" />;
      case 2:
        return <Puzzle className="w-5 h-5 text-blue-600" />;
      case 3:
        return <Users className="w-5 h-5 text-blue-600" />;
      case 4:
      default:
        return <Hammer className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="experience" className="py-20 bg-[#FBFBFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Early-Stage Experience &amp; Collaboration
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Hackathons &amp; Ideathons
          </h2>
          <p className="mt-3 text-base text-neutral-600 leading-relaxed">
            Alongside my academic journey, I actively participate in hackathons and ideathons to improve my problem-solving skills, explore new technologies, collaborate with others, and turn ideas into practical solutions.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCE_CARDS.map((item, index) => (
            <div
              key={item.title}
              className="flex flex-col justify-between p-6 rounded-xl bg-white border border-neutral-200 shadow-xs hover:border-neutral-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-neutral-200">
                    {getCardIcon(index)}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    FOCUS 0{index + 1}
                  </span>
                </div>

                <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                  {item.category}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-3 border-t border-neutral-100">
                  {item.highlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="text-xs text-neutral-600 flex items-start gap-2"
                    >
                      <span className="text-blue-500 font-bold leading-none mt-0.5">•</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Active Participant</span>
                <span className="font-mono">B.Tech 1st Sem</span>
              </div>
            </div>
          ))}

          {/* Reserved slot for future hackathons */}
          <div className="p-6 rounded-xl border border-dashed border-neutral-300 bg-[#FAF9F6]/50 flex flex-col justify-center items-center text-center">
            <div className="p-3 rounded-full bg-white border border-neutral-200 text-neutral-400 mb-3">
              <PlusCircle className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-neutral-800 mb-1">
              Upcoming Hackathons &amp; Events
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
              Actively preparing for upcoming collegiate hackathons, open ideathons, and AI engineering hack days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
