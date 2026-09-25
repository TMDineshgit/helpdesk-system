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
        },
    },
})
export const { selectTicket, createTicket, updateTicket, deleteTicket } = ticketSlice.actions;
export default ticketSlice.reducer;