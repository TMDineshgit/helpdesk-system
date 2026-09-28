import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createTicket } from '../store/TicketSlices/ticketSlice';
import TicketsForm from '../components/tickets/TicektsForm';
import { toAttachmentMeta } from '../utils/attachmentRules';

function CreateTicket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
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

    dispatch(createTicket(newTicket));

    navigate('/tickets');
  };

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Create Ticket
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Create a new support ticket.
        </p>
      </div>
      <div className="p-6 bg-white shadow sm:rounded-lg">
        <TicketsForm defaultValues={{ subject: '', category: '', priority: '', description: '' }} onSubmit={onSubmit} submitLabel="Create Ticket" onCancel={() => navigate('/tickets')} />
      </div>
    </>
  );
}

export default CreateTicket;