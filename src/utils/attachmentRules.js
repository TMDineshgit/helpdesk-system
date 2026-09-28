export const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'application/pdf',
  'text/plain',
];

export const ALLOWED_TYPES_LABEL = 'PNG, JPG, PDF, TXT';
export const MAX_FILE_SIZE_MB = 2;
export const MAX_FILES = 3;

// 2048 bytes -> "2.0 KB"   |   1500000 bytes -> "1.4 MB"
export const formatFileSize = (bytes) =>
  bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

// Turns real File objects into plain data we can safely keep in Redux.
// This is our "mock upload": we only remember the details, not the file itself.
export const toAttachmentMeta = (fileList) =>
  Array.from(fileList || []).map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
    uploadedAt: new Date().toISOString(),
  }));