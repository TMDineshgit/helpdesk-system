import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createTicketApi,
  updateTicketApi,
  updateTicketStatusApi,
  deleteTicketApi,
  bulkUpdateStatusApi,
  assignTicketApi,
  addCommentApi
} from '../services/ticketApi';
import { ticketKeys } from './useTickets';

// Shared recipe: run the change, then mark the cached tickets as out of date.
function useTicketMutation(mutationFn) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () =>
      // ['tickets'] also matches ['tickets', 'TKT-1001'], so the list AND
      // every cached detail page get refreshed together.
      queryClient.invalidateQueries({ queryKey: ticketKeys.all }),
  });
}

export const useCreateTicket = () => useTicketMutation(createTicketApi);
export const useUpdateTicket = () => useTicketMutation(updateTicketApi);
export const useDeleteTicket = () => useTicketMutation(deleteTicketApi);
export const useBulkUpdateStatus = () => useTicketMutation(bulkUpdateStatusApi);
export function useChangeTicketStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTicketStatusApi,

    // 1. Runs BEFORE the request: update the cached list right away
    onMutate: async ({ id, status }) => {
      // stop any refetch in progress, so it can't overwrite our change
      await queryClient.cancelQueries({ queryKey: ticketKeys.all });

      // keep a copy of the old list, in case we have to undo
      const previousTickets = queryClient.getQueryData(ticketKeys.all);

      queryClient.setQueryData(ticketKeys.all, (old = []) =>
        old.map((ticket) => (ticket.id === id ? { ...ticket, status } : ticket))
      );

      //patch the single-ticket cache, so the detail page updates instantly too
      queryClient.setQueryData(ticketKeys.detail(id), (old) =>
        old ? { ...old, status } : old
      );

      return { previousTickets }; // this becomes "context" below
    },

    // 2. If the request FAILS: put the old list back
    onError: (_error, _variables, context) => {
      if (context?.previousTickets) {
        queryClient.setQueryData(ticketKeys.all, context.previousTickets);
      }
    },

    // 3. Either way, at the end: refetch to be sure we match the server
    onSettled: () => queryClient.invalidateQueries({ queryKey: ticketKeys.all }),
  });
}

// Simple assign: not optimistic, since re-assigning is rarer and less
// time-sensitive than flipping a status back and forth.
export const useAssignTicket = () => useTicketMutation(assignTicketApi);

// Adding a comment: optimistic, scoped to ONE ticket's cache entry.
export function useAddComment(ticketId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newComment) => addCommentApi({ ticketId, ...newComment }),

    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ticketKeys.detail(ticketId) });

      const previousTicket = queryClient.getQueryData(ticketKeys.detail(ticketId));

      // A stand-in comment, shown immediately. It gets replaced by the
      // real one once onSettled refetches from the "server".
      const optimisticComment = {
        id: `temp-${Date.now()}`,
        ...newComment,
        createdAt: new Date().toISOString(),
        pending: true,
      };

      queryClient.setQueryData(ticketKeys.detail(ticketId), (old) =>
        old
          ? { ...old, comments: [...(old.comments || []), optimisticComment] }
          : old
      );

      return { previousTicket };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousTicket) {
        queryClient.setQueryData(ticketKeys.detail(ticketId), context.previousTicket);
      }
    },

    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ticketKeys.detail(ticketId) }),
  });
}