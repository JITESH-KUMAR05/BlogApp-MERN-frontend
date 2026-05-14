import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Card from './Card'
import { 
  articleGrid, 
  pageTitleClass, 
  bodyText, 
  loadingClass,
  errorClass,
  primaryBtn,
  secondaryBtn
} from '../styles/common'
import { NavLink } from 'react-router'

const Home = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get('/common-api/articles')
        setArticles(res.data.payload)
      } catch (err) {
        setError("Failed to load articles. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <span className="text-indigo-600 font-bold text-xs uppercase tracking-[0.2em] mb-6 block">Welcome to BlogApp</span>
          <h1 className={`${pageTitleClass} max-w-4xl mx-auto text-balance`}>
            Ideas that shape the future of technology and design.
          </h1>
          <p className={`${bodyText} max-w-2xl mx-auto text-lg mb-10`}>
            A minimalist space for writers and readers to share stories, insights, and perspectives on what matters most in today's world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <NavLink to="/register" className={primaryBtn}>Start Writing</NavLink>
            <NavLink to="/login" className={secondaryBtn}>Explore Articles</NavLink>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Latest Stories</h2>
            <div className="h-1.5 w-12 bg-indigo-600 rounded-full"></div>
          </div>
          <div className="flex gap-4">
             {/* Add filtering or sorting UI here in future */}
          </div>
        </div>

        {loading ? (
          <div className={loadingClass}>
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Loading Articles...</p>
          </div>
        ) : error ? (
          <div className={errorClass}>
            <span>{error}</span>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-3xl">
            <p className="text-gray-400 font-medium">No articles found yet. Be the first to write one!</p>
          </div>
        ) : (
          <div className={articleGrid}>
            {articles.map(article => (
              <Card key={article._id} articleObj={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
