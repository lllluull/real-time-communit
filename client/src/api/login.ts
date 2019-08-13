import request from '../utils/request'

interface LoginParams {
    user: string,
    password: string
} 



export const login = (params: LoginParams) => request.post('/login', params)





