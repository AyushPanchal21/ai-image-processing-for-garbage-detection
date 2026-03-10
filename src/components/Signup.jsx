import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Signupapi from "../apis/Signupapi.js";

const Signup = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [showpass,setShowpass] = useState(false)
    const navigate = useNavigate()

    const handle = async (e) => {
    e.preventDefault()
    const res = await Signupapi(Email, Password)
    console.log(res)
    if(res.flag ){
        navigate('/Login')
    }
}


    return (
        <form
            onSubmit={handle}
            className="min-h-screen flex items-center justify-center bg-gray-100"
        >
            <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-[#F4C12A] text-center">
                    Signup
                </h2>

                <div className="flex flex-col gap-4">
                    <div className="w-full px-4 py-2 border rounded-lg">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full outline-none"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="w-full px-4 py-2 border rounded-lg flex">
                        <input
                            type={showpass ? "text" : "password"}
                            placeholder="Password"
                            className="w-full outline-none"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div onClick={()=>setShowpass(!showpass)}>
                            <i className={`bi ${showpass ? "bi-eye-slash" : "bi-eye"}`}></i>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-[#F4C12A] text-white font-bold rounded-lg hover:bg-yellow-500 transition"
                    >
                        Signup
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Signup;
