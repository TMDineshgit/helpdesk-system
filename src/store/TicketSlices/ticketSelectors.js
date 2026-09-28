// Look at all tickets
export const selectAllTickets = (state) => state.tickets.tickets;

// Look at the ids of ticked checkboxes
export const selectSelectedTicketIds = (state) => state.tickets.selectedTicketIds;

// Find ONE ticket by its id (we need this for the edit page)
export const selectTicketById = (state, ticketId) =>
  state.tickets.tickets.find((ticket) => ticket.id === ticketId);