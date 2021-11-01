import axios from 'axios'

let instantAxios = axios.create({
    timeout: 20000,
    baseURL: 'http://localhost:8797'
})

export const login = (body) => {
    return instantAxios.post('/login',body)
}

export const signup = (body) => {
    return instantAxios.post('/signup',body)
}