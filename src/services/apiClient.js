import { API_BASE_URL } from '../config/apiConfig';

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // Reads the { message: "..." } your Lambda sends back on errors
    throw new Error(data?.message || `Request failed: ${response.status}`);
  }

  return data;
}