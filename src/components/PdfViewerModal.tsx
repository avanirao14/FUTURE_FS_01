import React, { useEffect } from 'react';
import { X, FileText, Download, ExternalLink, Award } from 'lucide-react';
import { CertificateItem } from '../types';
import { usePortfolio } from '../context/PortfolioContext';

export interface PdfViewerModalProps {
  certificate?: CertificateItem | null;
  onClose?: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  certificate: propCertificate,
  onClose: propOnClose,
}) => {
  const { selectedPdfCert, setSelectedPdfCert } = usePortfolio();

  const certificate = propCertificate !== undefined ? propCertificate : selectedPdfCert;
  const onClose = propOnClose !== undefined ? propOnClose : () => setSelectedPdfCert(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (certificate) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [certificate, onClose]);

  if (!certificate) return null;

  const pdfSource = certificate.pdfUrl || certificate.imageUrl;

  const handleDownload = () => {
    if (!pdfSource) return;
    const a = document.createElement('a');
    a.href = pdfSource;
    a.download = certificate.fileName || `${certificate.title.replace(/\s+/g, '_')}_Certificate.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleOpenNewTab = () => {
    if (!pdfSource) return;
    // In iFrames, window.open may be restricted; creating a link with target="_blank" is safest
    const a = document.createElement('a');
    a.href = pdfSource;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-viewer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0D0F1B] rounded-3xl border border-white/15 shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#090A12] border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-center justify-center text-rose-300 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold text-rose-300 bg-rose-950/80 border border-rose-800/50">
                  PDF Certificate
                </span>
                <span className="text-xs font-mono text-slate-400 truncate hidden sm:inline">
                  {certificate.issuer}
                </span>
              </div>
              <h2
                id="pdf-viewer-title"
                className="text-sm sm:text-base font-bold text-white font-heading truncate max-w-md"
              >
                {certificate.title}
              </h2>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            {pdfSource && (
              <>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-colors cursor-pointer"
                  title="Download Certificate PDF"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Download</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenNewTab}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-violet-200 bg-violet-950/60 hover:bg-violet-900/80 border border-violet-700/50 transition-colors cursor-pointer"
                  title="Open PDF in new window"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-violet-400" />
                  <span className="hidden sm:inline">Open Full</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close PDF Viewer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewer Body */}
        <div className="flex-1 overflow-hidden p-2 sm:p-4 bg-[#080910] flex items-center justify-center">
          {pdfSource ? (
            <object
              data={pdfSource}
              type="application/pdf"
              className="w-full h-[65vh] rounded-2xl border border-white/10 shadow-inner bg-slate-900"
            >
              {/* Fallback if object/iframe PDF plugin is disabled */}
              <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 bg-slate-900/80 rounded-2xl border border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-rose-950/70 border border-rose-500/40 flex items-center justify-center text-rose-300 mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{certificate.title}</h3>
                <p className="text-xs text-slate-400 font-mono mb-6 max-w-md">
                  PDF document preview is ready. You can view or download the full resolution file directly.
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenNewTab}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open in New Tab</span>
                  </button>
                </div>
              </div>
            </object>
          ) : (
            <div className="p-8 text-center text-slate-400 font-mono text-sm">
              No PDF file attached to this certificate entry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
