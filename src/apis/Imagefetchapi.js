import axios from 'axios'
const imagefetchapi = async () => {
    try{
        const res = await axios.get("http://localhost:6989/check",{withCredentials:true})
        if (!res) {
            console.log("there was a error while verifying");
        }
        // console.log(res);
        return res.data
    }catch(err){
        console.log(err);
    }
}
export default imagefetchapi;