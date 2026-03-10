import React, { useState, useEffect } from 'react'
import UploadCard from './UploadCard'
import Card from './Card'
import Uploadapi from '../apis/Uploadapi'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import imagefetchapi from '../apis/Imagefetchapi'
import { Link } from 'react-router-dom'


const Account = () => {
    const [after, setAfter] = useState(null)
    const [before, setBefore] = useState(null)
    const [upload, setUpload] = useState([])
    const [result, setResult] = useState(null)
    const location = useLocation();
    const email = location.state?.email
    const id = location.state?.userId

    useEffect(() => {
        const fetchUploads = async () => {
            const res = await axios.get(`http://localhost:6989/api/uploads/${id}`);
            setUpload(res.data);
        };

        if (id) fetchUploads();
    }, [id]);


    const check = async () => {
        const urls = await imagefetchapi();
        // console.log(urls);
        const verifyRes = await axios.post("http://localhost:6989/api/verify", {
            beforeUrl: urls.beforeUrl,
            afterUrl: urls.afterUrl
        }, { withCredentials: true })

        setResult(verifyRes.data)

        // console.log(verifyRes.data);
    }


    const submit_E = async (e) => {
        e.preventDefault();

        if (!after || !before) {
            alert("upload all photos")
            return
        }

        const uploadOne = async (file, type) => {
            const formdata = new FormData()
            formdata.append("image", file);
            formdata.append("UserId", id)
            formdata.append("type", type);

            const res = await Uploadapi(formdata);
            // console.log(res);
            return res.url;
        }
        const beforeUrl = await uploadOne(before, "before");
        const afterUrl = await uploadOne(after, "after");
        // const proofUrl = await uploadOne(proof, "proof");

        await axios.post("http://localhost:6989/api/save-upload", {
            userId: id,
            beforeUrl,
            afterUrl
        })

    }
    return (
        <div className='p-3'>
            <Link className='text-2xl' to="/"><i className="bi bi-arrow-left"></i></Link>
            <div className='p-2 mb-2  shadow-xl rounded-xl'><Card email={email} id={id} result={result}/></div>
            <div className=''>

                <form onSubmit={submit_E} className=''>
                    <div>
                        <UploadCard Title="Before Image" onChange={(e) => setBefore(e.target.files[0])} />
                    </div>
                    <div>
                        <UploadCard Title="After Image" onChange={(e) => setAfter(e.target.files[0])} />
                    </div>
                    <div>
                        <UploadCard Title="Proof Image" />
                    </div>
                    <div className='w-full flex justify-center items-center p-3 gap-2'>
                        <button type="submit" className='bg-yellow-500 text-white p-1 rounded-md w-1/4 text-xl'>upload</button>
                        <button type='button' onClick={check} className='bg-yellow-500 text-white p-1 rounded-md w-1/4 text-xl'>verify</button>
                    </div>
                </form>
                <div className='shadow-xl p-3' >
                    response:
                    {result && (
                        <div>
                            <p>Before Trash: {result.before_trash}</p>
                            <p>After Trash: {result.after_trash}</p>
                            <p>Points: {result.points}</p>
                            <p>Status: {result.valid ? "Valid Cleanup" : "Not Valid"}</p>
                        </div>
                    )}
                </div>

            </div>
        </div >
    )
}

export default Account