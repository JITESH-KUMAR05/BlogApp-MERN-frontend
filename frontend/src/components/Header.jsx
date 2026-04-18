import React from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../store/authStore';
import toast from 'react-hot-toast';

const Header = () => {
  const navigate = useNavigate();
  const currentUser = useAuth(state => state.currentUser);
  const isAuthenticated = useAuth(state => state.isAuthenticated);
  const logout = useAuth(state => state.logout);

  const role = currentUser?.role;

  const onLogout = async() => {
        await logout();
        toast.success("Logged out")
        navigate("/login")
    }
  return (
    <div className='w-full'>
      <nav className='flex justify-between bg-black text-white p-3 '>
        <div>
            <img className='w-8 rounded-full h-8 sm:w-12.5 sm:h-12.5 object-cover ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7aio1A8-DCI6O_fLPR_tBgPQc6Xuxxr4Lfg&s" alt="" />
        </div>
        <div className='flex gap-5 items-center text-xl justify-around '>
          <NavLink to={"/"}>Home</NavLink>
          {
            !isAuthenticated && (
              <>
              <NavLink to={"register"}>register</NavLink>
              <NavLink to={"login"}>login</NavLink>
              </>
            )
          }

          {
            isAuthenticated && role=="USER" && (
              <>
                <NavLink to={"user-profile"}>profile</NavLink>
                <NavLink to={"user-dashboard"}>dashboard</NavLink>
              </>
            )
          }

          {
            isAuthenticated && role=="AUTHOR" && (
             <>
                <NavLink to={"author-profile"}>profile</NavLink>
                <NavLink to={"add-article"}>add article</NavLink>
                <NavLink to={"author-dashboard"}>dashboard</NavLink>

             </>
            )
          }
          
          {isAuthenticated && <button onClick={onLogout}>Logout</button>}
          
        </div>
      </nav>
    </div>
  )
}

export default Header
