import mongoose, { mongo } from 'mongoose'
const connectDB = async()=>{
    try{
        console.log("attempting");
        await mongoose.connect(process.env.URL)
        console.log("connected to db");
    }catch(err){
        console.log(err);
        console.log("fail to error");
    }
}

export default connectDB;
