import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  ClipboardList,
  Clock,
} from 'lucide-react';

import StatCard from '../components/ui/StatCard';
import StatusBadge from '../components/ui/StatusBadge';
import { mockTickets } from '../data/mockTickets';

function Dashboard() {
  const openTickets = mockTickets.filter(
    (ticket) => ticket.status === 'OPEN',
  ).length;

  const pendingTickets = mockTickets.filter(
    (ticket) => ticket.status === 'PENDING',
  ).length;

  const resolvedTickets = mockTickets.filter(
    (ticket) => ticket.status === 'RESOLVED',
  ).length;

  const highPriorityTickets = mockTickets.filter(
    (ticket) => ticket.priority === 'HIGH',
  ).length;

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTickets = mockTickets.filter((ticket) =>
    ticket.subject
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Open Tickets"
          value={openTickets}
          description="Need attention"
          icon={ClipboardList}
        />

        <StatCard
          title="Pending Tickets"
          value={pendingTickets}
          description="Waiting for action"
          icon={Clock}
        />

        <StatCard
          title="Resolved Tickets"
          value={resolvedTickets}
          description="Successfully resolved"
          icon={CheckCircle}
        />

        <StatCard
          title="High Priority"
          value={highPriorityTickets}
          description="Require attention"
          icon={AlertTriangle}
        />
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
              onChange={(event) => setSearchTerm(event.target.value)}
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
                    {ticket.priority}
                  </td>

                  <td className="px-3 py-3">
                    <StatusBadge status={ticket.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;