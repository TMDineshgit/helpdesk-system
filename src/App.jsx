import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout';
import RequireAuth from './components/auth/RequireAuth';
import RequireRole from './components/auth/RequireRole';

// Each import() call becomes its own downloadable chunk
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const TicketsPage = lazy(() => import('./pages/TicketsPage'));
const TicketDetails = lazy(() => import('./pages/TicketDetails'));
const CreateTicket = lazy(() => import('./pages/CreateTicket'));
const UpdateTicket = lazy(() => import('./pages/UpdateTicket'));
const Users = lazy(() => import('./pages/Users'));
const Reports = lazy(() => import('./pages/Reports'));
const Settings = lazy(() => import('./pages/Settings'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

const PageLoading = () => <div className="p-6 text-slate-500">Loading…</div>;

function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/tickets/new" element={<CreateTicket />} />
            <Route path="/tickets/:ticketId" element={<TicketDetails />} />
            <Route path="/tickets/:ticketId/edit" element={<UpdateTicket />} />

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
    </Suspense>
  );
}

export default App;