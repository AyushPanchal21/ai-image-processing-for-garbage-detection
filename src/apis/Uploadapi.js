import axios from "axios";

const Uploadapi = async (formdata) => {
    try {
        const res = await axios.post("http://localhost:6989/api/upload-image", formdata)
        return res.data
    } catch (err) {
        console.log(err);
    }
}

export default Uploadapi;

