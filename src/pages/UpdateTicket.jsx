import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { updateTicket } from '../store/TicketSlices/ticketSlice';
import { selectTicketById } from '../store/TicketSlices/ticketSelectors';
import TicketsForm from '../components/tickets/TicektsForm';
import { toAttachmentMeta } from '../utils/attachmentRules';

function UpdateTicket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticketId } = useParams();

  const ticket = useSelector((state) => selectTicketById(state, ticketId));

  if (!ticket) {
    return <div className="p-6">Ticket not found.</div>;
  }

  const onSubmit = (data) => {
    const { attachments, ...ticketData } = data;
    dispatch(
      updateTicket({ 
        ...ticket, 
        ...ticketData, 
        attachments: [...(ticket.attachments || []), ...toAttachmentMeta(attachments)], 
      })
    );
    navigate('/tickets');
  };

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-slate-900">Update Ticket {ticket.id}</h1>
      </div>

      <div className="bg-white p-6 shadow sm:rounded-lg">
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