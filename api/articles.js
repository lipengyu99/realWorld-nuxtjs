import { post, get, deleteMethod} from "../plugins/request";
//首页全部内容信息
export const getAllArticles = ( params ) => {
    params = params || {}
    return get( '/api/articles', params )
}

//获取个人feed
export const getYourArticles = ( params ) => {
    params = params || {}
    return get( '/api/articles/feed', params )
}
//添加点赞
export const addFavorite = ( slug ) => {
    return post( `/api/articles/${slug}/favorite` )
}
// deleteFavorite
export const deleteFavorite = ( slug ) => {
    return deleteMethod( `/api/articles/${slug}/favorite` )
}
//获取文章详情
export const getArticle = slug => {
    return get( `/api/articles/${slug}`)
}

// 获取文章评论
export const getComments = slug => {
    return get( `/api/articles/${slug}/comments`)
}