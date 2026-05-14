import React from 'react'
import { 
  articleCardClass, 
  articleExcerpt, 
  articleTitle, 
  articleMeta,
  tagClass,
  timestampClass,
  authorInfo
} from '../styles/common'
import { useNavigate } from 'react-router'

const Card = ({ articleObj }) => {
    const navigate = useNavigate();
    const handleReadArticle = () => {
        navigate(`/article/${articleObj._id}`, {
            state: { articleObj: articleObj }
        })
    }

    const formattedDate = new Date(articleObj.updatedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div onClick={handleReadArticle} className={articleCardClass}>
            <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <span className={tagClass}>{articleObj.category}</span>
                    <span className={timestampClass}>{formattedDate}</span>
                </div>
                
                <h2 className={articleTitle + " mb-3"}>{articleObj.title}</h2>
                
                <p className={articleExcerpt + " mb-6 flex-1"}>
                    {articleObj.content.substring(0, 100)}...
                </p>
                
                <div className="pt-6 border-t border-gray-50 mt-auto flex items-center justify-between">
                    <div className={authorInfo}>
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold border border-indigo-100">
                            {articleObj.author?.firstName?.[0]}
                        </div>
                        <span className="text-xs font-bold text-gray-900">
                            {articleObj.author?.firstName} {articleObj.author?.lastName}
                        </span>
                    </div>
                    
                    <span className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                        Read More →
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Card

