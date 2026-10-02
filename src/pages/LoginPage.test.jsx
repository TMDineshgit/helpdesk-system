import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const mockLogin = vi.fn();

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ login: mockLogin }),
}));

import LoginPage from './LoginPage';

describe('LoginPage', () => {
  it('calls login with typed credentials', async () => {
    mockLogin.mockResolvedValueOnce({});
    render(<MemoryRouter><LoginPage /></MemoryRouter>);

    await userEvent.type(screen.getByPlaceholderText(/email/i), 'admin@supporthub.com');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'Admin@123');
    await userEvent.click(screen.getByRole('button', { name: /^login$/i }));

    expect(mockLogin).toHaveBeenCalledWith('admin@supporthub.com', 'Admin@123');
  });

  it('shows an error message when login fails', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Incorrect username or password.'));
    render(<MemoryRouter><LoginPage /></MemoryRouter>);

    await userEvent.click(screen.getByRole('button', { name: /login as admin/i }));

    expect(await screen.findByText(/incorrect username or password/i)).toBeInTheDocument();
  });
});