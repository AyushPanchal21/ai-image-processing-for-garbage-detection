import React, { useContext } from 'react'
import logoutapi from '../apis/logoutapi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../apis/Check.jsx";
import Points from './Points.jsx';

const Card = ({ email,id, result}) => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);  // ✅ inside component

  const handle = async () => {
    await logoutapi();
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <div>
      <div>
        <div className='flex justify-between mb-2'>
          photo
          <div><Points id={id} result={result}/></div>
        </div>
        <div className='flex justify-between'>
          <div className='text-blue-500'>
            {email}
          </div>
          <button
            onClick={handle}
            className='bg-yellow-500 p-1 text-white rounded-md w-1/9 text-center text-md'
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;