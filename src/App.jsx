import { Navigate, Route, Routes } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import PageNotFound from './pages/PageNotFound';
import Unauthorized from './pages/Unauthorized';
import TicketsPage from './pages/TicketsPage';
import TicketDetails from './pages/TicketDetails';
import CreateTicket from './pages/CreateTicket';
import UpdateTicket from './pages/UpdateTicket';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

import RequireAuth from './components/auth/RequireAuth';
import RequireRole from './components/auth/RequireRole';
import Toast from './components/ui/Toast';

function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Everything below here needs a logged-in user */}
      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/tickets/new" element={<CreateTicket />} />
          <Route path="/tickets/:ticketId" element={<TicketDetails />} />
          <Route path="/tickets/:ticketId/edit" element={<UpdateTicket />} />

          <Route path="/knowledge-base" element={<div>Knowledge Base</div>} />

          {/* Everything below here ALSO needs the right role */}
          <Route element={<RequireRole allow={['ADMIN']} />}>
            <Route path="/users" element={<Users />} />
          </Route>

          <Route element={<RequireRole allow={['ADMIN', 'SUPPORT_AGENT']} />}>
            <Route path="/reports" element={<Reports />} />
          </Route>

          <Route path="/settings" element={<Settings />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
    <Toast />
    </>
  );
}

export default App;