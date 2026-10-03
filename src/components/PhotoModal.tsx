import React, { useState, useRef } from 'react';
import { useProfilePhoto } from '../context/PhotoContext';
import { 
  X, 
  Upload, 
  Link as LinkIcon, 
  RotateCcw, 
  Check, 
  Camera, 
  Download, 
  Github, 
  Terminal, 
  Copy, 
  HelpCircle,
  ExternalLink 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const PhotoModal: React.FC = () => {
  const { photoUrl, setPhotoUrl, resetPhoto, isCustomPhoto, isPhotoModalOpen, closePhotoModal } = useProfilePhoto();
  const [activeTab, setActiveTab] = useState<'upload' | 'permanent'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isPhotoModalOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setStatusMessage('Please select an image file (PNG, JPG, or WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPhotoUrl(result);
        setStatusMessage('Photo updated in preview! To make it permanent on Vercel, check the "Make Permanent" tab.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUseGithubAvatar = () => {
    const githubAvatarUrl = `${PERSONAL_INFO.links.github}.png`;
    setPhotoUrl(githubAvatarUrl);
    setStatusMessage('Connected to your GitHub profile photo!');
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    if (urlInput.includes('chatgpt.com/backend-api/estuary')) {
      setStatusMessage('ChatGPT estuary links are temporary and private to your OpenAI session. Please upload the downloaded photo file directly instead.');
      return;
    }

    setPhotoUrl(urlInput.trim());
    setStatusMessage('Custom photo URL applied!');
    setUrlInput('');
  };

  const handleDownloadProfileJpg = () => {
    const link = document.createElement('a');
    link.href = photoUrl;
    link.download = 'profile.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setStatusMessage('Downloaded "profile.jpg"! Place this in your project\'s public/ folder.');
  };

  const copyGitCommand = () => {
    const cmd = `git add public/profile.jpg && git commit -m "feat: add permanent profile photo" && git push origin main`;
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div
        className="relative w-full max-w-lg bg-white rounded-xl border border-neutral-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-[#FAF9F6]">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-blue-600" />
            <h2 id="photo-modal-title" className="text-base font-semibold text-neutral-900">
              Manage Profile Photo
            </h2>
          </div>
          <button
            onClick={closePhotoModal}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-neutral-200 bg-neutral-50 px-6 pt-2 gap-2 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'upload'
                ? 'border-neutral-900 text-neutral-900 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Change Photo (Instant Preview)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('permanent')}
            className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'permanent'
                ? 'border-blue-600 text-blue-700 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <span>Make Permanent (Vercel)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Current Live Preview */}
          <div className="flex items-center justify-between p-3.5 bg-[#FAF9F6] rounded-xl border border-neutral-200">
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-neutral-300 shrink-0">
                <img
                  src={photoUrl}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/profile.jpg';
                  }}
                />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-neutral-900">{PERSONAL_INFO.name}</div>
                <div className="text-neutral-500 mt-0.5">
                  {isCustomPhoto ? 'Custom photo active in browser' : 'Default studio portrait (/profile.jpg)'}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 items-end">
              <button
                type="button"
                onClick={handleDownloadProfileJpg}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-300 rounded shadow-2xs transition-colors"
                title="Download this image as profile.jpg"
              >
                <Download className="w-3 h-3 text-neutral-500" />
                <span>Save profile.jpg</span>
              </button>

              {isCustomPhoto && (
                <button
                  type="button"
                  onClick={() => {
                    resetPhoto();
                    setStatusMessage('Restored default studio portrait.');
                  }}
                  className="text-[11px] text-neutral-500 hover:text-neutral-800 flex items-center gap-1 mt-0.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to default</span>
                </button>
              )}
            </div>
          </div>

          {activeTab === 'upload' ? (
            <div className="space-y-5">
              {/* Option 1: File Upload */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 uppercase tracking-wider mb-2">
                  1. Choose from Computer / Phone
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex flex-col items-center justify-center p-5 border-2 border-dashed border-neutral-300 hover:border-neutral-400 bg-neutral-50 hover:bg-neutral-100/70 rounded-xl transition-colors cursor-pointer group"
                >
                  <Upload className="w-5 h-5 text-neutral-500 group-hover:text-neutral-700 mb-1.5 transition-colors" />
                  <span className="text-xs font-semibold text-neutral-800">
                    Select Photo File
                  </span>
                  <span className="text-[11px] text-neutral-500 mt-0.5">
                    JPG, PNG, or WEBP from your device
                  </span>
                </button>
              </div>

              {/* Option 2: 1-Click GitHub Avatar Sync */}
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-neutral-800 shrink-0" />
                  <div className="text-xs">
                    <span className="font-semibold text-neutral-900">Sync GitHub Avatar</span>
                    <p className="text-[11px] text-neutral-500">
                      Use photo from github.com/charysaiteja110-dev
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleUseGithubAvatar}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors whitespace-nowrap"
                >
                  Sync Now
                </button>
              </div>

              {/* Option 3: Direct URL */}
              <form onSubmit={handleUrlSubmit} className="space-y-2">
                <label className="block text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                  2. Or Paste Public Image Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/your-photo.jpg"
                    className="flex-1 px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Apply URL
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Permanent Tab */
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-xl text-neutral-800 space-y-2">
                <div className="font-semibold text-blue-900 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-blue-700" />
                  <span>How to make your photo permanent for every Vercel visitor</span>
                </div>
                <p className="text-neutral-600 leading-relaxed text-[11px]">
                  Vercel serves all static assets directly from your project&apos;s <code className="font-mono bg-blue-100/70 px-1 py-0.5 rounded text-blue-900">public/</code> folder. Follow these simple steps so anyone who visits your link sees your exact photo:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-neutral-200 bg-neutral-50 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-neutral-900 text-white font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-neutral-900">Name your photo &quot;profile.jpg&quot;</div>
                    <p className="text-neutral-500 text-[11px] mt-0.5">
                      Save your desired photo file as <code className="font-mono text-neutral-700">profile.jpg</code> on your computer, or click the button below:
                    </p>
                    <button
                      type="button"
                      onClick={handleDownloadProfileJpg}
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download current photo as profile.jpg</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-neutral-200 bg-neutral-50 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-neutral-900 text-white font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-neutral-900">Place in your repository&apos;s public/ directory</div>
                    <p className="text-neutral-500 text-[11px] mt-0.5">
                      Move <code className="font-mono text-neutral-700">profile.jpg</code> into <code className="font-mono text-neutral-700">public/profile.jpg</code> in your cloned folder.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-neutral-200 bg-neutral-50 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-neutral-900 text-white font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-neutral-900">Push to GitHub to trigger Vercel deploy</div>
                    <div className="mt-1.5 relative flex items-center justify-between p-2 rounded bg-neutral-900 text-neutral-100 font-mono text-[11px]">
                      <span className="truncate mr-2">git add public/profile.jpg &amp;&amp; git commit -m &quot;feat: update photo&quot; &amp;&amp; git push</span>
                      <button
                        type="button"
                        onClick={copyGitCommand}
                        className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white shrink-0"
                        title="Copy command"
                      >
                        {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Feedback message */}
          {statusMessage && (
            <div className="p-3 bg-neutral-100 border border-neutral-200 text-xs text-neutral-800 rounded-lg flex items-center gap-2 animate-in fade-in">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 bg-[#FAF9F6] flex justify-between items-center text-xs">
          <span className="text-neutral-500">Sai Teja Chary Portfolio</span>
          <button
            type="button"
            onClick={closePhotoModal}
            className="px-4 py-1.5 font-medium text-neutral-700 hover:text-neutral-900 rounded-md hover:bg-neutral-200/60 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
