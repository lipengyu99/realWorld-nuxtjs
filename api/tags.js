import { post, get } from "../plugins/request";
//首页全部内容信息
export const getAlltags = ( params ) => {
    params = params || {}
    return get( '/api/tags', params )
}
