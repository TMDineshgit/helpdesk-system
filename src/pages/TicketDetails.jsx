import { Link, useParams } from 'react-router-dom';

import StatusBadge from '../components/ui/StatusBadge';
import CommentForm from '../components/tickets/CommentForm';
import { useTicket } from '../hooks/useTickets';
import {
  useChangeTicketStatus,
  useAssignTicket,
  useAddComment,
} from '../hooks/useTicketMutation';
import { formatFileSize } from '../utils/attachmentRules';
import { TICKET_STATUSES, AGENTS } from '../data/ticketOptions';
import { useAuth } from '../context/AuthContext';
import usePermissions from '../hooks/usePermissions';

function TicketDetails() {

  const { user } = useAuth();
  const { hasPermission } = usePermissions(user?.role);
  const canAssign = hasPermission('ticket:assign');

  const { ticketId } = useParams();
  const { data: ticket, isPending, isError, error } = useTicket(ticketId);

  const { mutate: changeStatus } = useChangeTicketStatus();
  const { mutate: assignAgent } = useAssignTicket();
  const addCommentMutation = useAddComment(ticketId);

    

  if (isPending) {
    return <div className="p-4 text-slate-500">Loading ticket…</div>;
  }

  if (isError) {
    return (
      <div className="space-y-2 p-4">
        <p className="text-red-600">{error.message}</p>
        <Link to="/tickets" className="text-blue-600 hover:underline">
          Back to tickets
        </Link>
      </div>
    );
  }

  const comments = ticket.comments || [];

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Ticket {ticket.id}</h1>

        <div className="flex gap-3 text-sm">
          <Link to="/tickets" className="text-slate-600 hover:underline">
            Back
          </Link>
          <Link to={`/tickets/${ticket.id}/edit`} className="text-blue-600 hover:underline">
            Edit
          </Link>
        </div>
      </div>

      {/* Ticket info */}
      <div className="grid gap-4 rounded-lg bg-white p-6 shadow sm:grid-cols-2">
        <p><strong>Subject:</strong> {ticket.subject}</p>
        <p><strong>Requester:</strong> {ticket.requester}</p>
        <p><strong>Category:</strong> {ticket.category}</p>
        <p><strong>Priority:</strong> {ticket.priority}</p>
        <p><strong>Created:</strong> {ticket.createdAt}</p>

        {/* Status: editable */}
        <div className="flex items-center gap-2">
          <strong>Status:</strong>
          <StatusBadge status={ticket.status} />
          <select
            value={ticket.status}
            onChange={(event) =>
              changeStatus({ id: ticket.id, status: event.target.value })
            }
            className="h-8 rounded-md border border-slate-300 px-2 text-xs"
          >
            {TICKET_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Agent: editable — this is the "assign" action from Day 5 */}
        <div className="flex items-center gap-2">
          <strong>Agent:</strong>
          {canAssign ? (
            <select
              value={ticket.agent}
              onChange={(event) => assignAgent({ id: ticket.id, agent: event.target.value })}
              className="h-8 rounded-md border border-slate-300 px-2 text-xs"
            >
              {AGENTS.map((agent) => (
                <option key={agent} value={agent}>
                  {agent}
                </option>
              ))}
            </select>
          ) : (
            <span>{ticket.agent}</span>
          )}
        </div>

        <p className="sm:col-span-2">
          <strong>Description:</strong> {ticket.description}
        </p>

        {ticket.attachments?.length > 0 && (
          <div className="sm:col-span-2">
            <strong>Attachments:</strong>
            <ul className="mt-1 list-disc pl-6 text-sm text-slate-700">
              {ticket.attachments.map((file) => (
                <li key={file.name}>
                  {file.name} ({formatFileSize(file.size)})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Timeline + comments */}
      <div className="space-y-4 rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-slate-900">Timeline</h2>

        {comments.length === 0 ? (
          <p className="text-sm text-slate-500">No comments yet.</p>
        ) : (
          <ul className="space-y-3">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className={`rounded-md border border-slate-200 p-3 text-sm ${
                  comment.pending ? 'opacity-60' : ''
                }`}
              >
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{comment.author}</span>
                  <span>
                    {new Date(comment.createdAt).toLocaleString()}
                    {comment.pending && ' · sending…'}
                  </span>
                </div>
                <p className="mt-1 text-slate-800">{comment.text}</p>
              </li>
            ))}
          </ul>
        )}

        <CommentForm
          isSubmitting={addCommentMutation.isPending}
          onSubmit={(text) =>
            addCommentMutation.mutate({ text, author: ticket.agent || 'You' })
          }
        />
      </div>
    </div>
  );
}

export default TicketDetails;