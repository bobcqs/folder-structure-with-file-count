import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "https://dev21.becollective.com/api/v2/coding-challenges/dirs"
});

export const getCars = async()=>{
    try {
        const res = await axiosInstance();
        return res
    } catch (err) {
        console.log(err);
    }
}





