
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

function AppLayout() {
  
  const { theme, toggleTheme } = useTheme();

  return (
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header />

          <main className="flex-1 p-6">
            <Outlet />

            <button
              onClick={toggleTheme}
              className="fixed bottom-4 right-4 p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-md hover:shadow-lg transition-shadow"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </main>
        </div>
      </div>


  );
}

export default AppLayout;