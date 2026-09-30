const encode = (obj) => btoa(JSON.stringify(obj));
const decode = (str) => JSON.parse(atob(str));

// Builds a token that LOOKS like a JWT. There's no real cryptographic
// signature, since we have no server yet to hold the secret key (Day 12).
export function createToken(payload, expiresInSeconds = 60) {
  const header = { alg: 'none', typ: 'JWT' };

  const fullPayload = {
    ...payload,
    iat: Math.floor(Date.now() / 1000), // issued-at, in seconds
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds, // expiry, in seconds
  };

  return `${encode(header)}.${encode(fullPayload)}.mocksignature`;
}

export function decodeToken(token) {
  try {
    const [, payloadPart] = token.split('.');
    return decode(payloadPart);
  } catch {
    return null; // malformed token
  }
}

export function isTokenExpired(token) {
  const payload = decodeToken(token);
  if (!payload?.exp) return true;
  return Date.now() >= payload.exp * 1000; // exp is in seconds, Date.now() is ms
}