import api from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { 
  articlePageWrapper, 
  articleHeader, 
  articleCategory, 
  articleMainTitle, 
  articleAuthorRow, 
  authorInfo, 
  articleContent, 
  articleFooter, 
  articleActions, 
  editBtn, 
  deleteBtn, 
  inputClass, 
  primaryBtn,
  loadingClass,
  errorClass,
  divider,
  timestampClass,
  submitBtn,
  labelClass
} from '../styles/common';
import { useAuth } from '../store/authStore';
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';

const Article = () => {
  const { id } = useParams();
  const locationObj = useLocation();
  const navigate = useNavigate();
  const user = useAuth(state => state.currentUser);
  const [article, setArticle] = useState(locationObj?.state?.articleObj || null);
  const [loading, setLoading] = useState(!article);
  const [error, setError] = useState(null);

  const { handleSubmit, register, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (!article) {
      const fetchArticle = async () => {
        try {
          const resObj = await api.get(`/user-api/article/${id}`);
          setArticle(resObj.data.payload);
        } catch (err) {
          setError("Failed to load article. It might have been deleted or is currently unavailable.");
        } finally {
          setLoading(false);
        }
      }
      fetchArticle();
    }
  }, [id, article])

  const addCommentHandler = async (data) => {
    try {
        const obj = { articleId: article._id, comment: data.comment };
        const res = await api.put("/user-api/articles", obj)

        if (res.status === 200) {
            toast.success("Comment added");
            setArticle(res.data.payload);
            reset();
        }
    } catch (err) {
        toast.error("Failed to add comment");
    }
  }

  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;
    const confirmMsg = newStatus ? "Restore this article?" : "Delete this article?";
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await api.patch(`/author-api/article/${id}/status`, {});
      setArticle(res.data.payload);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const editArticle = (articleObj) => {
    navigate("/edit-article", { state: articleObj });
  };

  if (loading) {
    return (
      <div className={loadingClass}>
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Loading Article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className={errorClass}>{error}</div>
        <button onClick={() => navigate('/')} className={primaryBtn + " mt-8"}>Back to Home</button>
      </div>
    );
  }

  if (!article) return null;

  const formattedDate = new Date(article.updatedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className={articlePageWrapper}>
      <header className={articleHeader}>
        <span className={articleCategory}>{article.category}</span>
        <h1 className={articleMainTitle}>{article.title}</h1>

        <div className={articleAuthorRow}>
          <div className={authorInfo}>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
              {article.author?.firstName?.[0]}
            </div>
            <div className="text-left">
              <p className="text-gray-900 font-bold">{article.author?.firstName} {article.author?.lastName}</p>
              <p className={timestampClass}>{formattedDate}</p>
            </div>
          </div>

          {user?.role === "AUTHOR" && user.userId === article.author?._id && (
            <div className="flex gap-3">
              <button className={editBtn} onClick={() => editArticle(article)}>Edit</button>
              <button className={deleteBtn} onClick={toggleArticleStatus}>
                {article.isArticleActive ? "Delete" : "Restore"}
              </button>
            </div>
          )}
        </div>
      </header>

      <div className={articleContent}>
        {article.content}
      </div>

      <div className={divider}></div>

      <section className="mt-16">
        <h3 className="text-2xl font-black text-gray-900 mb-8">Comments ({article.comments?.length || 0})</h3>

        {user?.role === "USER" && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-12 shadow-sm">
            <label className={labelClass}>Leave a comment</label>
            <form onSubmit={handleSubmit(addCommentHandler)} className="flex flex-col gap-4">
              <textarea 
                {...register("comment", { required: true })} 
                className={inputClass + " min-h-[100px] resize-none"} 
                placeholder="What are your thoughts?"
              />
              <div className="flex justify-end">
                <button className={submitBtn + " w-auto px-8 py-2.5 mt-0"} type="submit">Post Comment</button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-6">
          {article.comments?.length === 0 ? (
            <p className="text-gray-400 italic text-center py-10">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            article.comments.map((comment) => (
              <div key={comment._id} className="bg-white border border-gray-50 rounded-2xl p-6 transition-all hover:border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-[10px] font-bold">
                    {comment.user?.firstName?.[0] || 'U'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">
                        {comment.user?.firstName} {comment.user?.lastName}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Reader</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{comment.comment}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <footer className={articleFooter}>
        <div className="flex justify-between items-center">
          <p>© {new Date().getFullYear()} {article.author?.firstName}'s Blog</p>
          <div className="flex gap-4">
            <button className="text-indigo-600 font-bold hover:underline">Share</button>
            <button className="text-indigo-600 font-bold hover:underline">Report</button>
          </div>
        </div>
      </footer>
    </article>
  )
}

export default Article
