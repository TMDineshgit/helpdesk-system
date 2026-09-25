import { useParams } from "react-router-dom";
import { mockTickets } from "../data/mockTickets";

function TicketDetails() {
  const { ticketId } = useParams();
  const ticket = mockTickets.find((t) => t.id === ticketId);

  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ticket Details</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p>
          <strong>ID:</strong> {ticket.id}
        </p>
        <p>
          <strong>Title:</strong> {ticket.title}
        </p>
        <p>
          <strong>Description:</strong> {ticket.description}
        </p>
        <p>
          <strong>Status:</strong> {ticket.status}
        </p>
      </div>
    </div>
  );
}

export default TicketDetails;