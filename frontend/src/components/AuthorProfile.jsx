import React, { useEffect, useState } from 'react'
import { articleGrid, primaryBtn } from "../styles/common"
import { useAuth } from '../store/authStore'
import {Link, useNavigate} from "react-router"
import toast from 'react-hot-toast'
import axios from 'axios'
import Card from './Card'

const AuthorProfile = () => {
    // get the navigate function
    const navigate = useNavigate();
    const [articles, setarticles] = useState([])
    // get the logout fucntion
    const logout = useAuth(state=>state.logout);
    const onLogout = async() => {
        await logout();
        toast.success("Logged out")
        navigate("/login")
    }

    useEffect(() => {
        let data = async() => {
                try {
                // toast("loading all the articles")
                let allArticles = await axios.get("http://localhost:4000/author-api/articles",{withCredentials:true})
                toast.success("articles loaded")
                // console.log(allArticles)
                setarticles(allArticles.data.payload)
            } catch (error) {
                toast.error(error.message)
            }
        }
        data();
    },[])
  return (
    <div className='p-8'>
    
    <Link onClick={onLogout} className={primaryBtn}>Logout</Link>
        <div className={`${articleGrid} p-8`}>
            {
                articles.map((articleObj) => {
                    return <Card key={articleObj._id} articleObj={articleObj} />
                })
            }
        </div>
    </div>
  )
}

export default AuthorProfile
