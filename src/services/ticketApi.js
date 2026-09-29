import { mockTickets } from '../data/mockTickets';

// A pretend database. It lives in memory, so it resets when you refresh.
// structuredClone makes a copy so we never change the original mock file.
let db = structuredClone(mockTickets);

const DELAY_MS = 800;

// Flip to true to see how the error state looks
const SHOULD_FAIL = false;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Every "request" waits a little, and can fail, like a real network call
async function simulateNetwork() {
  await wait(DELAY_MS);
  if (SHOULD_FAIL) {
    throw new Error('Network error: could not reach the server');
  }
}

// ---------- READ ----------

export async function fetchTickets() {
  await simulateNetwork();
  return structuredClone(db);
}

export async function fetchTicketById(id) {
  await simulateNetwork();
  const ticket = db.find((t) => t.id === id);
  if (!ticket) {
    throw new Error(`Ticket ${id} not found`);
  }
  return structuredClone(ticket);
}

// ---------- WRITE (we use these in the next message) ----------

export async function createTicketApi(newTicket) {
  await simulateNetwork();
  db.push(newTicket);
  return structuredClone(newTicket);
}

export async function updateTicketApi(updatedTicket) {
  await simulateNetwork();
  db = db.map((t) => (t.id === updatedTicket.id ? updatedTicket : t));
  return structuredClone(updatedTicket);
}

export async function updateTicketStatusApi({ id, status }) {
  await simulateNetwork();
  db = db.map((t) => (t.id === id ? { ...t, status } : t));
  return { id, status };
}

export async function deleteTicketApi(id) {
  await simulateNetwork();
  db = db.filter((t) => t.id !== id);
  return id;
}

export async function bulkUpdateStatusApi({ ids, status }) {
  await simulateNetwork();
  db = db.map((t) => (ids.includes(t.id) ? { ...t, status } : t));
  return { ids, status };
}