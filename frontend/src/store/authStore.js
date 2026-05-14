import {create} from "zustand"
import api from "../api/axios"


export const useAuth = create((set) => ({
    currentUser:null,
    loading:false,
    isAuthenticated:false,
    error:null,
    login: async(userCredWithRole) => {
        const {role,...userCredObj} = userCredWithRole;
        try{   
            set({loading:true,error:null})
            let res = await api.post("/common-api/login", userCredObj);
            set({
                loading:false,
                error:null,
                isAuthenticated:true,
                currentUser:res.data.payload
            })
            return {ok:true,user:res.data.payload}
        }catch(err){
            const message = err.response?.data?.error || "Login failed";
            set({
                loading:false,
                error:message,
                isAuthenticated:false,
                currentUser:null,
            })
            return {ok:false, message}
        }
    },
    logout: async()=> {
        try {
            set({loading:true,error:null})
            await api.get("/common-api/logout")
            set({currentUser:null,loading:false,isAuthenticated:false})
        } catch (err) {
            console.log(err);
            set({
                loading:false,
                error:err.response?.data?.error || "Logout failed",
                isAuthenticated:false,
                currentUser:null,
            })
        }
    },
    checkAuth : async () => {
        try {
            set({loading:true,error:null});
            let res = await api.get("/common-api/check-auth");
            set({currentUser:res.data.payload,loading:false,isAuthenticated:true})
        } catch (err) {
            set({
                loading:false,
                error: null, // Don't set error message for checkAuth to avoid UI alerts on guest access
                isAuthenticated:false,
                currentUser:null,
            })
        }
    }
}))