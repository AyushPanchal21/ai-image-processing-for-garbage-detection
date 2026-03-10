import axios from "axios";

const count = async(id,result)=>{
    try{
        const res = await axios.post("http://localhost:6989/updatepoints",{
            userId:id,
            result:result
        })
        console.log(res.data);
        return res.data
    }catch(err){
        console.log(err);
    }
}

export default count;