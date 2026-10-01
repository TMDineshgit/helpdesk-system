import { API_BASE_URL } from '../config/apiConfig';
import { getToken, triggerUnauthorized } from './tokenStore';

export async function apiFetch(path, options = {}) {
  const token = getToken();

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });
  } catch {
    // fetch() itself throws when there's no network at all
    throw new Error('Network error — check your internet connection.');
  }

  if (response.status === 401) {
    triggerUnauthorized();
    throw new Error('Your session has expired. Please log in again.');
  }

  if (response.status === 403) {
    throw new Error("You don't have permission to do that.");
  }

  const data = await response.json().catch(() => null);

  if (response.status >= 500) {
    throw new Error('Something went wrong on our end. Please try again.');
  }

  if (!response.ok) {
    throw new Error(data?.message || `Request failed: ${response.status}`);
  }

  return data;
}