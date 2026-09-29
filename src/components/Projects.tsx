import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { Terminal, Code, Clock, ArrowUpRight, Play, ExternalLink, Sparkles } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 bg-white border-y border-neutral-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Selected Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Projects
          </h2>
          <p className="mt-3 text-base text-neutral-600 leading-relaxed">
            Small projects that reflect my learning journey and practical experimentation. Built to test foundational algorithms, user inputs, and problem-solving principles.
          </p>
        </div>

        {/* Projects Grid: 2x2 Clean Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-[#FAF9F6] border border-neutral-200 hover:border-neutral-300 transition-all shadow-xs group"
            >
              {/* Card Header & Metadata */}
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-800">{project.category}</span>
                    <span aria-hidden="true" className="text-neutral-400">·</span>
                    <span className="font-mono text-neutral-600">{project.technology}</span>
                  </div>
                  <span className="text-neutral-400 font-mono text-[11px]">0{index + 1}</span>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-neutral-500 font-medium mt-0.5 mb-3">
                  {project.subtitle}
                </p>

                <p className="text-sm text-neutral-600 leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Key Concepts List */}
                <div className="space-y-1.5 pt-2 border-t border-neutral-200/80 mb-6">
                  <div className="text-[11px] font-semibold text-neutral-700 uppercase tracking-wider">
                    Core Concepts Practiced:
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-600">
                    {project.keyConcepts.map((concept, i) => (
                      <span key={i} className="inline-flex items-center gap-1">
                        <span className="text-neutral-400 font-mono">›</span>
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors shadow-xs active:scale-[0.98]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>View Project &amp; Demo</span>
                </button>

                {/* GitHub status: honest coming soon badge */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-neutral-500 bg-neutral-100/90 rounded-md border border-neutral-200 cursor-default select-none"
                  title="Source code is currently being organized on GitHub"
                >
                  <Clock className="w-3 h-3 text-neutral-400" />
                  <span>GitHub link coming soon</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-10 p-5 rounded-xl bg-[#FAF9F6] border border-neutral-200 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-600">
            <strong className="text-neutral-900 font-semibold">Interactive Logic Available: </strong>
            You can test the actual Python decision logic for each project live by clicking &quot;View Project &amp; Demo&quot;.
          </div>
          <a
            href="https://github.com/charysaiteja110-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-blue-600 whitespace-nowrap"
          >
            <span>Check My GitHub Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Interactive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
