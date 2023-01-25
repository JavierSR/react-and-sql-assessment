import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

const request = async (args) => {
    return new Promise((resolve, reject) => {
        const axiosConfig = {
            method: args.method || 'GET',
            url: `${API_URL}/api/${args.route}`,
            data: args.data,
            headers: {
                ...args.headers,
                'Content-Type': args.contentType || 'application/json',
            }
        }

        axios(axiosConfig).then((response) => {
            resolve(response.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export default request