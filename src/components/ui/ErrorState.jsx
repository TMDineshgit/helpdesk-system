function ErrorState({
  title = 'Something went wrong',
  description = 'Unable to load the requested data.',
  onRetry,
}) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
      <h2 className="text-lg font-semibold text-red-800">
        {title}
      </h2>

      <p className="mt-2 text-sm text-red-600">
        {description}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;