import { createSlice } from '@reduxjs/toolkit';
import { mockTickets } from '../../data/mockTickets';

const initialState = {
  tickets: mockTickets,
  selectedTicketIds: [],
  selectedTicketId: null,
  loading: false,
  error: null,
};

const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        selectTicket: (state, action) => {
            state.selectedTicketId = action.payload;
        },
        setSelectedTickets: (state, action) => {
            state.selectedTicketIds = action.payload; // array of ids
        },
        createTicket: (state, action) => {
            state.tickets.push(action.payload);
        },
        updateTicket: (state, action) => {
           const updatedTicket = action.payload;
           const index = state.tickets.findIndex(ticket => ticket.id === updatedTicket.id);
           if (index !== -1) {
               state.tickets[index] = updatedTicket;
           }
        },
        deleteTicket: (state, action) => {
            state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload);
            state.selectedTicketIds = state.selectedTicketIds.filter(
                (selectedId) => selectedId !== action.payload
            );
        },
        changeTicketStatus: (state, action) => {
            const { ticketId, newStatus } = action.payload;
            const ticket = state.tickets.find(ticket => ticket.id === ticketId);
            if (ticket) {
                ticket.status = newStatus;
            }
        },
        toggleTicketSelection: (state, action) => {
            const ticketId = action.payload;
            if (state.selectedTicketIds.includes(ticketId)) {
                state.selectedTicketIds = state.selectedTicketIds.filter(id => id !== ticketId);
            } else {
                state.selectedTicketIds.push(ticketId);
            }
        },
        selectAllVisibleTickets: (state, action) => {
            state.selectedTicketIds = action.payload;
        },
        clearSelectedTickets: (state) => {
            state.selectedTicketIds = [];
        },
        bulkUpdateStatus: (state, action) => {
        const newStatus = action.payload;
        state.tickets.forEach((ticket) => {
            if (state.selectedTicketIds.includes(ticket.id)) {
            ticket.status = newStatus;
            }
        });
        state.selectedTicketIds = [];
        },
    },
})
export const { selectTicket, createTicket, updateTicket, deleteTicket, changeTicketStatus, toggleTicketSelection, selectAllVisibleTickets, clearSelectedTickets, bulkUpdateStatus, setSelectedTickets } = ticketSlice.actions;

export default ticketSlice.reducer;