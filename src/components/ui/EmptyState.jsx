
function EmptyState({ message = 'No records found' }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
      {message}
    </div>
  );
}

export default EmptyState;