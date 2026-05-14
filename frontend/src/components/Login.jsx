import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from "../store/authStore"
import { useNavigate, NavLink } from 'react-router';
import { 
  formCard, 
  formTitle, 
  formGroup, 
  labelClass, 
  inputClass, 
  submitBtn, 
  errorClass, 
  loadingClass,
  linkClass
} from '../styles/common';
import toast from 'react-hot-toast';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const login = useAuth(state => state.login)
    const currentUser = useAuth(state => state.currentUser);
    const isAuthenticated = useAuth(state => state.isAuthenticated)
    const loading = useAuth(state => state.loading);
    const error = useAuth(state => state.error);
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        let res = await login(data);
        if (!res.ok) {
            toast.error(res.message);
            return;
        }
        toast.success("Login successful");
    }

    useEffect(() => {
        if (isAuthenticated) {
            if (currentUser?.role === "USER") {
                navigate("/user-profile")
            }
            if (currentUser?.role === "AUTHOR") {
                navigate("/author-profile")
            }
        }
    }, [isAuthenticated, currentUser, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-8 py-20">
            <div className={formCard}>
                <h1 className={formTitle}>Welcome Back</h1>
                <p className="text-center text-gray-500 mb-10 -mt-4 font-medium">Log in to your account to continue</p>
                
                {error && (
                    <div className={`${errorClass} mb-8`}>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className={formGroup}>
                        <label className={labelClass}>Email Address</label>
                        <input 
                            {...register("email", { required: "Email is required" })} 
                            className={inputClass} 
                            type="email" 
                            placeholder="name@example.com" 
                        />
                        {errors.email && <p className="text-rose-600 text-xs font-bold mt-2 uppercase tracking-wider">{errors.email.message}</p>}
                    </div>

                    <div className={formGroup}>
                        <div className="flex justify-between items-end mb-2">
                            <label className={labelClass}>Password</label>
                            <a href="#" className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:text-indigo-700">Forgot?</a>
                        </div>
                        <input 
                            {...register("password", { 
                                required: "Password is required",
                                minLength: { value: 6, message: "Min length is 6" },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                                    message: "Must contain uppercase, lowercase and number"
                                }
                            })} 
                            className={inputClass} 
                            type="password" 
                            placeholder="••••••••" 
                        />
                        {errors.password && <p className="text-rose-600 text-xs font-bold mt-2 uppercase tracking-wider">{errors.password.message}</p>}
                    </div>

                    <button className={submitBtn} type="submit">
                        Sign In
                    </button>
                </form>

                <div className="mt-10 pt-8 border-t border-gray-50 text-center">
                    <p className="text-sm text-gray-500 font-medium">
                        Don't have an account? <NavLink to="/register" className={linkClass + " font-bold"}>Create one</NavLink>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login

