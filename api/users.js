import { post,get } from "../plugins/request";
//登录接口
export const login = data => post( '/api/users/login', data )
//注册接口
export const register = data => post( '/api/users', data )
