import { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import StatusBadge from '../components/ui/StatusBadge';
import EmptyState from '../components/ui/EmptyState';

import { mockTickets } from '../data/mockTickets';

import useDebounce from '../hooks/useDebounce';
import usePagination from '../hooks/usePagination';

import useFilterStore from '../store/useFilterStore';

function Tickets() {
  // Zustand filter state
  const {
    search,
    status,
    priority,
    category,
    setSearch,
    setStatus,
    setPriority,
    setCategory,
    resetFilters,
  } = useFilterStore();

  // Debounce search input
  const debouncedSearch = useDebounce(search, 500);

  // Filter tickets
  const filteredTickets = useMemo(() => {
    const searchValue = debouncedSearch.toLowerCase().trim();

    return mockTickets.filter((ticket) => {
      const matchesSearch =
        !searchValue ||
        ticket.id.toLowerCase().includes(searchValue) ||
        ticket.subject.toLowerCase().includes(searchValue) ||
        ticket.category.toLowerCase().includes(searchValue) ||
        ticket.priority.toLowerCase().includes(searchValue) ||
        ticket.status.toLowerCase().includes(searchValue) ||
        ticket.agent.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === 'ALL' || ticket.status === status;

      const matchesPriority =
        priority === 'ALL' || ticket.priority === priority;

      const matchesCategory =
        category === 'ALL' || ticket.category === category;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory
      );
    });
  }, [
    debouncedSearch,
    status,
    priority,
    category,
  ]);

  // Pagination
  const {
    currentPage,
    totalPages,
    paginatedItems,
    nextPage,
    previousPage,
    goToPage,
  } = usePagination(filteredTickets, 5);

  useEffect(() => {
    // Reset to first page when filters change
    goToPage(1);
  }, [debouncedSearch, status, priority, category]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Tickets
        </h1>

        <p className="mt-1 text-slate-500">
          View and manage support tickets.
        </p>
      </div>

      {/* Main Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="flex-1 min-w-[250px]">
            <input
              type="text"
              placeholder="Search by ID, subject, category..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-10 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="ALL">All Status</option>
              <option value="OPEN">Open</option>
              <option value="PENDING">Pending</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="ALL">All Priority</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="ALL">All Category</option>
              <option value="Authentication">
                Authentication
              </option>
              <option value="Network">
                Network
              </option>
              <option value="Email">
                Email
              </option>
              <option value="Performance">
                Performance
              </option>
            </select>
          </div>

          {/* Reset */}
          <button
            type="button"
            onClick={resetFilters}
            className="h-10 rounded-lg border border-slate-300 px-4 text-sm text-slate-700 hover:bg-slate-100"
          >
            Reset
          </button>

          {/* Create Ticket */}
          <Link
            to="/tickets/new"
            className="h-10 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Create Ticket
          </Link>
        </div>

        {/* Ticket Count */}
        <div className="mt-5 text-sm text-slate-500">
          Showing {paginatedItems.length} of{' '}
          {filteredTickets.length} tickets
        </div>

        {/* Empty State */}
        {paginatedItems.length === 0 ? (
          <div className="mt-5">
            <EmptyState message="No matching tickets found." />
          </div>
        ) : (
          /* Ticket Table */
          <div className="mt-4 overflow-x-auto">
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
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    {/* Ticket ID */}
                    <td className="px-3 py-3 font-medium">
                      <Link
                        to={`/tickets/${ticket.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {ticket.id}
                      </Link>
                    </td>

                    {/* Subject */}
                    <td className="px-3 py-3">
                      {ticket.subject}
                    </td>

                    {/* Category */}
                    <td className="px-3 py-3">
                      {ticket.category}
                    </td>

                    {/* Priority */}
                    <td className="px-3 py-3">
                      {ticket.priority}
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3">
                      <StatusBadge status={ticket.status} />
                    </td>

                    {/* Agent */}
                    <td className="px-3 py-3">
                      {ticket.agent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredTickets.length > 0 && (
          <div className="mt-5 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={previousPage}
              disabled={currentPage === 1}
              className={`rounded-lg border border-slate-300 px-4 py-2 text-sm ${
                currentPage === 1
                  ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
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
              className={`rounded-lg border border-slate-300 px-4 py-2 text-sm ${
                currentPage === totalPages
                  ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tickets;