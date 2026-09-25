import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateTicket } from '../store/TicketSlices/ticketSlice';

function UpdateTicket() {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const updatedTicket = useSelector(
        (state) => state.tickets.selectedTicketId
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-900">
        Update Ticket
      </h1>
      <p className="mt-2 text-sm text-slate-700">
        Update an existing support ticket.
      </p>
    </div>
  );
}

export default UpdateTicket;