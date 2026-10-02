import { describe, it, expect, beforeEach } from 'vitest';
import useFilterStore from './useFilterStore';

describe('useFilterStore', () => {
  beforeEach(() => {
    useFilterStore.getState().resetFilters();
  });

  it('starts with default filters', () => {
    expect(useFilterStore.getState().status).toBe('ALL');
  });

  it('updates the status filter', () => {
    useFilterStore.getState().setStatus('OPEN');
    expect(useFilterStore.getState().status).toBe('OPEN');
  });

  it('resets every filter back to defaults', () => {
    useFilterStore.getState().setStatus('OPEN');
    useFilterStore.getState().setSearch('billing');
    useFilterStore.getState().resetFilters();

    expect(useFilterStore.getState().status).toBe('ALL');
    expect(useFilterStore.getState().search).toBe('');
  });
});