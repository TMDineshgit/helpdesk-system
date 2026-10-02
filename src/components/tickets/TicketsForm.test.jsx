import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TicketsForm from './TicektsForm';

describe('TicketsForm', () => {
  const emptyValues = { subject: '', category: '', priority: '', description: '' };

  it('shows validation errors when submitted empty', async () => {
    const onSubmit = vi.fn();
    render(<TicketsForm defaultValues={emptyValues} onSubmit={onSubmit} submitLabel="Create" />);

    await userEvent.click(screen.getByRole('button', { name: /create/i }));

    expect(await screen.findByText(/subject is required/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with clean data when valid', async () => {
    const onSubmit = vi.fn();
    render(<TicketsForm defaultValues={emptyValues} onSubmit={onSubmit} submitLabel="Create" />);

    await userEvent.type(screen.getByLabelText(/subject/i), 'Printer not working');
    await userEvent.selectOptions(screen.getByLabelText(/category/i), 'Network');
    await userEvent.selectOptions(screen.getByLabelText(/priority/i), 'HIGH');
    await userEvent.type(screen.getByLabelText(/description/i), 'It just stopped responding.');

    await userEvent.click(screen.getByRole('button', { name: /create/i }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ subject: 'Printer not working', priority: 'HIGH' }),
      expect.anything()
    );
  });
});