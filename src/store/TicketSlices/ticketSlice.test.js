import { describe, it, expect } from 'vitest';
import ticketReducer, {
  toggleTicketSelection,
  clearSelectedTickets,
  setSelectedTickets,
} from './ticketSlice';

describe('ticketSlice', () => {
  const initialState = { selectedTicketIds: [] };

  it('adds an id when toggled on', () => {
    const state = ticketReducer(initialState, toggleTicketSelection('TKT-1'));
    expect(state.selectedTicketIds).toEqual(['TKT-1']);
  });

  it('removes an id when toggled again', () => {
    const selected = { selectedTicketIds: ['TKT-1'] };
    const state = ticketReducer(selected, toggleTicketSelection('TKT-1'));
    expect(state.selectedTicketIds).toEqual([]);
  });

  it('clears the whole selection', () => {
    const selected = { selectedTicketIds: ['TKT-1', 'TKT-2'] };
    const state = ticketReducer(selected, clearSelectedTickets());
    expect(state.selectedTicketIds).toEqual([]);
  });

  it('replaces the selection wholesale', () => {
    const state = ticketReducer(initialState, setSelectedTickets(['TKT-5', 'TKT-6']));
    expect(state.selectedTicketIds).toEqual(['TKT-5', 'TKT-6']);
  });
});