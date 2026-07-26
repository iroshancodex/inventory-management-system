// src/layouts/MainLayout.jsx
import { NavLink, Outlet } from 'react-router-dom';
import { useInventoryContext } from '../context/InventoryContext';

const MainLayout = () => {
  const { darkMode, setDarkMode, historyLogs } = useInventoryContext();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Products', path: '/products', icon: '📦' },
    { name: 'Stock Audit Logs', path: '/history', icon: '📜', badge: historyLogs.length },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between z-20">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
              📦
            </div>
            <div>
              <h2 className="font-bold text-sm leading-tight text-gray-900 dark:text-white">
                GayanStore
              </h2>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                Inventory Management
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <p className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Menu
            </p>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-300 font-bold">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:opacity-90 transition"
          >
            <span>Appearance</span>
            <span>{darkMode ? '☀️ Light' : '🌙 Dark'}</span>
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 flex items-center justify-between shrink-0">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            Inventory System Management
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
              ● System Active
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default MainLayout;