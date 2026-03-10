import { Link } from 'react-router-dom'
import Points from './Points'
import { useContext } from "react";
import { AuthContext } from "../apis/Check.jsx";

const NavBar = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className='flex justify-between p-5 text-2xl bg-yellow-500'>
            <div>logo</div>

            <div className='flex gap-10'>
                {user ? (
                    <Link to="/account">
                        <button>{user}</button>
                    </Link>
                ) : (
                    <Link to="/Login">
                        <button>Login</button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default NavBar
