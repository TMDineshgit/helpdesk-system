import { useNavigate } from 'react-router-dom';

import TicketsForm from '../components/tickets/TicektsForm';
import { toAttachmentMeta } from '../utils/attachmentRules';
import { useCreateTicket } from '../hooks/useTicketMutation';

function CreateTicket() {
  const navigate = useNavigate();
  const createMutation = useCreateTicket();

  const onSubmit = async (data) => {
    const { attachments, ...ticketData } = data;

    const newTicket = {
      id: `TKT-${Date.now()}`,
      ...ticketData,
      attachments: toAttachmentMeta(attachments),
      status: 'OPEN',
      agent: 'Unassigned',
      slaBreached: false,
      createdAt: new Date().toISOString().split('T')[0],
    };

    try {
      await createMutation.mutateAsync(newTicket);
      navigate('/tickets');
    } catch {
      // Nothing to do here: the error message is shown below through
      // createMutation.isError
    }
  };

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-slate-900">Create Ticket</h1>
        <p className="mt-2 text-sm text-slate-500">Create a new support ticket.</p>
      </div>

      <div className="bg-white p-6 shadow sm:rounded-lg">
        {createMutation.isError && (
          <p className="mb-4 text-sm text-red-600">
            Could not create the ticket: {createMutation.error.message}
          </p>
        )}

        <TicketsForm
          defaultValues={{ subject: '', category: '', priority: '', description: '' }}
          onSubmit={onSubmit}
          submitLabel="Create Ticket"
          onCancel={() => navigate('/tickets')}
        />
      </div>
    </>
  );
}

export default CreateTicket;