import { useState } from 'react';

function CommentForm({ onSubmit, isSubmitting }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) {
      setError('Comment cannot be empty');
      return;
    }

    onSubmit(trimmed);
    setText('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={3}
        placeholder="Add a comment…"
        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
      />

      {error && <p className="text-xs text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
      >
        {isSubmitting ? 'Sending…' : 'Add Comment'}
      </button>
    </form>
  );
}

export default CommentForm;