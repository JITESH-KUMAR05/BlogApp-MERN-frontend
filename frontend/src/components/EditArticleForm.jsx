import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import api from '../api/axios';
import { toast } from "react-hot-toast";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  secondaryBtn,
  loadingClass,
} from "../styles/common";

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const article = location.state;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // prefill form
  useEffect(() => {
    if (!article) {
        navigate("/author-dashboard");
        return;
    }

     setValue("title", article.title);
     setValue("category", article.category);
     setValue("content", article.content);
  }, [article, navigate, setValue]);

  const updateArticle = async (data) => {
    setLoading(true);
    try {
        data.articleId = article._id;
        let res = await api.put("/author-api/articles", data);
        toast.success("Article updated successfully");
        navigate(`/article/${article._id}`, {
          state: { articleObj: res.data.payload },
        });
    } catch (err) {
        toast.error(err.response?.data?.message || "Failed to update article");
    } finally {
        setLoading(false);
    }
  };

  if (!article) return null;

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className={formCard + " max-w-full"}>
        <h2 className={formTitle}>Edit Your Article</h2>
        <p className="text-center text-gray-500 mb-10 -mt-4 font-medium">Refine your thoughts and update your story</p>

        <form onSubmit={handleSubmit(updateArticle)}>
          {/* Title */}
          <div className={formGroup}>
            <label className={labelClass}>Article Title</label>
            <input 
              className={inputClass} 
              {...register("title", { required: "Title is required" })} 
              placeholder="Enter title..."
            />
            {errors.title && <p className="text-rose-600 text-xs font-bold mt-2 uppercase tracking-wider">{errors.title.message}</p>}
          </div>

          {/* Category */}
          <div className={formGroup}>
            <label className={labelClass}>Category</label>
            <select className={inputClass} {...register("category", { required: "Category is required" })}>
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

          {/* Content */}
          <div className={formGroup}>
            <label className={labelClass}>Content</label>
            <textarea 
              rows="14" 
              className={inputClass + " min-h-[300px] resize-y py-4 leading-relaxed"} 
              {...register("content", { required: "Content is required" })} 
              placeholder="Tell your story..."
            />
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
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>

          {loading && (
            <div className={loadingClass}>
              <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">Saving changes...</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditArticle;
