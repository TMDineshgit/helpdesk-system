import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

import store from '../store/index';
import TicketsPage from './TicketsPage';

const mockTickets = [
  { id: 'TKT-1', subject: 'Printer jam', status: 'OPEN', priority: 'HIGH', category: 'Network', agent: 'Unassigned' },
  { id: 'TKT-2', subject: 'Password reset', status: 'RESOLVED', priority: 'LOW', category: 'Authentication', agent: 'Karthik' },
];

vi.mock('../hooks/useTickets', () => ({
  useTickets: () => ({ data: mockTickets, isPending: false, isError: false, isFetching: false }),
}));

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: { role: 'ADMIN' } }),
}));

function renderTicketsPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <TicketsPage />
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
}

describe('TicketsPage', () => {
  it('renders every ticket from the mocked data', () => {
    renderTicketsPage();
    expect(screen.getByText('Printer jam')).toBeInTheDocument();
    expect(screen.getByText('Password reset')).toBeInTheDocument();
  });

    it('filters rows as the user types in search', async () => {
        renderTicketsPage();

        expect(screen.getByText('Password reset')).toBeInTheDocument();

        await userEvent.type(screen.getByPlaceholderText(/search/i), 'Printer');

        // debounce is 500ms — actually wait for it, rather than checking instantly
        await waitForElementToBeRemoved(() => screen.queryByText('Password reset'), {
        timeout: 1000,
        });

        expect(screen.getByText('Printer jam')).toBeInTheDocument();
    });
});