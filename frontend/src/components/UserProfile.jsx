import React, { useEffect, useState } from 'react'
import { articleGrid, errorClass, loadingClass, primaryBtn } from "../styles/common"
import { useAuth } from '../store/authStore'
import {Link, Outlet, useNavigate} from "react-router"
import toast from 'react-hot-toast'
import axios from 'axios'
import Card from './Card'

const userProfile = () => {
    // get the navigate function
    const navigate = useNavigate();
    const [articles, setarticles] = useState([])
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);
    // get the logout fucntion
    const logout = useAuth(state=>state.logout);
    const currentUser = useAuth(state=>state.currentUser);
    const onLogout = async() => {
        await logout();
        toast.success("Logged out")
        navigate("/login")
    }

    useEffect(() => {
        let data = async() => {
            setLoading(true);
            try {
                // toast("loading all the articles")
                let allArticles = await axios.get("https://blogapp-mern-api-epmy.onrender.com/user-api/articles",{withCredentials:true})
                toast.success("articles loaded")
                // console.log(allArticles)
                setarticles(allArticles.data.payload)
            } catch (error) {
                toast.error(error.message)
                setError(error)
                console.log(error.message)
            }
            finally{
                setLoading(false);
            }
        }
        data();
    },[])

    
     if(loading) return <p className={loadingClass}>loading....</p>
  

    
    if(error) return <p className={errorClass} >{error.message}</p>
    

  return (
    <div className='p-4'>
      
    <div className='flex justify-end gap-2 items-center'>
        <h1>Welcome {currentUser.firstName}</h1>
        <img className='w-10 h-10 rounded-full' src={currentUser.profileImageUrl} alt="image" />
        <Link onClick={onLogout} className={primaryBtn}>Logout</Link>
    </div>
        {/* <Outlet /> */}
        <div className={articleGrid}>
            {
                articles.map((articleObj) => {
                    return <Card key={articleObj._id} articleObj={articleObj} />
                })
            }
        </div>
    </div>
  )
}

export default userProfile
