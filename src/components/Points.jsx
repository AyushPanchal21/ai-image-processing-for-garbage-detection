import { useEffect, useState } from "react"
import pointsapi from '../apis/pointsapi.js'


const Points = ({ id, result }) => {
  const [points, setPoints] = useState()
  useEffect(() => {
    const fetchPoints = async () => {
      const res = await pointsapi(id, result);
      // console.log(res); // undefined
      if (res) {
        setPoints(res.updatedPoints);
      }
    };

    fetchPoints();
  }, [id,result]);

  return (
    <>
      <div className='flex'>
        {/* <i className="bi bi-plus"></i> */}
        <div>{points}</div>
      </div>
    </>
  )
}

export default Points