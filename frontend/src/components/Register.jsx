import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useNavigate, NavLink } from "react-router";
import { 
  formCard, 
  formTitle, 
  formGroup, 
  labelClass, 
  inputClass, 
  submitBtn, 
  errorClass, 
  loadingClass,
  linkClass,
  secondaryBtn
} from "../styles/common.js";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
        role: "USER"
    }
  });
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  
  const selectedRole = watch("role");

  const submitHandler = async (data) => {
    setloading(true);
    seterror(null);

    const formData = new FormData();
    let { role, profileImageUrl, ...userObj } = data;
    
    Object.keys(userObj).forEach((key) => {
      formData.append(key, userObj[key]);
    });
    
    if (profileImageUrl && profileImageUrl[0]) {
        formData.append("profileImageUrl", profileImageUrl[0]);
    }

    try {
      const endpoint = role === "AUTHOR" 
        ? "/author-api/users"
        : "/user-api/users";
        
      const resObj = await api.post(endpoint, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      });
      
      if (resObj.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      seterror(err.response?.data?.error || "Registration Failed");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-20">
      <div className={formCard}>
        <h1 className={formTitle}>Create Account</h1>
        <p className="text-center text-gray-500 mb-10 -mt-4 font-medium">Join our community of readers and writers</p>

        {error && (
          <div className={`${errorClass} mb-8`}>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-10">
            <label className={labelClass + " text-center"}>Join as a</label>
            <div className="flex justify-center gap-4 mt-4">
              <label className={`cursor-pointer flex-1 flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${selectedRole === "USER" ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                <input
                  type="radio"
                  {...register("role", { required: true })}
                  value="USER"
                  className="hidden"
                />
                <span className={`text-sm font-bold ${selectedRole === "USER" ? 'text-indigo-600' : 'text-gray-500'}`}>Reader</span>
                <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">I want to read and comment</span>
              </label>
              
              <label className={`cursor-pointer flex-1 flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${selectedRole === "AUTHOR" ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                <input
                  type="radio"
                  {...register("role", { required: true })}
                  value="AUTHOR"
                  className="hidden"
                />
                <span className={`text-sm font-bold ${selectedRole === "AUTHOR" ? 'text-indigo-600' : 'text-gray-500'}`}>Writer</span>
                <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">I want to publish articles</span>
              </label>
            </div>
            {errors.role && <p className="text-rose-600 text-xs font-bold mt-2 text-center uppercase tracking-wider">Please select a role</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className={formGroup + " mb-0"}>
              <label className={labelClass}>First Name</label>
              <input
                {...register("firstName", { required: "First name is required", minLength: { value: 3, message: "Min 3 characters" } })}
                className={inputClass}
                type="text"
                placeholder="John"
              />
              {errors.firstName && <p className="text-rose-600 text-xs font-bold mt-2 uppercase tracking-wider">{errors.firstName.message}</p>}
            </div>
            <div className={formGroup + " mb-0"}>
              <label className={labelClass}>Last Name</label>
              <input
                {...register("lastName")}
                className={inputClass}
                type="text"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Email Address</label>
            <input
              {...register("email", { required: "Email is required" })}
              className={inputClass}
              type="email"
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-rose-600 text-xs font-bold mt-2 uppercase tracking-wider">{errors.email.message}</p>}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                  message: "Include uppercase, lowercase and number"
                }
              })}
              className={inputClass}
              type="password"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-rose-600 text-xs font-bold mt-2 uppercase tracking-wider">{errors.password.message}</p>}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Profile Picture</label>
            <div className="flex items-center gap-6 p-4 bg-gray-50 border border-gray-100 rounded-xl">
              <div className="relative group">
                <div className="w-16 h-16 rounded-full bg-white border border-gray-200 overflow-hidden flex items-center justify-center">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl text-gray-300">?</span>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <input
                  className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-white file:text-indigo-600 hover:file:bg-indigo-50 file:cursor-pointer"
                  type="file"
                  accept="image/png, image/jpeg"
                  {...register("profileImageUrl")}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      if (!["image/jpeg", "image/png"].includes(file.type)) {
                        seterror("Only JPG or PNG allowed");
                        return;
                      }
                      if (file.size > 2 * 1024 * 1024) {
                        seterror("File size must be less than 2MB");
                        return;
                      }
                      const previewUrl = URL.createObjectURL(file);
                      setPreview(previewUrl);
                      seterror(null);
                    }
                  }}
                />
                <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-tight">JPG, PNG (Max 2MB)</p>
              </div>
            </div>
          </div>

          <button className={submitBtn} type="submit">
            Create Account
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
          <p className="text-sm text-gray-500 font-medium">
            Already have an account? <NavLink to="/login" className={linkClass + " font-bold"}>Sign in</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
