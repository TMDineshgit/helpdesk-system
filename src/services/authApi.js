import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

import { userPool } from '../config/cognito';
import { decodeToken } from '../utils/jwt';

// A user's role comes from whichever Cognito Group they were added to
// in the console (Part A, step 4) — Cognito adds it to the ID token for us.
function extractRole(idTokenPayload) {
  const groups = idTokenPayload['cognito:groups'] || [];
  return groups[0] || 'USER';
}

export function loginApi({ email, password }) {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (session) => {
        const idToken = session.getIdToken().getJwtToken();
        const accessToken = session.getAccessToken().getJwtToken();
        const refreshToken = session.getRefreshToken().getToken();

        const idPayload = decodeToken(idToken);

        const user = {
          id: idPayload.sub,
          name: idPayload.email,
          email: idPayload.email,
          role: extractRole(idPayload),
        };

        resolve({ user, idToken, accessToken, refreshToken });
      },

      onFailure: (err) => {
        // Cognito's own message, e.g. "Incorrect username or password."
        reject(new Error(err.message || 'Login failed'));
      },

      // Only fires for a TEMPORARY password. We set permanent passwords
      // in the console, so this should never trigger — but if it does,
      // it tells you exactly what to fix.
      newPasswordRequired: () => {
        reject(new Error('This account needs a permanent password set in the Cognito console.'));
      },
    });
  });
}

export function logoutApi() {
  const currentUser = userPool.getCurrentUser();
  if (currentUser) {
    currentUser.signOut();
  }
}

// Silently check for (and refresh, if needed) an existing session, using
// whatever the SDK already has saved. This is what makes "stay logged in
// after a refresh" work, without us touching localStorage ourselves.
export function refreshSessionApi() {
  return new Promise((resolve, reject) => {
    const currentUser = userPool.getCurrentUser();
    if (!currentUser) {
      reject(new Error('No active session'));
      return;
    }

    currentUser.getSession((err, session) => {
      if (err || !session.isValid()) {
        reject(err || new Error('Session invalid'));
        return;
      }

      resolve({
        idToken: session.getIdToken().getJwtToken(),
        accessToken: session.getAccessToken().getJwtToken(),
        refreshToken: session.getRefreshToken().getToken(),
      });
    });
  });
}