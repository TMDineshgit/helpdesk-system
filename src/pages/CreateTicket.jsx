import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createTicket } from '../store/TicketSlices/ticketSlice';

function CreateTicket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const newTicket = {
      id: `TKT-${Date.now()}`,
      ...data,
      status: 'OPEN',
      agent: 'Unassigned',
      createdAt: new Date().toISOString().split('T')[0],
    };

    dispatch(createTicket(newTicket));

    navigate('/tickets');
  };

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Create Ticket
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Create a new support ticket.
        </p>
      </div>
      <div className="p-6 bg-white shadow sm:rounded-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            onSubmit(data);
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-slate-700"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              required
              className="mt-1 px-3 py-2 block w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-slate-700"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              required
              className="mt-1 px-3 py-2 block w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              <option value="Authentication">Authentication</option>
              <option value="Network">Network</option>
              <option value="Email">Email</option>
              <option value="Performance">Performance</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-slate-700"
            >
              Priority
            </label>
            <select
              name="priority"
              id="priority"
              required
              className="mt-1 px-3 py-2 block w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a priority</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="4"
              required
              className="mt-1 px-3 py-2 block w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create Ticket
          </button>
        </form>
      </div>
      <div className="p-6">
        <button
          onClick={() => navigate('/tickets')}
          className="mt-4 inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Back to Tickets
        </button> 
      </div>
    </>
  );
}

export default CreateTicket;