import axios from 'axios'

const Signupapi = async (Email, Password) => {
    try {
        console.log(Email, Password)
        const res = await axios.post("http://localhost:6989/Signup", { Email, Password })

        // console.log("Response from backend:", res.data)

        return res.data  
    } catch (err) {
        console.log("Error in Signupapi:", err)
        return { message: "Error" }
    }
}

export default Signupapi
