import { useState } from "react";
import { Link ,Navigate, useNavigate} from "react-router-dom";
import Loginapi from "../apis/Loginapi.js";

const Login = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [showpass,setShowpass] = useState(false)

    const navigate = useNavigate()

    const handle = async (e) => {
        e.preventDefault();
        console.log("clicked");
        const res = await Loginapi(Email, Password);
        if(res.data.flag){
            navigate('/Account',{state:{email:res.data.Email,userId: res.data._id}})
        }       
        
    };

    return (
        <form
            onSubmit={handle}
            className="min-h-screen flex items-center justify-center bg-gray-100"
        >
            <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-[#F4C12A] text-center">
                    Login
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
                        Login
                    </button>

                    <div className="text-center">
                        <button type="button" className="text-sm hover:underline">
                            Forgot Password?
                        </button>
                    </div>

                    <div className="text-center">
                        <p>
                            Don't have an account{" "}
                            <Link to="/Signup" className="hover:underline">
                                SignUp?
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Login;
