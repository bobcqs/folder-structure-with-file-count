import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/"
});

export const getCars = async()=>{
    try {
        const res = await axiosInstance("https://dev21.becollective.com/api/v2/coding-challenges/dirs");
        return res
    } catch (err) {
        console.log(err);
    }
}





