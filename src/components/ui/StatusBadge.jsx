
const statusStyles = {
  OPEN: 'bg-blue-100 text-blue-700',
  PENDING: 'bg-yellow-100 text-yellow-700',
  RESOLVED: 'bg-green-100 text-green-700',
  CLOSED: 'bg-slate-200 text-slate-700',
};

function StatusBadge({ status }) {
  const style =
    statusStyles[status] || 'bg-slate-100 text-slate-700';

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;