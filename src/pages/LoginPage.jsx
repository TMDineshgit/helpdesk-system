import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const DEMO_ACCOUNTS = [
  { label: 'Login as Admin', email: 'admin@supporthub.com', password: 'Admin@123' },
  { label: 'Login as Support Agent', email: 'agent@supporthub.com', password: 'Agent@123' },
  { label: 'Login as User', email: 'user@supporthub.com', password: 'User@123' },
];

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Where RequireAuth was trying to send them before it redirected to /login
  const from = location.state?.from?.pathname || '/dashboard';

  const attemptLogin = async (loginEmail, loginPassword) => {
    setError('');
    setIsSubmitting(true);
    try {
      await login(loginEmail, loginPassword);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">SupportHub</h1>
        <p className="mb-6 text-slate-500">Sign in to your support account</p>

        <form onSubmit={(event) => { event.preventDefault(); attemptLogin(email, password); }}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            required
            className="mb-4 w-full rounded-lg border border-slate-300 p-3"
          />

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
            className="mb-4 w-full rounded-lg border border-slate-300 p-3"
          />

          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <div className="mt-6 space-y-2 border-t pt-4">
          <p className="text-xs text-slate-400">Demo accounts, for testing roles:</p>
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.email}
              type="button"
              onClick={() => attemptLogin(account.email, account.password)}
              className="w-full rounded-lg border border-slate-300 p-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              {account.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;