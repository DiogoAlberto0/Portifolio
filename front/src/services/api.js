import axios from 'axios'

const baseApiUrl = axios.create({
    baseURL: 'http://localhost:4000'
})

export default baseApiUrl