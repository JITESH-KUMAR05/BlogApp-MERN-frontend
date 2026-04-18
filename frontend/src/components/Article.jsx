import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { articleActions, deleteBtn, editBtn, errorClass, inputClass, loadingClass, primaryBtn } from '../styles/common';
import { useAuth } from '../store/authStore';
import {useForm} from "react-hook-form"
import toast from 'react-hot-toast';

const Article = () => {
  const {id} = useParams();
  const locationObj = useLocation();
  const navigate = useNavigate();
  // console.log("location Obj", locationObj)
  const user = useAuth(state => state.currentUser);
  const [article,setArticle] = useState(locationObj?.state?.articleObj || null);
  // console.log("article",article)
  const [loading, setLoading] = useState(!article);
  const [error, setError] = useState(null);

  const {handleSubmit, register, formState:{errors}, reset} = useForm();

  useEffect(() => {
    // if article is not present then we have to make an api call
    if(!article){
      const fetchArticle = async() => {
        try {
          console.log("use effect in article running")
          const resObj = await axios.get(`http://localhost:5000/user-api/article/${id}`);
          const res = resObj.data.payload;
          setArticle(res);

        } catch (err) {
          setError(err);
        }finally{
          setLoading(false);
        }
      }
      fetchArticle();
    }
  },[id,article])

  // add the comment 
  const addCommentHandler = async(data)=>{
    console.log(data)
    const obj = {articleId:article._id,comment:data.comment};
    console.log(obj)
    const res = await axios.put("http://localhost:4000/user-api/articles",obj,{withCredentials:true})

    if (res.status === 200) {
      toast.success(res.data.message);
      setArticle(res.data.payload);
    }
  }

  // delete & restore article
  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;

    const confirmMsg = newStatus ? "Restore this article?" : "Delete this article?";
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.patch(
        `http://localhost:4000/author-api/articles/${id}/status`,
        { isArticleActive: newStatus },
        { withCredentials: true },
      );

      console.log("SUCCESS:", res.data);

      setArticle(res.data.payload);

      toast.success(res.data.message);
    } catch (err) {
      console.log("ERROR:", err.response);

      const msg = err.response?.data?.message;

      if (err.response?.status === 400) {
        toast(msg); // already deleted/active case
      } else {
        setError(msg || "Operation failed");
      }
    }
  };
  
  const editArticle = (articleObj) => {
    navigate("/edit-article", { state: articleObj });
  };

  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return null;

  
  return (
    <div className='w-200 p-20'>
      <h1 className='font-extrabold text-4xl'>{article.title}</h1>
      <p className='text-gray-600'>{article.content}</p>
      <p>{new Date(article.updatedAt).toLocaleString()}</p>

      {/* AUTHOR actions */}
      {user?.role === "AUTHOR" && (
        <div className={articleActions}>
          <button className={editBtn} onClick={() => editArticle(article)}>
            Edit
          </button>

          <button className={deleteBtn} onClick={toggleArticleStatus}>
            {article.isArticleActive ? "Delete" : "Restore"}
          </button>
        </div>
      )}
  

      {/* comments */}
      {user?.role=== "USER" && (
        <div className={`${articleActions}`}>
        <h1 className=''>Add Comments</h1>
        <form onSubmit={handleSubmit(addCommentHandler)} className='py-5' action="">
          <input {...register("comment")} className={`${inputClass}`} type="text" placeholder='add comment' />
          <button className={`${primaryBtn} mt-2`} type="submit">comment</button>
        </form>
      </div>
      )}

      {article.comments.map((comment) => (
        <div key={comment._id} className="bg-gray-300 p-6 rounded-2xl mt-4">
          <p className="uppercase text-pink-400 font-bold mb-3">
          {comment.user?.email}
          </p>
          <p>{comment.comment}</p>
        </div>
      ))}

    </div>



  )
}

export default Article
