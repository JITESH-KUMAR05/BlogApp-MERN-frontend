import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from '../store/authStore';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { 
  formCard, 
  formTitle, 
  formGroup, 
  labelClass, 
  inputClass, 
  submitBtn, 
  loadingClass,
  secondaryBtn
} from '../styles/common';

const AddArticle = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth(state => state.currentUser)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const submitHandler = async (articleObj) => {
        setLoading(true);
        try {
            await api.post("/author-api/articles", articleObj);

            toast.success("Article Published Successfully!");
            reset();
            navigate("/author-dashboard");

        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to publish article")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-12">
            <div className={formCard + " max-w-full"}>
                <h1 className={formTitle}>Write a New Article</h1>
                <p className="text-center text-gray-500 mb-10 -mt-4 font-medium">Share your knowledge and insights with the world</p>

                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className={formGroup}>
                        <label className={labelClass}>Article Title</label>
                        <input 
                            {...register("title", { required: "Title is required" })} 
                            className={inputClass} 
                            type="text" 
                            placeholder="Enter a catchy title..." 
                        />
                        {errors.title && <p className="text-rose-600 text-xs font-bold mt-2 uppercase tracking-wider">{errors.title.message}</p>}
                    </div>

                    <div className={formGroup}>
                        <label className={labelClass}>Category</label>
                        <select 
                            className={inputClass} 
                            {...register("category", { required: "Please select a category" })}
                        >
                            <option value="">Select a category</option>
                            <option value="programming">Programming</option>
                            <option value="DSA">Data Structures & Algorithms</option>
                            <option value="AI/ML">Artificial Intelligence / Machine Learning</option>
                            <option value="WebDev">Web Development</option>
                            <option value="Design">Design</option>
                            <option value="Personal">Personal Growth</option>
                        </select>
                        {errors.category && <p className="text-rose-600 text-xs font-bold mt-2 uppercase tracking-wider">{errors.category.message}</p>}
                    </div>

                    <div className={formGroup}>
                        <label className={labelClass}>Content</label>
                        <textarea 
                            placeholder="Tell your story..." 
                            className={inputClass + " min-h-[300px] resize-y py-4 leading-relaxed"} 
                            {...register("content", { required: "Content is required" })}
                        ></textarea>
                        {errors.content && <p className="text-rose-600 text-xs font-bold mt-2 uppercase tracking-wider">{errors.content.message}</p>}
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button 
                            type="button" 
                            onClick={() => navigate(-1)} 
                            className={secondaryBtn + " flex-1"}
                        >
                            Cancel
                        </button>
                        <button 
                            disabled={loading} 
                            className={submitBtn + " flex-[2] mt-0"} 
                            type="submit"
                        >
                            {loading ? "Publishing..." : "Publish Article"}
                        </button>
                    </div>

                    {loading && (
                        <div className={loadingClass}>
                            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                            <p className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">Uploading to server...</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default AddArticle
