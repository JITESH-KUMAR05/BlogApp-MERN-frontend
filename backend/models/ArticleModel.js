import {Schema,model} from "mongoose"

// user comment schema
const userCommentSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:"user",
    },
    comment:{
        type:String,
        required:[true,"please add some comment"]
    }
})

// article Schema
const articleSchema = new Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref: "user",
        required:[true,"AuthorId is required"]
    },
    title:{
        type:String,
        required:[true,"title is required"]
    },
    category:{
        type:String,
        enum:["programming","DSA","AI/ML","WebDev"],
        required:[true,"category is required"]
    },
    content:{
        type:String,
        required:[true,"content is required"],
    },
    comments:[userCommentSchema],
    isArticleActive:{
        type:Boolean,
        default:true
    }
},{
    strict:"throw",
    versionKey:false,
    timestamps:true
})

// model
export const ArticleModel = model("article",articleSchema);