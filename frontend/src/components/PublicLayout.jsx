import React from 'react';
import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import { pageBackground } from '../styles/common';

const PublicLayout = () => {
  return (
    <div className={pageBackground}>
      <Header />
      <main className="min-h-[calc(100vh-64px-100px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
