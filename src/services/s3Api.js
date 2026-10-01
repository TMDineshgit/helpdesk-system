import { apiFetch } from './apiClient';

export async function uploadFile(ticketId, file) {
  // 1. Ask our backend for permission to upload this one file
  const { uploadUrl, fileKey } = await apiFetch('/uploads/presign', {
    method: 'POST',
    body: JSON.stringify({ ticketId, fileName: file.name, fileType: file.type }),
  });

   console.log('Presigned URL received:', {
    fileName: file.name,
    fileKey,
    uploadUrl,
  });


  // 2. Upload the real bytes STRAIGHT to S3 — not through our API at all
  const uploadResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text();

    console.error('S3 upload failed:', {
        status: uploadResponse.status,
        statusText: uploadResponse.statusText,
        response: errorText,
        fileName: file.name,
    });

    throw new Error(
        `S3 upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`
    );
 }

  return {
    name: file.name,
    size: file.size,
    type: file.type,
    key: fileKey, // we save this, so we can fetch it back later
    uploadedAt: new Date().toISOString(),
  };
}

export async function getDownloadUrl(key) {
  const { downloadUrl } = await apiFetch(`/uploads/presign-download?key=${encodeURIComponent(key)}`);
  return downloadUrl;
}