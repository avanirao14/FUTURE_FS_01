import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Upload,
  Award,
  FileText,
  Download,
  ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { fileToBase64, validateCertificateFile } from '../utils/fileHelpers';

export const CertificateLightbox: React.FC = () => {
  const {
    data,
    selectedCertificateIndex,
    setSelectedCertificateIndex,
    setSelectedPdfCert,
    updateCertificate,
    showToast,
  } = usePortfolio();

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const certificates = data.certifications;
  const currentIndex = selectedCertificateIndex;
  const currentCert = currentIndex !== null ? certificates[currentIndex] : null;

  // Keyboard navigation & ESC handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;

      if (e.key === 'Escape') {
        setSelectedCertificateIndex(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, certificates.length]);

  // Reset zoom when navigating between certificates
  useEffect(() => {
    setZoomLevel(1);
  }, [currentIndex]);

  if (currentIndex === null || !currentCert) return null;

  const handlePrev = () => {
    setSelectedCertificateIndex(
      (currentIndex - 1 + certificates.length) % certificates.length
    );
  };

  const handleNext = () => {
    setSelectedCertificateIndex((currentIndex + 1) % certificates.length);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const isPdf =
    currentCert.fileType === 'pdf' ||
    currentCert.fileName?.toLowerCase().endsWith('.pdf') ||
    currentCert.imageUrl?.startsWith('data:application/pdf') ||
    Boolean(currentCert.pdfUrl);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateCertificateFile(file);
    if (!validation.valid) {
      showToast(validation.error || 'Invalid file format', 'error');
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      updateCertificate(currentCert.id, {
        imageUrl: base64,
        pdfUrl: validation.fileType === 'pdf' ? base64 : undefined,
        fileType: validation.fileType,
        fileName: file.name,
        fileSize: file.size,
      });
      showToast(`Certificate uploaded for "${currentCert.title}"`);
    } catch {
      showToast('Failed to upload certificate file', 'error');
    }
  };

  const handleDownload = () => {
    const url = currentCert.pdfUrl || currentCert.imageUrl;
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = currentCert.fileName || `${currentCert.title.replace(/\s+/g, '_')}_Certificate`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-cert-title"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/90 backdrop-blur-xl p-4 sm:p-6 overflow-hidden animate-fadeIn"
      onClick={() => setSelectedCertificateIndex(null)}
    >
      {/* Top Bar with Title and Controls */}
      <div
        className="w-full max-w-5xl mx-auto flex items-center justify-between gap-4 z-20 pb-4 border-b border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-600/30 border border-violet-400/40 flex items-center justify-center text-cyan-300">
            {isPdf ? <FileText className="w-5 h-5 text-rose-400" /> : <Award className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="lightbox-cert-title"
                className="text-base sm:text-lg font-bold text-white font-heading truncate max-w-sm sm:max-w-md"
              >
                {currentCert.title}
              </h2>
              {isPdf && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-rose-300 bg-rose-950/80 border border-rose-700/50">
                  PDF
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-mono">
              {currentCert.issuer} • {currentCert.date || 'Verified'}
            </p>
          </div>
        </div>

        {/* Toolbar: Zoom Controls, Upload & Close */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {!isPdf && (
            <>
              {/* Zoom In */}
              <button
                type="button"
                id="cert-zoom-in-btn"
                onClick={handleZoomIn}
                className="p-2 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] text-slate-200 border border-white/10 transition-colors"
                title="Zoom In (+)"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Zoom Out */}
              <button
                type="button"
                id="cert-zoom-out-btn"
                onClick={handleZoomOut}
                className="p-2 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] text-slate-200 border border-white/10 transition-colors"
                title="Zoom Out (-)"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              {/* Reset Zoom */}
              <button
                type="button"
                id="cert-zoom-reset-btn"
                onClick={handleResetZoom}
                className="p-2 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] text-slate-200 border border-white/10 transition-colors"
                title="Reset Zoom"
                aria-label="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Download if media present */}
          {(currentCert.imageUrl || currentCert.pdfUrl) && (
            <button
              type="button"
              onClick={handleDownload}
              className="p-2 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] text-slate-200 border border-white/10 transition-colors cursor-pointer"
              title="Download File"
            >
              <Download className="w-4 h-4 text-cyan-400" />
            </button>
          )}

          {/* Upload / Replace Action */}
          <button
            type="button"
            id="cert-upload-btn"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30 transition-all cursor-pointer"
            title="Upload or Replace Certificate"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {currentCert.imageUrl ? 'Replace' : 'Upload'}
            </span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf,.jpg,.jpeg,.png,.webp,.pdf"
            onChange={handleUploadImage}
            className="hidden"
            aria-label="Upload certificate file"
          />

          {/* Close Modal */}
          <button
            type="button"
            id="cert-close-btn"
            onClick={() => setSelectedCertificateIndex(null)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Stage with Prev/Next and Content */}
      <div
        className="relative w-full max-w-5xl mx-auto flex-1 flex items-center justify-center my-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Arrow Previous */}
        <button
          type="button"
          id="cert-prev-btn"
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-30 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/15 backdrop-blur-md shadow-xl transition-transform hover:scale-105 cursor-pointer"
          aria-label="Previous Certificate"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Certificate Display Area */}
        <div className="w-full h-full flex items-center justify-center p-2 sm:p-6 overflow-auto">
          {isPdf ? (
            /* Embedded PDF Display */
            <div className="w-full max-w-4xl h-[70vh] bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
              <div className="p-3 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-rose-400" />
                  <span className="truncate max-w-xs">{currentCert.fileName || 'Certificate Document.pdf'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCertificateIndex(null);
                    setSelectedPdfCert(currentCert);
                  }}
                  className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 underline cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full PDF Viewer</span>
                </button>
              </div>
              <object
                data={currentCert.pdfUrl || currentCert.imageUrl}
                type="application/pdf"
                className="w-full flex-1"
              >
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-slate-300">
                  <FileText className="w-12 h-12 text-rose-400 mb-3" />
                  <p className="text-sm font-semibold mb-2">PDF Document Ready</p>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold"
                  >
                    Download PDF Document
                  </button>
                </div>
              </object>
            </div>
          ) : currentCert.imageUrl ? (
            <img
              src={currentCert.imageUrl}
              alt={currentCert.title}
              referrerPolicy="no-referrer"
              style={{
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                maxHeight: '75vh',
                maxWidth: '90vw',
              }}
              className="object-contain rounded-xl shadow-2xl border border-white/15 bg-white/5 select-none"
            />
          ) : (
            /* Elegant Placeholder when user has not yet uploaded the file */
            <div
              style={{
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="w-full max-w-2xl aspect-[1.414/1] bg-gradient-to-br from-[#121422] via-[#0E101A] to-[#161828] border-2 border-dashed border-violet-500/40 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center text-center shadow-2xl relative"
            >
              <div className="w-20 h-20 rounded-2xl bg-violet-950/60 border border-violet-600/40 flex items-center justify-center mb-6 text-cyan-300 shadow-inner">
                <Award className="w-10 h-10" />
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-300 bg-cyan-950/80 border border-cyan-700/50 mb-3">
                {currentCert.badge || 'Certificate Placeholder'}
              </span>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-2">
                {currentCert.title}
              </h3>

              <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
                {currentCert.description || 'Verified participation and performance credential.'}
              </p>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-600/30 transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4 text-cyan-300" />
                <span>Upload Certificate (PNG, JPG, or PDF)</span>
              </button>

              <span className="text-[11px] text-slate-400 font-mono mt-3">
                Uploads are stored locally and persisted across reloads
              </span>
            </div>
          )}
        </div>

        {/* Navigation Arrow Next */}
        <button
          type="button"
          id="cert-next-btn"
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-30 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/15 backdrop-blur-md shadow-xl transition-transform hover:scale-105 cursor-pointer"
          aria-label="Next Certificate"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Status & Thumbnails Indicator */}
      <div
        className="w-full max-w-md mx-auto flex items-center justify-between text-xs text-slate-400 font-mono pt-3 border-t border-white/10 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <span>
          Certificate {currentIndex + 1} of {certificates.length}
        </span>
        <div className="flex gap-1.5">
          {certificates.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedCertificateIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentIndex
                  ? 'bg-cyan-400 scale-125'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Jump to certificate ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
