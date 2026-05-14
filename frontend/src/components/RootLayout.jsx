import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import { useAuth } from '../store/authStore'
import { loadingClass } from '../styles/common'

const RootLayout = () => {
  const checkAuth = useAuth(state => state.checkAuth);
  const loading = useAuth(state => state.loading);

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className={loadingClass}>
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Initializing...</p>
        </div>
      </div>
    )
  }

  return (
    <Outlet />
  )
}

export default RootLayout

