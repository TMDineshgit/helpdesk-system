
import { Bell, Search, SidebarOpen, SidebarClose } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import useUiStore from '../../store/useUiStore';

function Header() {

  const { logout, user } = useAuth();

  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-2">
        <div>
          <button
            type="button"
            onClick={toggleSidebar}
            className="rounded-lg p-2 hover:bg-slate-100 cursor-pointer"
          >
            {toggleSidebar ? <SidebarClose size={20} /> : <SidebarOpen size={20} />}
          </button>
        </div>
        <div>
        <h1 className="text-lg font-bold text-slate-900">
          SupportHub
        </h1>
        <p className="text-xs text-slate-500">
          IT Support Management
        </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 md:flex">
          <Search size={18} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-32 bg-transparent text-sm outline-none"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <Bell size={20} />
        </button>
        <button
          type="button"
          onClick={logout}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Logout
        </button>
        <div>
          Welcome, {user?.name}
        </div>
      </div>
    </header>
  );
}

export default Header;