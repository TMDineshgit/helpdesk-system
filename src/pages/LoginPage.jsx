
function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">
          SupportHub
        </h1>

        <p className="mb-6 text-slate-500">
          Sign in to your support account
        </p>

        <input
          type="email"
          placeholder="Email address"
          className="mb-4 w-full rounded-lg border border-slate-300 p-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded-lg border border-slate-300 p-3"
        />

        <button
          type="button"
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;