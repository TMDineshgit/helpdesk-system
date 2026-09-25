
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import PageNotFound from './pages/PageNotFound';
import TicketsPage from './pages/TicketsPage';
import TicketDetails from './pages/TicketDetails';
import CreateTicket from './pages/CreateTicket';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />}/>

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/tickets/new" element={<CreateTicket />} />
          <Route path="/tickets/:ticketId" element={<TicketDetails />} />

          <Route path="/knowledge-base" element={<div>Knowledge Base</div>}/>

          <Route path="/users" element={<Users />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;