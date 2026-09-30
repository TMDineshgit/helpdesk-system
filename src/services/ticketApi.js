import { apiFetch } from './apiClient';

export function fetchTickets() {
  return apiFetch('/tickets');
}

export function fetchTicketById(id) {
  return apiFetch(`/tickets/${id}`);
}

export function createTicketApi(newTicket) {
  return apiFetch('/tickets', { method: 'POST', body: JSON.stringify(newTicket) });
}

export function updateTicketApi(updatedTicket) {
  return apiFetch(`/tickets/${updatedTicket.id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedTicket),
  });
}

export function updateTicketStatusApi({ id, status }) {
  return apiFetch(`/tickets/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function deleteTicketApi(id) {
  return apiFetch(`/tickets/${id}`, { method: 'DELETE' });
}

export function bulkUpdateStatusApi({ ids, status }) {
  return apiFetch('/tickets/bulk-status', {
    method: 'POST',
    body: JSON.stringify({ ids, status }),
  });
}

export function assignTicketApi({ id, agent }) {
  return apiFetch(`/tickets/${id}/assign`, {
    method: 'PUT',
    body: JSON.stringify({ agent }),
  });
}

export function addCommentApi({ ticketId, text, author }) {
  return apiFetch(`/tickets/${ticketId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ text, author }),
  });
}