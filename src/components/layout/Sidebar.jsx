
import {
  ClipboardList,
  ChartColumn,
  Settings,
  Users,
  Gauge,
} from 'lucide-react';
import { NavLink } from 'react-router-dom'
import useUiStore from '../../store/useUiStore';

const menuItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: Gauge,
  },
  {
    label: 'Tickets',
    path: '/tickets',
    icon: ClipboardList,
  },
  {
    label: 'Reports',
    path: '/reports',
    icon: ChartColumn,
  },
  {
    label: 'Users',
    path: '/users',
    icon: Users,
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings,
  },
];

function Sidebar() {

  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);

  return (
    <aside className={isSidebarOpen ? 'w-64 shrink-0 bg-slate-900 p-4 text-white' : 'w-20 shrink-0 bg-slate-900 p-4 text-white'}>
      {
        isSidebarOpen ? (
          <div className="mb-8 px-3">
            <h2 className="text-xl font-bold">SupportHub</h2>
            <p className="text-sm text-slate-400">
              Admin Portal
            </p>
          </div>
        ) : (
          <div className="mb-8 flex justify-center">
            <h2 className="text-xl font-bold">SH</h2>
          </div>
        )  
      }
    
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`
              }
            >
              <Icon size={18} />
              { isSidebarOpen && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;