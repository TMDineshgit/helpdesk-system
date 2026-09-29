import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

import EmptyState from '../components/ui/EmptyState';
import { getTicketColumns } from '../components/tickets/TicketColumns';

import useDebounce from '../hooks/useDebounce';
import useFilterStore from '../store/useFilterStore';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectSelectedTicketIds,
} from '../store/TicketSlices/ticketSelectors';
import { useTickets } from '../hooks/useTickets';
import {
  changeTicketStatus,
  bulkUpdateStatus,
  clearSelectedTickets,
  deleteTicket, setSelectedTickets
} from '../store/TicketSlices/ticketSlice';

import { TICKET_STATUSES } from '../data/ticketOptions';

function Tickets() {
  const dispatch = useDispatch();
  const EMPTY_TICKETS = [];

  // Redux: ticket data + checkbox selection
  //const tickets = useSelector(selectAllTickets);
  const {
    data: tickets = EMPTY_TICKETS,
    isPending,
    isError,
    error,
    isFetching,
    refetch,
  } = useTickets();
  const selectedTicketIds = useSelector(selectSelectedTicketIds);

  // Local state: which status is chosen in the bulk dropdown
  const [bulkStatus, setBulkStatus] = useState('RESOLVED');

  // Local state: TanStack reads and updates the sorting through this
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  // Zustand: filter values
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

  const debouncedSearch = useDebounce(search, 500);

  // Column definitions (must be created BEFORE the table uses them)
  const columns = useMemo(
    () =>
      getTicketColumns({
        onChangeStatus: (ticketId, newStatus) =>
          dispatch(changeTicketStatus({ ticketId, newStatus })),
          onDelete: (id) => {
          // Ask first: delete can't be undone
          if (window.confirm(`Delete ticket ${id}?`)) {
            dispatch(deleteTicket(id));
          }
        },
      }),
    [dispatch]
  );

  // Turn Zustand dropdown values into TanStack's filter format
  const columnFilters = useMemo(() => {
    const filters = [];
    if (status !== 'ALL') filters.push({ id: 'status', value: status });
    if (priority !== 'ALL') filters.push({ id: 'priority', value: priority });
    if (category !== 'ALL') filters.push({ id: 'category', value: category });
    return filters;
  }, [status, priority, category]);

    // Redux ids ['TKT-1', 'TKT-2']  ->  TanStack format { 'TKT-1': true, 'TKT-2': true }
  const rowSelection = useMemo(
    () => Object.fromEntries(selectedTicketIds.map((id) => [id, true])),
    [selectedTicketIds]
  );

  // TanStack tells us the new selection; we save it in Redux
  const handleRowSelectionChange = (updater) => {
    const next = typeof updater === 'function' ? updater(rowSelection) : updater;
    dispatch(setSelectedTickets(Object.keys(next).filter((id) => next[id])));
  };

  const table = useReactTable({
    data: tickets,
    columns,
    getRowId: (row) => row.id,
    state: {
      sorting,
      columnFilters,
      globalFilter: debouncedSearch,
      rowSelection,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: handleRowSelectionChange,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  const filteredCount = table.getFilteredRowModel().rows.length;

  if (isPending) {
    return <div className="p-6 text-slate-500">Loading tickets…</div>;
  }

   if (isError) {
    return (
      <div className="space-y-3 p-6">
        <p className="text-red-600">Something went wrong: {error.message}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tickets</h1>
        <p className="mt-1 text-slate-500">View and manage support tickets.</p>
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

          {/* Priority */}
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

          {/* Category */}
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="ALL">All Category</option>
            <option value="Authentication">Authentication</option>
            <option value="Network">Network</option>
            <option value="Email">Email</option>
            <option value="Performance">Performance</option>
          </select>

          {/* Reset */}
          <button
            type="button"
            onClick={resetFilters}
            className="h-10 rounded-lg border border-slate-300 px-4 text-sm text-slate-700 hover:bg-slate-100"
          >
            Reset
          </button>

                    {/* Column show/hide */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowColumnMenu((open) => !open)}
              className="h-10 rounded-lg border border-slate-300 px-4 text-sm text-slate-700 hover:bg-slate-100"
            >
              Columns
            </button>

            {showColumnMenu && (
              <div className="absolute right-0 z-10 mt-2 w-52 rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
                {table
                  .getAllLeafColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <label
                      key={column.id}
                      className="flex cursor-pointer items-center gap-2 py-1 text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={column.getIsVisible()}
                        onChange={column.getToggleVisibilityHandler()}
                      />
                      {typeof column.columnDef.header === 'string'
                        ? column.columnDef.header
                        : column.id}
                    </label>
                  ))}
              </div>
            )}
          </div>

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
          Showing {table.getRowModel().rows.length} of {filteredCount} tickets
          {isFetching && ' · Refreshing…'}
        </div>

        {/* Bulk toolbar: only shows when something is ticked */}
        {selectedTicketIds.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg bg-blue-50 px-4 py-3 text-sm">
            <span className="font-medium text-blue-800">
              {selectedTicketIds.length} selected
            </span>

            <select
              value={bulkStatus}
              onChange={(event) => setBulkStatus(event.target.value)}
              className="h-9 rounded-lg border border-slate-300 px-3 text-sm"
            >
              {TICKET_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => dispatch(bulkUpdateStatus(bulkStatus))}
              className="h-9 rounded-lg bg-blue-600 px-4 text-white hover:bg-blue-700"
            >
              Apply status to selected
            </button>

            <button
              type="button"
              onClick={() => dispatch(clearSelectedTickets())}
              className="ml-auto text-slate-500 hover:underline"
            >
              Clear selection
            </button>
          </div>
        )}

        {/* Table, or the empty message when nothing matches */}
        {filteredCount === 0 ? (
          <EmptyState message="No matching tickets found." />
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-slate-500">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className={`px-3 py-3 ${
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : ''
                        }`}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{ asc: ' ▲', desc: ' ▼' }[header.column.getIsSorted()] ??
                          ''}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-b border-slate-100 hover:bg-slate-50 ${
                      row.getIsSelected() ? 'bg-blue-50' : ''
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-md border px-3 py-1.5 disabled:opacity-40"
          >
            Previous
          </button>

          <span>
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount() || 1}
          </span>

          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-md border px-3 py-1.5 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tickets;