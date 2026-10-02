import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Video as VideoIcon,
  FileText,
  Trash2,
  Eye,
  CheckCircle2,
  RefreshCw,
  Camera,
  Play
} from 'lucide-react';
import {
  formatFileSize,
  validateImageFile,
  validateVideoFile,
  validateCertificateFile,
  fileToBase64
} from '../utils/fileHelpers';

export interface MediaUploadCardProps {
  label: string;
  sublabel?: string;
  helpText?: string;
  mediaType?: 'image' | 'video' | 'certificate';
  acceptType?: 'image' | 'video' | 'certificate';
  currentUrl?: string;
  currentMediaUrl?: string;
  fileName?: string;
  currentFileName?: string;
  fileSize?: number;
  currentFileSize?: number;
  fileType?: 'image' | 'pdf' | 'video';
  isVideo?: boolean;
  isPdf?: boolean;
  pdfUrl?: string;
  onUpload: (
    file: File,
    base64: string,
    metadata: { fileType: 'image' | 'video' | 'pdf'; fileName: string; fileSize: number }
  ) => Promise<void> | void;
  onRemove: () => void;
  onPreview?: () => void;
  maxSizeMb?: number;
  idPrefix?: string;
}

export const MediaUploadCard: React.FC<MediaUploadCardProps> = ({
  label,
  sublabel,
  helpText,
  mediaType = 'image',
  acceptType,
  currentUrl,
  currentMediaUrl,
  fileName,
  currentFileName,
  fileSize,
  currentFileSize,
  fileType = 'image',
  isVideo = false,
  isPdf: propIsPdf,
  pdfUrl,
  onUpload,
  onRemove,
  onPreview,
  maxSizeMb,
  idPrefix = 'upload',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const effectiveType = acceptType || mediaType;
  const activeUrl = currentMediaUrl || currentUrl;
  const activeFileName = currentFileName || fileName;
  const activeFileSize = currentFileSize || fileSize;
  const activeHelp = sublabel || helpText;

  const effectiveMaxMb =
    maxSizeMb || (effectiveType === 'video' ? 50 : effectiveType === 'certificate' ? 20 : 10);

  const getAcceptString = () => {
    if (effectiveType === 'video') return 'video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov';
    if (effectiveType === 'certificate')
      return 'image/jpeg,image/png,image/webp,application/pdf,.jpg,.jpeg,.png,.webp,.pdf';
    return 'image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp';
  };

  const getFormatBadge = () => {
    if (effectiveType === 'video') return `MP4, WEBM, MOV • Max ${effectiveMaxMb}MB`;
    if (effectiveType === 'certificate') return `JPG, PNG, WEBP, PDF • Max ${effectiveMaxMb}MB`;
    return `JPG, PNG, WEBP • Max ${effectiveMaxMb}MB`;
  };

  const processFile = async (file: File) => {
    setErrorMessage(null);

    // Validate
    if (effectiveType === 'video') {
      const check = validateVideoFile(file, effectiveMaxMb);
      if (!check.valid) {
        setErrorMessage(check.error || 'Invalid video format');
        return;
      }
    } else if (effectiveType === 'certificate') {
      const check = validateCertificateFile(file, effectiveMaxMb);
      if (!check.valid) {
        setErrorMessage(check.error || 'Invalid file format');
        return;
      }
    } else {
      const check = validateImageFile(file, effectiveMaxMb);
      if (!check.valid) {
        setErrorMessage(check.error || 'Invalid image format');
        return;
      }
    }

    try {
      setIsUploading(true);
      const base64 = await fileToBase64(file);
      const isPdfFile =
        file.type.includes('pdf') ||
        file.name.toLowerCase().endsWith('.pdf') ||
        base64.startsWith('data:application/pdf');
      const isVideoFile =
        effectiveType === 'video' ||
        file.type.startsWith('video/') ||
        base64.startsWith('data:video/');

      const detectedType: 'image' | 'video' | 'pdf' = isPdfFile
        ? 'pdf'
        : isVideoFile
        ? 'video'
        : 'image';

      await onUpload(file, base64, {
        fileType: detectedType,
        fileName: file.name,
        fileSize: file.size,
      });
    } catch (err: any) {
      setErrorMessage(err?.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const hasMedia = Boolean(activeUrl || pdfUrl);
  const isPdf =
    propIsPdf !== undefined
      ? propIsPdf
      : fileType === 'pdf' ||
        (activeFileName && activeFileName.toLowerCase().endsWith('.pdf')) ||
        (activeUrl && activeUrl.startsWith('data:application/pdf'));

  const isVideoContent = isVideo || effectiveType === 'video';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono font-medium text-slate-300">
          {label}
        </label>
        <span className="text-[11px] font-mono text-slate-400">
          {getFormatBadge()}
        </span>
      </div>

      {hasMedia ? (
        /* Uploaded Media Preview Card */
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-violet-500/30 transition-all flex flex-col sm:flex-row items-center gap-4">
          {/* Visual Thumbnail or Icon preview */}
          <div className="shrink-0 relative group">
            {isPdf ? (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-rose-950/60 to-rose-900/30 border border-rose-500/30 flex flex-col items-center justify-center text-rose-300 shadow-md">
                <FileText className="w-7 h-7 mb-1" />
                <span className="text-[9px] font-mono uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-700/50">
                  PDF
                </span>
              </div>
            ) : isVideoContent ? (
              <div className="w-24 h-16 sm:w-28 sm:h-20 rounded-xl bg-black border border-white/15 overflow-hidden relative flex items-center justify-center shadow-md">
                {activeUrl ? (
                  <video
                    src={activeUrl}
                    className="w-full h-full object-cover opacity-80"
                    preload="metadata"
                  />
                ) : (
                  <VideoIcon className="w-6 h-6 text-cyan-400" />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Play className="w-5 h-5 text-cyan-300 fill-cyan-300/40" />
                </div>
              </div>
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-black/60 border border-white/15 overflow-hidden flex items-center justify-center shadow-md">
                {activeUrl ? (
                  <img
                    src={activeUrl}
                    alt={activeFileName || 'Uploaded media preview'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-500" />
                )}
              </div>
            )}
          </div>

          {/* Details & Actions */}
          <div className="flex-1 min-w-0 text-center sm:text-left space-y-1.5 w-full">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Uploaded & Persisted</span>
              </span>
              {activeFileSize ? (
                <span className="text-[11px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                  {formatFileSize(activeFileSize)}
                </span>
              ) : null}
            </div>

            <p className="text-xs sm:text-sm font-medium text-white truncate max-w-sm" title={activeFileName || 'Uploaded File'}>
              {activeFileName || (isPdf ? 'Document.pdf' : isVideoContent ? 'Demo_Video.mp4' : 'Photo.jpg')}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <button
                type="button"
                id={`${idPrefix}-replace-btn`}
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-violet-200 bg-violet-950/60 hover:bg-violet-900/80 border border-violet-700/50 hover:border-violet-500 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isUploading ? 'animate-spin' : ''}`} />
                <span>Change / Replace</span>
              </button>

              {onPreview && (
                <button
                  type="button"
                  id={`${idPrefix}-preview-btn`}
                  onClick={onPreview}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Preview</span>
                </button>
              )}

              <button
                type="button"
                id={`${idPrefix}-remove-btn`}
                onClick={onRemove}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Drag & Drop Dropzone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative p-5 sm:p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center group ${
            isDragging
              ? 'border-cyan-400 bg-cyan-950/20 scale-[1.01]'
              : 'border-white/15 hover:border-violet-500/60 bg-white/[0.015] hover:bg-white/[0.03]'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-violet-600/15 group-hover:bg-violet-600/25 border border-violet-500/30 flex items-center justify-center text-cyan-300 mb-3 transition-colors shadow-inner">
            {effectiveType === 'video' ? (
              <VideoIcon className="w-6 h-6 text-cyan-400" />
            ) : effectiveType === 'certificate' ? (
              <Upload className="w-6 h-6 text-violet-400" />
            ) : label.toLowerCase().includes('profile') ? (
              <Camera className="w-6 h-6 text-cyan-300" />
            ) : (
              <ImageIcon className="w-6 h-6 text-violet-300" />
            )}
          </div>

          <p className="text-xs sm:text-sm font-semibold text-slate-200 mb-1">
            <span className="text-violet-400 group-hover:underline">Click to browse</span> or drag & drop file
          </p>

          <p className="text-[11px] text-slate-400 font-mono">
            {activeHelp || `Supports ${getFormatBadge()}`}
          </p>
        </div>
      )}

      {/* Error Message if validation fails */}
      {errorMessage && (
        <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-800/50 text-rose-200 text-xs flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={getAcceptString()}
        onChange={handleFileInputChange}
        className="hidden"
        id={`${idPrefix}-file-input`}
      />
    </div>
  );
};
