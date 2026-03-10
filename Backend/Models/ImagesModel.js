import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        beforeImage:String,
        afterImage:String,
        status:{
            type:String,
            default:"pending"
        },
        createdAt:{
            type:Date,
            default:Date.now()
        }
})

export default mongoose.model("ImageSchema",ImageSchema);
