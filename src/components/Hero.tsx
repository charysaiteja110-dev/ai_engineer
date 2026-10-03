import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Play, Terminal, Sparkles, CheckCircle2, Camera } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useProfilePhoto } from '../context/PhotoContext';

const CODE_SNIPPETS = [
  {
    id: 'python',
    fileName: 'python_logic.py',
    tag: 'Python Core',
    code: `# Algorithmic logic & condition verification
def evaluate_candidate(age, has_id):
    if age >= 18 and has_id:
        return "ELIGIBLE: Ready to participate"
    return "PENDING: Minimum age criteria unmet"

result = evaluate_candidate(18, True)
print(result)`,
    output: '>>> ELIGIBLE: Ready to participate',
  },
  {
    id: 'prompt',
    fileName: 'genai_experiment.py',
    tag: 'Gen AI Pipeline',
    code: `# Prompt structuring experiment
system_instruction = "Act as an academic logic tutor."
user_prompt = "Explain recursion with a simple base case."

# Formatting structured prompt context
pipeline_ready = len(user_prompt) > 0
print(f"Context verified. Dispatching payload...")`,
    output: '>>> Context verified. Dispatching payload...',
  },
  {
    id: 'web',
    fileName: 'web_state.py',
    tag: 'Web Logic',
    code: `# Data processing for web components
scores = [88, 92, 79, 95]
average = sum(scores) / len(scores)
print(f"Student Average: {average:.1f}% | Tier: Distinction")`,
    output: '>>> Student Average: 88.5% | Tier: Distinction',
  },
];

export const Hero: React.FC = () => {
  const { photoUrl, openPhotoModal } = useProfilePhoto();
  const [activeSnippetIdx, setActiveSnippetIdx] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);

  const activeSnippet = CODE_SNIPPETS[activeSnippetIdx];

  const handleRun = () => {
    setIsExecuting(true);
    setHasExecuted(false);
    setTimeout(() => {
      setIsExecuting(false);
      setHasExecuted(true);
    }, 280);
  };

  const handleTabChange = (idx: number) => {
    setActiveSnippetIdx(idx);
    setHasExecuted(false);
  };

  return (
    <section id="home" className="relative pt-10 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-7 space-y-6">
            {/* Student Profile Identity Card */}
            <div className="flex items-center gap-3.5 p-2.5 pr-4 bg-[#FAF9F6] border border-neutral-200/90 rounded-2xl w-fit shadow-xs group">
              <div className="relative">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-neutral-200 shadow-xs ring-1 ring-neutral-300/60 bg-neutral-100">
                  <img
                    src={photoUrl}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/profile.jpg';
                    }}
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" title="Active & learning"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
                    {PERSONAL_INFO.name}
                  </h2>
                  <button
                    type="button"
                    onClick={openPhotoModal}
                    className="text-[11px] font-medium text-neutral-500 hover:text-blue-600 flex items-center gap-1 transition-colors px-1.5 py-0.5 rounded hover:bg-neutral-200/60"
                    title="Change or upload photo"
                  >
                    <Camera className="w-3 h-3" />
                    <span className="hidden sm:inline">Change Photo</span>
                  </button>
                </div>
                <div className="text-xs text-neutral-500 flex items-center gap-1.5 mt-0.5">
                  <span>B.Tech 1st Sem</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-blue-700 font-medium">Aspiring AI Engineer</span>
                </div>
              </div>
            </div>

            {/* Small label: unboxed text with typographic separator */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>B.Tech Student</span>
              <span aria-hidden="true" className="text-neutral-400">·</span>
              <span className="text-blue-700">Aspiring AI Engineer</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.12] text-balance">
              Building My Journey into AI &amp; Technology.
            </h1>

            {/* Supporting paragraph */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
              I’m <strong className="font-semibold text-neutral-900">{PERSONAL_INFO.name}</strong>, a B.Tech student exploring Python, Web Development, and Generative AI. I’m passionate about learning by building projects and participating in hackathons and ideathons.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-all shadow-sm active:scale-[0.99]"
              >
                <span>View My Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-neutral-800 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 hover:border-neutral-400 transition-all active:scale-[0.99]"
              >
                <span>Connect With Me</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500" />
              </a>
            </div>

            {/* Honest Student Highlights */}
            <div className="pt-4 border-t border-neutral-200/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-700" />
                <span>B.Tech 1st Semester</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-700" />
                <span>Hands-on Python &amp; Web</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-700" />
                <span>Hackathon &amp; Ideathon Explorer</span>
              </div>
            </div>
          </div>

          {/* Right Column: Subtle, high-taste developer logic element */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl border border-neutral-200 bg-[#161618] text-neutral-200 shadow-xl overflow-hidden">
              {/* Window Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#111113] border-b border-neutral-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block"></span>
                  <span className="ml-2 font-mono text-[11px] text-neutral-400">
                    {activeSnippet.fileName}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 font-mono">
                  Python 3.12
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center border-b border-neutral-800 bg-[#141416] px-2 pt-1 gap-1 overflow-x-auto">
                {CODE_SNIPPETS.map((snippet, idx) => (
                  <button
                    key={snippet.id}
                    onClick={() => handleTabChange(idx)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-t-md transition-colors whitespace-nowrap ${
                      activeSnippetIdx === idx
                        ? 'bg-[#161618] text-white border-t border-neutral-700 font-medium'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {snippet.tag}
                  </button>
                ))}
              </div>

              {/* Code Canvas */}
              <div className="p-4 font-mono text-xs leading-relaxed text-neutral-300 overflow-x-auto min-h-[170px] bg-[#161618]">
                <pre className="selection:bg-neutral-700">{activeSnippet.code}</pre>
              </div>

              {/* Terminal Output Drawer */}
              <div className="border-t border-neutral-800 bg-[#0E0E10] p-3 text-xs font-mono">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Standard Output Console</span>
                  </div>
                  <button
                    onClick={handleRun}
                    disabled={isExecuting}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-sans font-medium text-white bg-blue-600 hover:bg-blue-500 rounded transition-colors disabled:opacity-50"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isExecuting ? 'Running...' : 'Run Snippet'}</span>
                  </button>
                </div>

                <div className="bg-[#141416] rounded p-2 text-neutral-400 text-[11px] min-h-[28px] flex items-center">
                  {isExecuting ? (
                    <span className="text-neutral-500 animate-pulse">Executing script logic...</span>
                  ) : hasExecuted ? (
                    <span className="text-emerald-400 font-semibold">{activeSnippet.output}</span>
                  ) : (
                    <span className="text-neutral-500">Click &quot;Run Snippet&quot; to test script execution</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-2 text-center">
              <span className="text-[11px] text-neutral-500 font-medium">
                Practicing algorithmic thinking &amp; clean Python syntax daily
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
