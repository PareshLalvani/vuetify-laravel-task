import axios from 'axios'

export const API_URL = process.env.VUE_APP_API_URL

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})    