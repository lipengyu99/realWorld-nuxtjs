import { post,get,put } from "../plugins/request";
//登录接口
export const login = data => post( '/api/users/login', data )
//注册接口
export const register = data => post( '/api/users', data )
//更新设置
export const updateUser = data => put( '/api/user', data )