import axios from "axios";
const request = axios.create( {
    baseURL: 'https://conduit.productionready.io'
} )
export const get = ( url, params ) => {
    return new Promise( ( resolve, reject ) => {
        request( {
            method: 'GET',
            url,
            params
        } ).then( ( res ) => {
            resolve( res.data )
        } ).catch( ( e ) => reject( e ) )
    } )
}
export const post = ( url, data ) => {
    return new Promise( ( resolve, reject ) => {
        request.post( url, data ).then( ( res ) => { resolve( res.data ) } ).catch( ( error ) => reject( error ) )
    } )
}
export const deleteMethod = ( url, data ) => {
    return new Promise( ( resolve, reject ) => {
        request.delete(url,data).then((res)=>resolve(res.data)).catch((e)=>reject(e))
    } )
}
export const put = ( url, data ) => {
    return new Promise( ( resolve, reject ) => {
        request.put( url, data ).then( ( res ) => { resolve( res.data ) } ).catch( ( error ) => reject( error ) )
    } )
}
export default ({store})=>{
    request.interceptors.request.use(function (config){
        const { user } = store.state
        if (user && user.token) {
            config.headers.Authorization = `Token ${user.token}`
        }
        return config
    })
}
