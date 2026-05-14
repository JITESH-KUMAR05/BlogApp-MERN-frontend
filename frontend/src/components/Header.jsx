import React from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../store/authStore';
import toast from 'react-hot-toast';
import { 
  navbarClass, 
  navContainerClass, 
  navBrandClass, 
  navLinksClass, 
  navLinkClass, 
  navLinkActiveClass,
  primaryBtn
} from '../styles/common';

const Header = () => {
  const navigate = useNavigate();
  const currentUser = useAuth(state => state.currentUser);
  const isAuthenticated = useAuth(state => state.isAuthenticated);
  const logout = useAuth(state => state.logout);

  const role = currentUser?.role;

  const onLogout = async() => {
    await logout();
    toast.success("Logged out successfully")
    navigate("/login")
  }

  return (
    <nav className={navbarClass}>
      <div className={navContainerClass}>
        <div>
          <NavLink to="/" className={navBrandClass}>
            BLOG.APP
          </NavLink>
        </div>
        
        <div className={navLinksClass}>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}
          >
            Home
          </NavLink>
          
          {!isAuthenticated ? (
            <>
              <NavLink 
                to="/register" 
                className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}
              >
                Register
              </NavLink>
              <NavLink 
                to="/login" 
                className={primaryBtn}
              >
                Login
              </NavLink>
            </>
          ) : (
            <>
              <NavLink 
                to={role === "AUTHOR" ? "/author-dashboard" : "/user-dashboard"}
                className={navLinkClass}
              >
                Go to Dashboard
              </NavLink>
              <button onClick={onLogout} className="text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header

