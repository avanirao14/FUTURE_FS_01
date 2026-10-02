/**
 * Converts a file to base64 string for persistent browser storage
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Formats bytes to human-readable size string (e.g., 2.4 MB)
 */
export const formatFileSize = (bytes?: number): string => {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * Validates image size and format (JPG, JPEG, PNG, WEBP)
 */
export const validateImageFile = (
  file: File,
  maxMb = 10
): { valid: boolean; error?: string } => {
  const name = file.name.toLowerCase();
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];

  const hasValidExt = validExtensions.some((ext) => name.endsWith(ext));
  const hasValidType = validTypes.includes(file.type);

  if (!hasValidType && !hasValidExt) {
    return {
      valid: false,
      error: 'Unsupported file format. Please upload JPG, JPEG, PNG, or WEBP.',
    };
  }

  const maxBytes = maxMb * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `File is too large. Maximum size allowed is ${maxMb}MB.`,
    };
  }

  return { valid: true };
};

/**
 * Validates video size and format (MP4, WEBM, MOV)
 */
export const validateVideoFile = (
  file: File,
  maxMb = 50
): { valid: boolean; error?: string } => {
  const name = file.name.toLowerCase();
  const validExtensions = ['.mp4', '.webm', '.mov'];
  const validTypes = [
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'video/x-matroska',
  ];

  const hasValidExt = validExtensions.some((ext) => name.endsWith(ext));
  const hasValidType = validTypes.includes(file.type);

  if (!hasValidType && !hasValidExt) {
    return {
      valid: false,
      error: 'Unsupported video format. Please upload MP4, WEBM, or MOV.',
    };
  }

  const maxBytes = maxMb * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `Video is too large. Maximum size allowed is ${maxMb}MB.`,
    };
  }

  return { valid: true };
};

/**
 * Validates certificate file (Images or PDF)
 */
export const validateCertificateFile = (
  file: File,
  maxMb = 20
): { valid: boolean; fileType: 'image' | 'pdf'; error?: string } => {
  const name = file.name.toLowerCase();
  const isPdf = file.type === 'application/pdf' || name.endsWith('.pdf');

  if (isPdf) {
    const maxBytes = maxMb * 1024 * 1024;
    if (file.size > maxBytes) {
      return {
        valid: false,
        fileType: 'pdf',
        error: `PDF document is too large. Maximum size allowed is ${maxMb}MB.`,
      };
    }
    return { valid: true, fileType: 'pdf' };
  }

  // Check image
  const imgCheck = validateImageFile(file, maxMb);
  if (!imgCheck.valid) {
    return {
      valid: false,
      fileType: 'image',
      error: 'Unsupported format. Please upload JPG, PNG, WEBP, or PDF.',
    };
  }

  return { valid: true, fileType: 'image' };
};

