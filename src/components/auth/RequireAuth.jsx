import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function RequireAuth() {
  const { isAuthenticated, isInitializing } = useAuth();  
  const location = useLocation();

  if (isInitializing) {
    return <div className="p-6 text-slate-500">Loading session…</div>;
  }


  if (!isAuthenticated) {
    // Remember where they were headed, so login can send them back afterwards
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;