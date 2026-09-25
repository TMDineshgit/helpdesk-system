
import { useState } from 'react';
import StatusBadge from '../components/ui/StatusBadge';
import EmptyState from '../components/ui/EmptyState';
import { mockTickets } from '../data/mockTickets';
import useDebounce from '../hooks/useDebounce';
import { Link } from 'react-router-dom';
import usePagination from '../hooks/usePagination';

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

  const { currentPage, totalPages, paginatedItems, nextPage, previousPage, goToPage } = usePagination(filteredTickets, 5);

  



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
        <div className="flex items-center justify-between">
          <div>
            <input
              type="text"
              placeholder="Search by ID, subject or category..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full mb-5 h-[36px] font-sm px-3 py-2 leading-relaxed rounded-lg border border-slate-300 p-3 min-w-[320px]"
            />
          </div>
          <div>
            <Link to="/tickets/new" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Create Ticket
            </Link>
          </div>
        </div>

        

        {paginatedItems.length === 0 ? (
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
                {paginatedItems.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b border-slate-100"
                  >
                    <td className="px-3 py-3 font-medium">
                      <Link to={`/tickets/${ticket.id}`} className="text-blue-500 hover:underline">
                        {ticket.id}
                      </Link>
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
         <div className="mt-4 flex items-center justify-between">
            <div>
            </div>
            <div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={previousPage}
                  disabled={currentPage === 1}
                  className={`rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-50 ${currentPage === 1 ? 'cursor-not-allowed bg-gray-300/30' : 'cursor-pointer text-white bg-blue-400 hover:bg-blue-700'}`}
                >
                  Previous
                </button>

                <span className="text-sm text-slate-600">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-50 ${currentPage === totalPages ? 'cursor-not-allowed bg-gray-300/30' : 'cursor-pointer text-white bg-blue-400 hover:bg-blue-700'}`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Tickets;