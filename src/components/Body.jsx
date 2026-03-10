
import { Link } from 'react-router-dom'
const Body = () => {

  return (
    <div className='p-3 flex justify-center items-center h-screen'>
      <div className='bg-green-100 p-2 rounded-md w-1/4 text-center flex flex-col items-center rounded-xl'>
        <div className='p-2'>
          <p>get it</p>
        </div>
        <div className='p-2 bg-[#F4C12A] text-white w-1/2'>
          <Link to="/login">Get the Offers</Link>
        </div>
      </div>
    </div>

  )
}

export default Body
