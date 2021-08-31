import axios from 'axios'

const baseApiUrl = axios.create({
    // baseURL: 'http://35.229.77.22'
    // baseURL: 'http://localhost:4000'
    baseURL: 'https://back.diogoalberto.com'
})

export default baseApiUrl