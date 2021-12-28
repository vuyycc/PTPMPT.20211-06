import axios from 'axios'

let instantAxios = axios.create({
    timeout: 20000,
    baseURL: 'http://localhost:8000'
})

export const loginUser = (body) => {
    return instantAxios.post('/login',body)
}

export const signupUser = (body) => {
    return instantAxios.post('/signup',body)
}

export const getAllPlayer = () => {
    return instantAxios.get('/player/all')
}

export const updatePlayer =(body) => {
    return instantAxios.put('/player/update',body)
}

export const getPlayerById = (id) => {
    return instantAxios.get('/player/'+id)
}

export const getTop10 = () => {
    return instantAxios.get('/get-top')
}