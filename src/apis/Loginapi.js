import axios from 'axios'
const Loginapi = async(Email,Password)=>{
    try{
        const res = await axios.post("http://localhost:6989/Login",{Email,Password},{ withCredentials: true })
        if(!res){
            console.log("there was a error while login");
        }
        return res
    }catch(err){
        console.log(err);
    }
}

export default Loginapi