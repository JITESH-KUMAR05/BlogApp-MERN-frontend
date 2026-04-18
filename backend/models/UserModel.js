import {Schema,model} from "mongoose"
import validator from 'validator';

const userSchema = new Schema({
    firstName:{
        type:String,
        minLength:[3,"minimum length is 3"],
        required:[true,"firstName is required"]
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email should be unique"],
        validate:{
            validator:(value) => validator.isEmail(value),
            message:"Invalid Email format"
        }
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minLength:[6,"minimum length should be 6"],
        validate:{
            validator:function(v){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(v)
            },
            message:"Password must contain uppercase, lowercase and number"
        }
    },
    profileImageUrl:{
        type:String,
        
    },
    role:{
        type:String,
        enum:["AUTHOR","USER","ADMIN"],
        required:[true,"{Value} is invalid Role"]
    },
    isActive:{
        type:Boolean,
        default:true
    }

},{
    strict:"throw",
    versionKey:false,
    timestamps:true
})

// creating the model
export const UserModel = model("user",userSchema);