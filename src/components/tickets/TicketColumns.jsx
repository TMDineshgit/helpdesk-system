import { Link } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';

import StatusBadge from '../ui/StatusBadge';
import { TICKET_STATUSES } from '../../data/ticketOptions';

import IndeterminateCheckbox from '../ui/IndeterminateCheckbox';

const columnHelper = createColumnHelper();

export const getTicketColumns = ({ onChangeStatus, onDelete }) => [

 columnHelper.display({
    id: 'select',
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <IndeterminateCheckbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onChange={(event) => table.toggleAllPageRowsSelected(event.target.checked)}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={(event) => row.toggleSelected(event.target.checked)}
        className="h-4 w-4 cursor-pointer"
      />
    ),
  }),
  // ID is now a link to the details page
  columnHelper.accessor('id', {
    header: 'ID',
    enableHiding: false,
    cell: (info) => (
      <Link
        to={`/tickets/${info.getValue()}`}
        className="font-medium text-blue-600 hover:underline"
      >
        {info.getValue()}
      </Link>
    ),
  }),

  columnHelper.accessor('subject', {
    header: 'Subject',
  }),

  columnHelper.accessor('category', {
    header: 'Category',
  }),

  columnHelper.accessor('priority', {
    header: 'Priority',
  }),

  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => <StatusBadge status={info.getValue()} />,
  }),

  columnHelper.display({
    id: 'changeStatus',
    header: 'Change Status',
    enableSorting: false,
    cell: (info) => {
      const ticket = info.row.original;
      return (
        <select
          value={ticket.status}
          onChange={(event) => onChangeStatus(ticket.id, event.target.value)}
          className="h-8 rounded-md border border-slate-300 px-2 text-xs"
        >
          {TICKET_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      );
    },
  }),

  columnHelper.accessor('agent', {
    header: 'Agent',
  }),

  // Edit + Delete
  columnHelper.display({
    id: 'actions',
    header: 'Action',
    enableSorting: false,
    enableHiding: false,
    cell: (info) => {
      const ticket = info.row.original;
      return (
        <div className="flex items-center gap-3">
          <Link
            to={`/tickets/${ticket.id}/edit`}
            className="text-blue-600 hover:underline"
          >
            Edit
          </Link>

          <button
            type="button"
            onClick={() => onDelete(ticket.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      );
    },
  }),
];