import { useMemo, useState, useCallback } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  ClipboardList,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/ui/StatCard';
import StatusBadge from '../components/ui/StatusBadge';
import { mockTickets } from '../data/mockTickets';
import useDebounce from '../hooks/useDebounce';
import  useModal  from '../hooks/useModal';
import usePagination from '../hooks/usePagination';

function Dashboard() {
  const ticketStats = useMemo(() => {
    return {
      open: mockTickets.filter((ticket) => ticket.status === 'OPEN').length,
      pending: mockTickets.filter((ticket) => ticket.status === 'PENDING').length,
      resolved: mockTickets.filter((ticket) => ticket.status === 'RESOLVED').length,
      highPriority: mockTickets.filter((ticket) => ticket.priority === 'HIGH').length,
      slaBreached: mockTickets.filter((ticket) => ticket.slaBreached).length,
    };
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredTickets = mockTickets.filter((ticket) =>
    ticket.subject
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase()),
  );

  const { currentPage, totalPages, paginatedItems, nextPage, previousPage, goToPage } = usePagination(filteredTickets, 5);  

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-slate-500">
          Overview of your support operations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Open Tickets"
          value={ticketStats.open}
          description="Need attention"
          icon={ClipboardList}
        />

        <StatCard
          title="Pending Tickets"
          value={ticketStats.pending}
          description="Waiting for action"
          icon={Clock}
        />

        <StatCard
          title="Resolved Tickets"
          value={ticketStats.resolved}
          description="Successfully resolved"
          icon={CheckCircle}
        />

        <StatCard
          title="High Priority"
          value={ticketStats.highPriority}
          description="Require attention"
          icon={AlertTriangle}
        />

         <StatCard
          title="SLA Breached"
          value={ticketStats.slaBreached}
          description="Missed deadlines"
          icon={Clock}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Tickets by Status
        </h2>

        <div className="mt-5 space-y-4">
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>Open</span>
              <span>{ticketStats.open}</span>
            </div>

            <div className="h-3 rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full bg-blue-500"
                style={{
                  width: `${(ticketStats.open / mockTickets.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>Pending</span>
              <span>{ticketStats.pending}</span>
            </div>

            <div className="h-3 rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full bg-yellow-500"
                style={{
                  width: `${(ticketStats.pending / mockTickets.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>Resolved</span>
              <span>{ticketStats.resolved}</span>
            </div>

            <div className="h-3 rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full bg-green-500"
                style={{
                  width: `${(ticketStats.resolved / mockTickets.length) * 100}%`,
                }}
              />
            </div>
          </div>
          
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>SLA Breached</span>
              <span>{ticketStats.slaBreached}</span>
            </div>

            <div className="h-3 rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full bg-red-500"
                style={{
                  width: `${(ticketStats.slaBreached / mockTickets.length) * 100}%`,
                }}
              />
            </div>
          </div>

        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between flex-wrap border-b border-slate-200 pb-3 mb-3">
           <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Recent Tickets
          </h2>
          <div>
            <input
              type="text"
              placeholder="Enter ticket's subject..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-[36px] font-sm px-3 py-2 leading-relaxed rounded-lg border border-slate-300 p-3 min-w-[320px]"
            />
          </div>
        </div>
       

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-3 py-3">Ticket ID</th>
                <th className="px-3 py-3">Subject</th>
                <th className="px-3 py-3">Priority</th>
                <th className="px-3 py-3">Status</th>
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
                    {ticket.priority}
                  </td>

                  <td className="px-3 py-3">
                    <StatusBadge status={ticket.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <button
                type="button"
                onClick={openModal}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                Modal
            </button>
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
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-bold">
              Ticket Actions
            </h2>

            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg bg-slate-900 px-4 py-2 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;