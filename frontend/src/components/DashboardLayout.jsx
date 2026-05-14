import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../store/authStore';
import toast from 'react-hot-toast';
import { 
  pageBackground, 
  navBrandClass, 
  navLinkClass, 
} from '../styles/common';

const DashboardLayout = () => {
  const currentUser = useAuth(state => state.currentUser);
  const logout = useAuth(state => state.logout);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const role = currentUser?.role;

  const onLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navItems = role === "AUTHOR" ? [
    { name: "Profile", path: "/author-profile" },
    { name: "My Articles", path: "/author-dashboard" },
    { name: "Add Article", path: "/add-article" },
  ] : [
    { name: "Profile", path: "/user-profile" },
    { name: "Dashboard", path: "/user-dashboard" },
  ];

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center px-8 border-b border-gray-100">
        <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={navBrandClass}>BLOG.APP</NavLink>
      </div>
      <nav className="flex-1 p-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) => 
              `${navLinkClass} block px-4 py-2.5 rounded-xl transition-all ${isActive ? 'bg-indigo-50 text-indigo-600 font-bold' : 'hover:bg-gray-50'}`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-6 border-t border-gray-100">
        <button 
          onClick={() => {
            onLogout();
            setIsMobileMenuOpen(false);
          }}
          className="w-full text-left px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
        >
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className={`flex h-screen overflow-hidden ${pageBackground}`}>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col hidden md:flex">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 z-10">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 md:hidden text-gray-500 hover:text-black transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          
          <div className="md:hidden flex-1 text-center pr-8">
            <NavLink to="/" className={navBrandClass}>BLOG.APP</NavLink>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-gray-900">{currentUser?.username || `${currentUser?.firstName} ${currentUser?.lastName?.[0]}.`}</p>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">{role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200 shadow-sm">
              {currentUser?.firstName?.[0]?.toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
