let currentToken = null;
let onUnauthorized = null;

export const setToken = (token) => { currentToken = token; };
export const getToken = () => currentToken;

// AuthContext registers what "handle a 401" means; apiClient just calls it
export const setUnauthorizedHandler = (handler) => { onUnauthorized = handler; };
export const triggerUnauthorized = () => onUnauthorized?.();