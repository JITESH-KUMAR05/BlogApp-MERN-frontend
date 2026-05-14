import React from 'react';
import { NavLink } from 'react-router';
import { navBrandClass } from '../styles/common';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <NavLink to="/" className={navBrandClass}>BLOG.APP</NavLink>
            <p className="text-gray-400 text-sm font-medium">
              Sharing thoughts, stories, and ideas.
            </p>
          </div>
          
          <div className="flex gap-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
            <NavLink to="/" className="hover:text-black transition-colors">Home</NavLink>
            <NavLink to="/login" className="hover:text-black transition-colors">Login</NavLink>
            <NavLink to="/register" className="hover:text-black transition-colors">Register</NavLink>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 font-medium">
            © {new Date().getFullYear()} BlogApp. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400 font-medium">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
