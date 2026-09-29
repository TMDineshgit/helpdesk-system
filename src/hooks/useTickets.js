import { useQuery } from '@tanstack/react-query';
import { fetchTickets, fetchTicketById } from '../services/ticketApi';

// One place that defines the "names" (keys) of our cached data
export const ticketKeys = {
  all: ['tickets'],
  detail: (id) => ['tickets', id],
};

// The whole list
export function useTickets() {
  return useQuery({
    queryKey: ticketKeys.all,
    queryFn: fetchTickets,
  });
}

// One ticket
export function useTicket(ticketId) {
  return useQuery({
    queryKey: ticketKeys.detail(ticketId),
    queryFn: () => fetchTicketById(ticketId),
    enabled: Boolean(ticketId), // don't run if there's no id yet
  });
}