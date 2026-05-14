import React from 'react'
import { 
  pageTitleClass, 
  formCard, 
  labelClass, 
  secondaryBtn, 
  divider
} from "../styles/common"
import { useAuth } from '../store/authStore'
import { useNavigate } from "react-router"
import toast from 'react-hot-toast'

const AuthorProfile = () => {
    const navigate = useNavigate();
    const currentUser = useAuth(state => state.currentUser);
    const logout = useAuth(state => state.logout);

    const onLogout = async () => {
        await logout();
        toast.success("Logged out successfully");
        navigate("/login");
    };

    if (!currentUser) return null;

    return (
        <div className="max-w-4xl mx-auto py-12">
            <header className="mb-10 text-center">
                <h1 className={pageTitleClass}>Author Profile</h1>
                <p className="text-gray-500 font-medium text-lg">Manage your writer profile and account</p>
            </header>

            <div className={formCard + " max-w-full"}>
                <div className="flex flex-col md:flex-row items-center gap-10 mb-10">
                    <div className="relative">
                        <img 
                            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-50 shadow-lg" 
                            src={currentUser.profileImageUrl || "https://via.placeholder.com/150"} 
                            alt="Profile" 
                        />
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-white text-white cursor-pointer hover:bg-indigo-700 transition-colors">
                            <span className="text-xs">✎</span>
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-black text-gray-900">{currentUser.firstName} {currentUser.lastName}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-indigo-600 font-bold uppercase tracking-widest text-xs">Verified Author</p>
                            <span className="w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center text-[10px] text-white">✓</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-2">Member since {new Date(currentUser.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className={divider + " my-8"}></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-900">Account Details</h3>
                        <div>
                            <label className={labelClass}>Pen Name / Display Name</label>
                            <p className="text-gray-700 font-medium bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">{currentUser.firstName} {currentUser.lastName}</p>
                        </div>
                        <div>
                            <label className={labelClass}>Email Address</label>
                            <p className="text-gray-700 font-medium bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">{currentUser.email}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-900">Writer Tools</h3>
                        <div className="p-6 bg-indigo-50/30 border border-indigo-100 rounded-2xl">
                            <h4 className="font-bold text-indigo-900 mb-2">Author Security</h4>
                            <p className="text-xs text-indigo-700/70 mb-4 leading-relaxed">Secure your author account by updating your password regularly.</p>
                            <button className={secondaryBtn + " w-full bg-white"}>Change Password</button>
                        </div>
                        
                        <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                            <h4 className="font-bold text-gray-900 mb-2">Writer Stats</h4>
                            <div className="flex justify-between items-center mt-4">
                                <div className="text-center">
                                    <p className="text-xl font-black text-gray-900">0</p>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold">Followers</p>
                                </div>
                                <div className="h-8 w-px bg-gray-200"></div>
                                <div className="text-center">
                                    <p className="text-xl font-black text-gray-900">0</p>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold">Views</p>
                                </div>
                                <div className="h-8 w-px bg-gray-200"></div>
                                <div className="text-center">
                                    <p className="text-xl font-black text-gray-900">0</p>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold">Claps</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={divider + " mt-12 mb-8"}></div>
                
                <div className="flex justify-center">
                    <button onClick={onLogout} className="text-sm font-bold text-gray-400 hover:text-rose-600 transition-colors">
                        Sign Out of Author Dashboard
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AuthorProfile
