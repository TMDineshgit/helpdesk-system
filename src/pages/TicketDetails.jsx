//import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import StatusBadge from '../components/ui/StatusBadge';
//import { selectTicketById } from '../store/TicketSlices/ticketSelectors';
import { useTicket } from '../hooks/useTickets';
import { formatFileSize } from '../utils/attachmentRules';


function TicketDetails() {
  const { ticketId } = useParams();
  //const ticket = useSelector((state) => selectTicketById(state, ticketId));
  const { data: ticket, isPending, isError, error } = useTicket(ticketId);

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

  if (!ticket) {
    return (
      <div className="p-4">
        <p>Ticket not found.</p>
        <Link to="/tickets" className="text-blue-600 hover:underline">
          Back to tickets
        </Link>
      </div>
    );
  }

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

      <div className="space-y-3 rounded-lg bg-white p-6 shadow">
        <p><strong>Subject:</strong> {ticket.subject}</p>
        <p><strong>Description:</strong> {ticket.description}</p>
        <p><strong>Category:</strong> {ticket.category}</p>
        <p><strong>Priority:</strong> {ticket.priority}</p>
        <p className="flex items-center gap-2">
          <strong>Status:</strong> <StatusBadge status={ticket.status} />
        </p>
        <p><strong>Agent:</strong> {ticket.agent}</p>
        <p><strong>Created:</strong> {ticket.createdAt}</p>

        {ticket.attachments?.length > 0 && (
          <div>
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
    </div>
  );
}

export default TicketDetails;