import React, { useEffect, useState } from 'react'
import { 
  articleGrid, 
  pageTitleClass, 
  loadingClass, 
  errorClass,
  primaryBtn,
  emptyStateClass
} from "../styles/common"
import { useAuth } from '../store/authStore'
import { useNavigate, NavLink } from "react-router"
import toast from 'react-hot-toast'
import api from '../api/axios'
import Card from './Card'

const AuthorDashboard = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const currentUser = useAuth(state => state.currentUser)

    useEffect(() => {
        const fetchMyArticles = async () => {
            try {
                const res = await api.get("/author-api/articles")
                setArticles(res.data.payload)
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load your articles")
            } finally {
                setLoading(false)
            }
        }
        fetchMyArticles();
    }, [])

    if (loading) {
        return (
            <div className={loadingClass}>
                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Loading your articles...</p>
            </div>
        )
    }

    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className={pageTitleClass + " mb-2"}>My Dashboard</h1>
                    <p className="text-gray-500 font-medium">Manage and monitor your published stories</p>
                </div>
                <NavLink to="/add-article" className={primaryBtn}>
                    + Create New Article
                </NavLink>
            </header>

            {error ? (
                <div className={errorClass}>{error}</div>
            ) : articles.length === 0 ? (
                <div className={emptyStateClass + " bg-white border border-dashed border-gray-200 rounded-3xl"}>
                    <p className="text-gray-400 font-medium text-lg">You haven't published any articles yet.</p>
                    <NavLink to="/add-article" className="text-indigo-600 font-bold hover:underline">Write your first story →</NavLink>
                </div>
            ) : (
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-gray-100"></div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Your Publications ({articles.length})</span>
                        <div className="h-px flex-1 bg-gray-100"></div>
                    </div>
                    
                    <div className={articleGrid}>
                        {articles.map((articleObj) => (
                            <Card key={articleObj._id} articleObj={articleObj} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AuthorDashboard
