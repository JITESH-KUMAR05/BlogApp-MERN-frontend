// mini express app
import express from "express";
import { login } from "../services/AuthServices.js";
import { UserModel } from "../models/UserModel.js";
import { compare, hash } from "bcryptjs";
import {verifyToken} from "../middlewares/verifyToken.js"

export const commonRoute = express.Router();

// login route
commonRoute.post("/login",async(req,res)=>{
    let {email,password} = req.body;
    let {token,user} = await login(email,password);
    // console.log(token)
    // save the cookie as http only cookie
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    });
    // sending the response now
    res.status(200).json({
        message:`${user.role} Logged In Successfully!`,
        payload: user
    })
})

// logout

commonRoute.get("/logout",async(req,res)=>{
    // clear the cookies
    res.clearCookie("token",{
        secure:false,
        sameSite:"lax",
        httpOnly:true
    })
    res.status(200).json({
        message: `logout successful!`
    })
})

// change password
commonRoute.put("/change-password",async(req,res)=>{
    // get the email,oldpassword,newpassword
    let {email,oldPassword,newPassword} = req.body;
    // chack if there's a user with this email or not 
    
    let user = await UserModel.findOne({email:email});
    // console.log(user)
    if(!user){
        return res.status(401).json({
            message:"no user with this email"
        })
    }
    // compare the password
    // console.log(oldPassword)
    // console.log(user.password)
    let isMatchPassword = await compare(oldPassword,user.password)
    // console.log(isMatchPassword)
    if(!isMatchPassword){
        return res.status(401).json({
            message:"Sorry wrong password"
        })
    }
    // now the passwords are same so update the password
    newPassword = await hash(newPassword,12);
    let updatedUser = await UserModel.findOneAndUpdate(
        {email:email},
        {$set:{password:newPassword}},
        {returnDocument:"after", runValidators:true}
    )
    // send the response
    res.status(200).json({
        message:"changes the password Successfully",
        payload: updatedUser
    })
})

commonRoute.get("/check-auth", verifyToken("USER","AUTHOR","ADMIN"), (req,res) => {
    // console.log(req.user);
    res.status(200).json({
        message:"Authenticated",
        payload: req.user
    })
})