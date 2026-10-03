import React, { useState, useRef } from 'react';
import { useProfilePhoto } from '../context/PhotoContext';
import { X, Upload, Link as LinkIcon, RotateCcw, Check, Camera, Image as ImageIcon } from 'lucide-react';

export const PhotoModal: React.FC = () => {
  const { photoUrl, setPhotoUrl, resetPhoto, isCustomPhoto, isPhotoModalOpen, closePhotoModal } = useProfilePhoto();
  const [urlInput, setUrlInput] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isPhotoModalOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setStatusMessage('Please select a valid image file (JPEG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPhotoUrl(result);
        setStatusMessage('Photo updated successfully!');
        setTimeout(() => {
          setStatusMessage(null);
          closePhotoModal();
        }, 1200);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    if (urlInput.includes('chatgpt.com/backend-api/estuary')) {
      setStatusMessage('ChatGPT estuary links are session-restricted by OpenAI. Please upload the downloaded photo file directly below instead.');
      return;
    }

    setPhotoUrl(urlInput.trim());
    setStatusMessage('Photo URL updated successfully!');
    setUrlInput('');
    setTimeout(() => {
      setStatusMessage(null);
      closePhotoModal();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div
        className="relative w-full max-w-md bg-white rounded-xl border border-neutral-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-[#FAF9F6]">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-blue-600" />
            <h2 id="photo-modal-title" className="text-base font-semibold text-neutral-900">
              Update Profile Photo
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Current Preview */}
          <div className="flex items-center gap-4 p-3 bg-[#FAF9F6] rounded-xl border border-neutral-200">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-neutral-200 shrink-0">
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
              <div className="font-semibold text-neutral-900">Current Display Photo</div>
              <div className="text-neutral-500 mt-0.5">
                {isCustomPhoto ? 'Custom uploaded photo active' : 'Studio editorial portrait'}
              </div>
              {isCustomPhoto && (
                <button
                  type="button"
                  onClick={() => {
                    resetPhoto();
                    setStatusMessage('Reset to default portrait.');
                    setTimeout(() => setStatusMessage(null), 1500);
                  }}
                  className="mt-1.5 text-blue-600 hover:underline flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restore default photo</span>
                </button>
              )}
            </div>
          </div>

          {/* Option 1: File Upload */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 uppercase tracking-wider mb-2">
              Upload from Computer / Device
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
              className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-neutral-300 hover:border-neutral-400 bg-neutral-50 hover:bg-neutral-100/70 rounded-xl transition-colors cursor-pointer group"
            >
              <Upload className="w-6 h-6 text-neutral-500 group-hover:text-neutral-700 mb-2 transition-colors" />
              <span className="text-xs font-semibold text-neutral-800">
                Choose Image File
              </span>
              <span className="text-[11px] text-neutral-500 mt-0.5">
                PNG, JPG, WEBP up to 10MB
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-neutral-200"></div>
            <span className="absolute px-3 bg-white text-[11px] font-mono uppercase text-neutral-400">
              or paste url
            </span>
          </div>

          {/* Option 2: Image URL */}
          <form onSubmit={handleUrlSubmit} className="space-y-2">
            <label className="block text-xs font-semibold text-neutral-800 uppercase tracking-wider">
              Direct Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/my-photo.jpg"
                className="flex-1 px-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors whitespace-nowrap"
              >
                Apply
              </button>
            </div>
            <p className="text-[11px] text-neutral-500">
              Permanent repo tip: You can also place your image at <code className="font-mono text-neutral-700">public/profile.jpg</code> in your repository.
            </p>
          </form>

          {/* Status Message */}
          {statusMessage && (
            <div className="p-3 bg-neutral-100 border border-neutral-200 text-xs text-neutral-800 rounded-lg flex items-center gap-2 animate-in fade-in">
              <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 bg-[#FAF9F6] flex justify-end">
          <button
            type="button"
            onClick={closePhotoModal}
            className="px-4 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 rounded-md hover:bg-neutral-200/60 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
