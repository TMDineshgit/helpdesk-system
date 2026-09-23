
import { useState } from 'react';
import StatusBadge from '../components/ui/StatusBadge';
import EmptyState from '../components/ui/EmptyState';
import { mockTickets } from '../data/mockTickets';
import useDebounce from '../hooks/useDebounce';

function Tickets() {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredTickets = mockTickets.filter((ticket) => {
    const search = debouncedSearchTerm.toLowerCase();

    return (
      ticket.id.toLowerCase().includes(search) ||
      ticket.subject.toLowerCase().includes(search) ||
      ticket.category.toLowerCase().includes(search) ||
      ticket.priority.toLowerCase().includes(search) ||
      ticket.status.toLowerCase().includes(search) ||
      ticket.agent.toLowerCase().includes(search)
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Tickets
        </h1>

        <p className="mt-1 text-slate-500">
          View and manage support tickets.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <input
          type="text"
          placeholder="Search by ID, subject or category..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-full mb-5 h-[36px] font-sm px-3 py-2 leading-relaxed rounded-lg border border-slate-300 p-3 min-w-[320px]"
        />

        {filteredTickets.length === 0 ? (
          <EmptyState message="No matching tickets found." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-3 py-3">ID</th>
                  <th className="px-3 py-3">Subject</th>
                  <th className="px-3 py-3">Category</th>
                  <th className="px-3 py-3">Priority</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Agent</th>
                </tr>
              </thead>

              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b border-slate-100"
                  >
                    <td className="px-3 py-3 font-medium">
                      {ticket.id}
                    </td>

                    <td className="px-3 py-3">
                      {ticket.subject}
                    </td>

                    <td className="px-3 py-3">
                      {ticket.category}
                    </td>

                    <td className="px-3 py-3">
                      {ticket.priority}
                    </td>

                    <td className="px-3 py-3">
                      <StatusBadge status={ticket.status} />
                    </td>

                    <td className="px-3 py-3">
                      {ticket.agent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tickets;