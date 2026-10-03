import React from 'react';
import { Target, BookOpen, Compass, Code, Cpu, Award, Camera } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useProfilePhoto } from '../context/PhotoContext';

export const About: React.FC = () => {
  const { photoUrl, openPhotoModal } = useProfilePhoto();
  return (
    <section id="about" className="py-20 bg-white border-y border-neutral-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Academic &amp; Developer Profile
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            About Me
          </h2>
          <p className="mt-3 text-base text-neutral-600 leading-relaxed">
            A grounded, honest look at where I am today and where I am heading as an engineering student.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Narrative - 7 columns */}
          <div className="lg:col-span-7 space-y-6 text-neutral-700 leading-relaxed text-base">
            <p>
              I am currently a <strong>B.Tech 1st-semester student</strong> taking my first deliberate steps into the universe of computer science and Artificial Intelligence. Rather than relying purely on classroom lectures, I believe the most effective way to understand computational logic is by writing code, breaking things, and building functional applications from scratch.
            </p>

            <p>
              My day-to-day focus revolves around mastering <strong>Python fundamentals</strong>, discovering how the web works through <strong>HTML, CSS, and modern web development</strong>, and actively experimenting with <strong>Generative AI workflows</strong>. I am fascinated by how neural networks and modern language models operate under the hood, and I am committed to learning the underlying mathematical and algorithmic principles.
            </p>

            <p>
              Beyond solo practice, I actively participate in <strong>hackathons and ideathons</strong>. These events challenge me to collaborate with fellow students, turn abstract ideas into working prototypes under strict deadlines, and develop resilience when facing technical roadblocks.
            </p>

            {/* Core Values / Student Mindset */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-neutral-200">
                <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 mb-1">
                  <Compass className="w-4 h-4 text-blue-600" />
                  <span>Curiosity &amp; Discipline</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Consistent daily coding practice, reading technical documentation, and asking questions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-neutral-200">
                <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 mb-1">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  <span>Hands-on Application</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Prioritizing working projects over passive tutorial watching to reinforce real syntax.
                </p>
              </div>
            </div>
          </div>

          {/* Cards & Focus Column - 5 columns */}
          <div className="lg:col-span-5 space-y-5">
            {/* Card 1: Currently Learning */}
            <div className="p-6 rounded-xl bg-[#FAF9F6] border border-neutral-200 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold tracking-tight text-neutral-900 uppercase">
                  Currently Learning
                </h3>
              </div>
              <p className="text-xs text-neutral-500 mb-4">
                Active subjects and competencies currently in my daily study schedule:
              </p>
              <ul className="space-y-2.5">
                {PERSONAL_INFO.learningHighlights.map((topic, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-neutral-200/90 text-sm font-medium text-neutral-800"
                  >
                    <span>{topic}</span>
                    <span className="text-[11px] text-neutral-500 font-mono">1st Semester</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Career Goal */}
            <div className="p-6 rounded-xl bg-[#FAF9F6] border border-neutral-200 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-neutral-800" />
                <h3 className="text-sm font-bold tracking-tight text-neutral-900 uppercase">
                  Career Goal
                </h3>
              </div>
              <blockquote className="text-sm font-medium text-neutral-800 italic leading-relaxed border-l-2 border-neutral-900 pl-3">
                &ldquo;{PERSONAL_INFO.careerGoal}&rdquo;
              </blockquote>
              <p className="text-xs text-neutral-500 mt-3">
                Focused on progressive growth across computer science, machine learning models, and building software that addresses real-world needs.
              </p>
            </div>

            {/* Card 3: Developer Profile Portrait */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-[#FAF9F6] shadow-xs group">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <img
                  src={photoUrl}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/profile.jpg';
                  }}
                />
                <button
                  type="button"
                  onClick={openPhotoModal}
                  className="absolute top-3 right-3 px-2.5 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-[11px] font-medium backdrop-blur-md transition-colors flex items-center gap-1.5 shadow-sm"
                  title="Update profile photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Update Photo</span>
                </button>
              </div>
              <div className="p-4 bg-white border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">
                      {PERSONAL_INFO.name}
                    </h4>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      B.Tech 1st Semester · Aspiring AI Engineer
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    2026 Batch
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
