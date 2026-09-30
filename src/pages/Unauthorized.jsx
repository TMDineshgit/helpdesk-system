import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-10 text-center">
      <h1 className="text-2xl font-bold text-slate-900">403 — Not allowed</h1>
      <p className="text-slate-500">
        Your account doesn't have permission to view this page.
      </p>
      <Link to="/dashboard" className="text-blue-600 hover:underline">
        Back to dashboard
      </Link>
    </div>
  );
}

export default Unauthorized;