import { useNavigate, useParams } from 'react-router-dom';

import TicketsForm from '../components/tickets/TicektsForm';
import { toAttachmentMeta } from '../utils/attachmentRules';
import { useTicket } from '../hooks/useTickets';
import { useUpdateTicket } from '../hooks/useTicketMutation';

function UpdateTicket() {
  const navigate = useNavigate();
  const { ticketId } = useParams();

  const { data: ticket, isPending, isError, error } = useTicket(ticketId);
  const updateMutation = useUpdateTicket();

  // The form must only appear AFTER the ticket has loaded, because the
  // form reads its starting values once, when it first appears.
  if (isPending) {
    return <div className="p-6 text-slate-500">Loading ticket…</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-600">{error.message}</div>;
  }

  const onSubmit = async (data) => {
    const { attachments, ...ticketData } = data;

    try {
      await updateMutation.mutateAsync({
        ...ticket,
        ...ticketData,
        attachments: [...(ticket.attachments || []), ...toAttachmentMeta(attachments)],
      });
      navigate('/tickets');
    } catch {
      // error is shown below through updateMutation.isError
    }
  };

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-slate-900">Update Ticket {ticket.id}</h1>
      </div>

      <div className="bg-white p-6 shadow sm:rounded-lg">
        {updateMutation.isError && (
          <p className="mb-4 text-sm text-red-600">
            Could not save the changes: {updateMutation.error.message}
          </p>
        )}

        <TicketsForm
          defaultValues={{
            subject: ticket.subject,
            category: ticket.category,
            priority: ticket.priority,
            description: ticket.description,
          }}
          onSubmit={onSubmit}
          submitLabel="Save Changes"
          onCancel={() => navigate('/tickets')}
        />
      </div>
    </>
  );
}

export default UpdateTicket;