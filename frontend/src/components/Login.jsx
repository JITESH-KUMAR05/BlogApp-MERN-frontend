import React, { useEffect } from 'react'
import {useForm} from  "react-hook-form"
import {useAuth} from "../store/authStore"
import { useNavigate } from 'react-router';
import { errorClass, loadingClass } from '../styles/common';
import toast from 'react-hot-toast';

const Login = () => {
    const {register , handleSubmit, formState:{errors}}  = useForm();
    const login = useAuth(state => state.login)
    const currentUser = useAuth(state=> state.currentUser);
    const isAuthenticated = useAuth(state=>state.isAuthenticated)
    const loading = useAuth(state=>state.loading);
    const error = useAuth(state=>state.error);
    const navigate = useNavigate();
    // console.log(currentUser)
    // console.log(isAuthenticated)
    const submitHandler = async(data) => {
        // console.log(data);
        // making the api req to the login
        let res = await login(data);
        if(!res.ok){
            toast.error(res.message);
            return;
        }
        toast.success("login successful");

    }
    
    useEffect(()=>{
        if(isAuthenticated){
            toast(`Navigating to ${currentUser?.role} page`)
            if(currentUser?.role==="USER"){
                
                navigate("/user-profile")
            }
            if(currentUser?.role==="AUTHOR"){
                navigate("/author-profile")
            }
        }

    },[isAuthenticated,currentUser]);

    if(loading){
        return <p className={loadingClass}></p>
    }

  return (
    <div className='p-20 text-center'>
      <h1 className='text-5xl'>Login</h1>
      <form onSubmit={handleSubmit(submitHandler)} className='bg-gray-200 md:w-170 shadow rounded-2xl m-auto p-10 mt-5'>
        {/* <div className='flex w-full m-auto gap-3 justify-center items-center'>
            <h2 className='font-medium'>Select Role</h2>
            <div className=''>
                <input type="radio" {...register("role",{required:true})} value={"USER"} id="" />
                <label htmlFor="role">User</label>
            </div>
            <div>
                <input type="radio" {...register("role",{required:true})} name="role" value={"AUTHOR"} id="" />
                <label htmlFor="role">Author</label>
            </div>
            
        </div>
        {
                errors.role?.type === "required" && <p className='text-red-600'>Choosing role is required</p>
        } */}

        {
            error && <p className={errorClass}>{error}</p>
        }
        
        <div className='mt-2 flex flex-col gap-2 w-full  md:w-full m-auto justify-center '>
            <input {...register("email",{required:true})} className='bg-gray-400 w-full md:w-4/5 rounded-2xl md:p-2 m-auto px-2 text-center' type="email" placeholder='Email' />
            { 
                errors.email?.type === "required" && <p className='text-red-600'>email is required</p>
            }
            <input  {...register("password",{required:true,minLength:6,pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/})} className='bg-gray-400 w-full md:w-4/5 rounded-2xl md:p-2 m-auto px-2 text-center' type="password" placeholder='Password' />
            {
                errors.password?.type === 'required' && <p className='text-red-600'>password is required</p>
            }
            {
                errors.password?.type === 'minLength' && <p className='text-red-600'>min length of password is 6</p>
            }
            {
                errors.password?.type === 'pattern' && <p className='text-red-600'>Password must contain uppercase, lowercase and number</p>
            }

        </div>

        <button className='bg-blue-400 px-3 py-1 mt-2 rounded-2xl font-medium cursor-pointer' type="submit">Login</button>

      </form>
    </div>
  )
}

export default Login
