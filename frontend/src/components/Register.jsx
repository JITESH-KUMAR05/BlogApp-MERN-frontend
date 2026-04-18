import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import { loadingClass, errorClass } from "../styles/common.js";
import { useEffect } from "react";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  // const [res, setres] = useState([])
  // need to make an api call to the backend register api
  const submitHandler = async (data) => {
    setloading(true);
    console.log(data);

    // Create form data object
        const formData = new FormData();
        //get user object
        let { role, profileImageUrl, ...userObj } = data;
        // console.log(role)
        console.log(profileImageUrl[0])
        //add all fields except profileImageUrl to FormData object
        Object.keys(userObj).forEach((key) => {
        formData.append(key, userObj[key]);
        });
        // add profileImageUrl to Formdata object
        formData.append("profileImageUrl", profileImageUrl[0]);
    try {
      let { role, ...userObj } = data;
      // make req to author api
      if (role === "AUTHOR") {
        let resObj = await axios.post(
          "https://blogapp-mern-api-epmy.onrender.com/author-api/users",
          formData,
        );
        console.log("res obj is ", resObj);
        let res = resObj.data;
        console.log("res is ", res);
        if (resObj.status === 201) {
          navigate("/login");
        }
      }
      // make req to user api
      if (role === "USER") {
        let resObj = await axios.post(
          "https://blogapp-mern-api-epmy.onrender.com/user-api/users",
          formData,
        );
        console.log("res obj is ", resObj);
        let res = resObj.data;
        console.log("res is ", res);
        if (resObj.status === 201) {
          navigate("/login");
        }
      }
    } catch (err) {
      console.log(err);
      seterror(err.response?.data?.error || "Registration Failed");
    } finally {
      setloading(false);
    }
  };

//   cleanup (remove the preview image from browser memory)
useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
        }, [preview]);

  // loading
  if (loading === true) {
    return <p className={loadingClass}></p>;
  }

  // // errors
  // if(error){
  //     return <p className={errorClass}>{error.message}</p>
  // }

  return (
    <div className="p-5 w-full text-center">
      <h1 className="text-5xl mt-10 mb-6">Register</h1>
      {error && <p className={errorClass}>{error}</p>}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-gray-200  w-[80%] md:w-170 shadow rounded-2xl m-auto p-5 md:p-10 mt-10  "
      >
        <div className="flex flex-col sm:flex-row w-full m-auto gap-3 justify-center items-center">
          <h2 className="font-medium">Select Role</h2>
          <div className="">
            <input
              type="radio"
              {...register("role", { required: true })}
              value={"USER"}
              id=""
            />
            <label htmlFor="role">User</label>
          </div>
          <div>
            <input
              type="radio"
              {...register("role", { required: true })}
              name="role"
              value={"AUTHOR"}
              id=""
            />
            <label htmlFor="role">Author</label>
          </div>
        </div>
        {errors.role?.type === "required" && (
          <p className="text-red-600">Choosing role is required</p>
        )}
        <div className="mt-2 w-full m-auto flex flex-col gap-3 justify-center  md:flex-row md:gap-1">
          <input
            {...register("firstName", { required: true, minLength: 3 })}
            className="bg-gray-400 md:w-2/5 rounded-2xl p-2 md:p-2 text-center"
            type="text"
            placeholder="First Name"
          />
          <input
            {...register("lastName")}
            className="bg-gray-400 md:w-2/5 rounded-2xl p-2 md:p-2 text-center"
            type="text"
            placeholder="Last Name"
          />
        </div>
        {errors.firstName?.type === "required" && (
          <p className="text-red-600">First name is required</p>
        )}
        {errors.firstName?.type === "minLength" && (
          <p className="text-red-600">minimum length should be 3</p>
        )}
        <div className="mt-2 flex flex-col gap-2 w-full  md:w-full m-auto justify-center ">
          <input
            {...register("email", { required: true })}
            className="bg-gray-400 w-full md:w-4/5 rounded-2xl p-2 m-auto px-2 text-center"
            type="email"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-600">email is required</p>
          )}
          <input
          
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
            })}
            className="bg-gray-400 w-full md:w-4/5 rounded-2xl md:p-2 m-auto p-2 text-center"
            type="password"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600">password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600">min length of password is 6</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-600">
              Password must contain uppercase, lowercase and number
            </p>
          )}

          <input
          className="bg-gray-400 w-full md:w-4/5 rounded-2xl p-2 m-auto px-2 text-center"
            type="file"
            accept="image/png, image/jpeg"
            {...register("profileImageUrl")}
            onChange={(e) => {
              //get image file
              const file = e.target.files[0];
              // validation for image format
              if (file) {
                if (!["image/jpeg", "image/png"].includes(file.type)) {
                  seterror("Only JPG or PNG allowed");
                  return;
                }
                //validation for file size
                if (file.size > 2 * 1024 * 1024) {
                  seterror("File size must be less than 2MB");
                  return;
                }
                //Converts file → temporary browser URL(create preview URL)
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);
                seterror(null);
              }
            }}
          />

          {preview && (
                <div className="mt-3 flex justify-center">
                <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border"
                />
                </div>
            )}
        </div>

        <button
          className="bg-blue-400 px-3 py-1 mt-2 rounded-2xl font-medium cursor-pointer"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
