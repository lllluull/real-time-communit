import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:5000'
});

instance.interceptors.response.use(
    res => res.data.code === 200 ? res.data.data : Promise.reject(res.data)
)

export default instance