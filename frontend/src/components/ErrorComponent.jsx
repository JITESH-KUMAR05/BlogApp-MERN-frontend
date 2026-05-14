import React from 'react'
import { useRouteError, useNavigate } from 'react-router'
import { primaryBtn, secondaryBtn } from '../styles/common';

const ErrorComponent = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400 text-5xl mb-10 rotate-12 border border-gray-200">
                ?
            </div>
            <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tighter">
                {error?.status || "Oops!"}
            </h1>
            <h2 className="text-xl font-bold text-gray-500 mb-10 max-w-md leading-relaxed">
                {error?.statusText || error?.message || "Something went wrong on our end. We're looking into it."}
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
                <button onClick={() => navigate('/')} className={primaryBtn}>Back to Safety</button>
                <button onClick={() => window.location.reload()} className={secondaryBtn}>Try Again</button>
            </div>

            <p className="mt-16 text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em]">
                Error Code: {error?.status || "UNKNOWN_ERROR"}
            </p>
        </div>
    )
}

export default ErrorComponent
