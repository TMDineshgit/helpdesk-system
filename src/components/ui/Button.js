function Button({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  onClick,
}) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50';

  const variants = {
    primary:
      'bg-slate-900 text-white hover:bg-slate-800',

    secondary:
      'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',

    danger:
      'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;