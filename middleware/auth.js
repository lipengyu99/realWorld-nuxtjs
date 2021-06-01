/**
*  若没有登录返回登录页面
*/
export default function ( { store, redirect } ) {
    if ( !store.state.user ) {
        redirect( '/login' )
    }
}