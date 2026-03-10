import axios from 'axios'
const logoutapi = async()=>{
    try{
        const res = await axios.get("http://localhost:6989/logout")
        return res;
    }catch(err){
        console.log(err);
        console.log("error while logging out");
    }
}

export default logoutapi;