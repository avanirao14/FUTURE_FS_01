import React, { useRef } from 'react';
import { Award, Upload, Eye, Sparkles, Plus, FileText } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { fileToBase64, validateCertificateFile } from '../utils/fileHelpers';
import { CertificateItem } from '../types';

export const Certifications: React.FC = () => {
  const {
    data,
    setSelectedCertificateIndex,
    setSelectedPdfCert,
    updateCertificate,
    setIsEditorOpen,
    showToast,
  } = usePortfolio();

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleCardUpload = async (certId: string, certTitle: string, file: File) => {
    const validation = validateCertificateFile(file);
    if (!validation.valid) {
      showToast(validation.error || 'Invalid file', 'error');
      return;
    }
    try {
      const base64 = await fileToBase64(file);
      updateCertificate(certId, {
        imageUrl: base64,
        pdfUrl: validation.fileType === 'pdf' ? base64 : undefined,
        fileType: validation.fileType,
        fileName: file.name,
        fileSize: file.size,
      });
      showToast(`Uploaded ${validation.fileType === 'pdf' ? 'PDF document' : 'image'} for ${certTitle}`);
    } catch {
      showToast('Failed to upload file', 'error');
    }
  };

  const isPdfCert = (cert: CertificateItem) => {
    return (
      cert.fileType === 'pdf' ||
      cert.fileName?.toLowerCase().endsWith('.pdf') ||
      cert.imageUrl?.startsWith('data:application/pdf') ||
      Boolean(cert.pdfUrl)
    );
  };

  const handleOpenCertificate = (cert: CertificateItem, index: number) => {
    if (isPdfCert(cert)) {
      setSelectedPdfCert(cert);
    } else {
      setSelectedCertificateIndex(index);
    }
  };

  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-800/40 text-violet-300 text-xs font-mono mb-3">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>CREDENTIALS & WORKSHOPS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Verifications</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Recognized participation in global challenges, technical hackathons, and generative AI programs.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full mt-4" />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.certifications.map((cert, index) => {
            const hasPdf = isPdfCert(cert);
            const hasMedia = Boolean(cert.imageUrl || cert.pdfUrl);

            return (
              <div
                key={cert.id}
                className="glass-panel rounded-2xl border border-white/[0.08] hover:border-violet-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-lg hover:-translate-y-1"
              >
                {/* Certificate Visual Stage */}
                <div
                  className="aspect-[4/3] bg-gradient-to-br from-[#0F111E] via-[#121422] to-[#17192C] border-b border-white/[0.07] relative flex flex-col items-center justify-center p-4 cursor-pointer overflow-hidden"
                  onClick={() => handleOpenCertificate(cert, index)}
                >
                  {hasPdf ? (
                    /* Clean PDF Document Presentation */
                    <div className="flex flex-col items-center justify-center text-center p-4 group-hover:scale-105 transition-transform">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-950/70 to-rose-900/40 border border-rose-500/40 flex flex-col items-center justify-center text-rose-300 mb-2 shadow-inner">
                        <FileText className="w-6 h-6" />
                        <span className="text-[9px] font-mono font-bold uppercase mt-0.5">PDF</span>
                      </div>
                      <span className="text-xs font-semibold text-rose-200 line-clamp-1 max-w-[170px]">
                        {cert.fileName || 'Certificate Document'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Click to view PDF
                      </span>
                    </div>
                  ) : cert.imageUrl ? (
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    /* Elegant placeholder */
                    <div className="flex flex-col items-center justify-center text-center p-4 group-hover:scale-105 transition-transform">
                      <div className="w-12 h-12 rounded-xl bg-violet-950/70 border border-violet-600/40 flex items-center justify-center mb-2.5 text-cyan-300 group-hover:border-cyan-400/50 shadow-inner">
                        <Award className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold text-slate-200">
                        Upload Certificate
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono mt-0.5">
                        JPG, PNG, or PDF
                      </span>
                    </div>
                  )}

                  {/* Top Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-medium text-violet-300 bg-black/60 border border-white/10 backdrop-blur-md">
                      {cert.badge || 'Verified'}
                    </span>
                    {hasPdf && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold text-rose-300 bg-rose-950/80 border border-rose-700/50">
                        PDF
                      </span>
                    )}
                  </div>

                  {/* Hover Overlay with Preview & Upload Trigger */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCertificate(cert, index);
                      }}
                      className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
                      title={hasPdf ? 'View PDF Document' : 'View Full Image'}
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRefs.current[cert.id]?.click();
                      }}
                      className="p-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white transition-colors"
                      title="Upload or Replace Certificate"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Hidden input for direct card upload */}
                <input
                  ref={(el) => {
                    fileInputRefs.current[cert.id] = el;
                  }}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf,.jpg,.jpeg,.png,.webp,.pdf"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleCardUpload(cert.id, cert.title, f);
                  }}
                  className="hidden"
                />

                {/* Information Footer */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white font-heading mb-1 line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <button
                      type="button"
                      id={`cert-view-btn-${cert.id}`}
                      onClick={() => handleOpenCertificate(cert, index)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer"
                    >
                      {hasPdf ? <FileText className="w-3.5 h-3.5 text-rose-400" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{hasPdf ? 'View PDF' : 'View Image'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[cert.id]?.click()}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-violet-300 transition-colors cursor-pointer"
                    >
                      <Upload className="w-3 h-3" />
                      <span>{hasMedia ? 'Replace' : 'Upload'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Certificate CTA */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            id="certifications-manage-btn"
            onClick={() => setIsEditorOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-slate-200 bg-white/[0.03] hover:bg-white/[0.07] border border-dashed border-white/15 hover:border-violet-500/40 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Manage All Certificates & Uploads</span>
          </button>
        </div>
      </div>
    </section>
  );
};
