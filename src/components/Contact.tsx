import React, { useState } from 'react';
import { Linkedin, Github, ExternalLink, Send, Copy, Check, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useProfilePhoto } from '../context/PhotoContext';

export const Contact: React.FC = () => {
  const { photoUrl } = useProfilePhoto();
  const [visitorName, setVisitorName] = useState('');
  const [visitorRole, setVisitorRole] = useState('Student / Peer');
  const [visitorMessage, setVisitorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyNote = () => {
    const fullNote = `Hi Sai Teja,\n\nI'm ${visitorName || 'a fellow tech enthusiast'} (${visitorRole}). ${visitorMessage || "I came across your portfolio and wanted to connect regarding your journey in Python, Web Development, and AI."}\n\nBest regards,\n${visitorName || 'Visitor'}`;
    navigator.clipboard.writeText(fullNote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenLinkedIn = () => {
    window.open(PERSONAL_INFO.links.linkedin, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 bg-white border-y border-neutral-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Links & Intro */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-200 ring-1 ring-neutral-300 shadow-xs shrink-0">
                <img
                  src={photoUrl}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/profile.jpg';
                  }}
                />
              </div>
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Get in Touch · Sai Teja Chary
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              Let&apos;s Connect
            </h2>

            <p className="text-base text-neutral-600 leading-relaxed">
              I’m always interested in connecting with fellow students, developers, innovators, and people interested in AI and technology.
            </p>

            <div className="pt-2 space-y-3">
              {/* LinkedIn Button Card */}
              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-neutral-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900">LinkedIn Profile</div>
                    <div className="text-xs text-neutral-500">Professional updates &amp; collegiate network</div>
                  </div>
                </div>
                <a
                  href={PERSONAL_INFO.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shadow-xs"
                >
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* GitHub Button Card */}
              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-neutral-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-800 border border-neutral-200">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900">GitHub Profile</div>
                    <div className="text-xs text-neutral-500">Code repositories &amp; project experiments</div>
                  </div>
                </div>
                <a
                  href={PERSONAL_INFO.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors whitespace-nowrap shadow-xs"
                >
                  <span>View GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-500 leading-relaxed">
              <strong>Open to:</strong> Hackathon team collaborations, peer programming, student tech discussions, and guidance from senior engineers.
            </div>
          </div>

          {/* Right Column: Draft a Message / Fast Connect */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-7 rounded-xl bg-[#FAF9F6] border border-neutral-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-200 text-xs font-semibold text-neutral-800">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>Quick Message Drafter</span>
              </div>
              <p className="text-xs text-neutral-600">
                Reach out on LinkedIn directly or prepare a message to copy:
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="e.g. Alex Sharma"
                    className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Your Background
                  </label>
                  <select
                    value={visitorRole}
                    onChange={(e) => setVisitorRole(e.target.value)}
                    aria-label="Your background"
                    className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Student / Peer">Student / Engineering Peer</option>
                    <option value="Hackathon Organizer">Hackathon / Ideathon Organizer</option>
                    <option value="Senior Developer / Mentor">Senior Developer / Mentor</option>
                    <option value="Professor / Educator">Professor / Educator</option>
                    <option value="Recruiter">Recruiter / Talent Scout</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Message Note
                  </label>
                  <textarea
                    rows={3}
                    value={visitorMessage}
                    onChange={(e) => setVisitorMessage(e.target.value)}
                    placeholder="Hi Sai Teja, I came across your portfolio and would like to connect regarding..."
                    className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyNote}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-neutral-800 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors shadow-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Copy Formatted Message</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleOpenLinkedIn}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
                >
                  <span>Open LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
