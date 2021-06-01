export default {
    router: {
        linkActiveClass: 'active',
        extendRoutes( routes, resolve ) {
            routes.splice( 0 )
            routes.push(
                {
                    path: '',
                    component: resolve( __dirname, 'pages/default.vue' ),
                    children:[
                        {
                            name:'home',
                            path:'/',
                            component:resolve(__dirname,'pages/index.vue')
                        },
                        {
                            name: 'login',
                            path: '/login',
                            component: resolve( __dirname, 'pages/login/index.vue' )
                        },
                        {
                            name: 'register',
                            path: '/register',
                            component: resolve( __dirname, 'pages/login/index.vue' )
                        },
                        {
                            name: 'settings',
                            path: '/settings',
                            component: resolve( __dirname, 'pages/settings/index.vue' )
                        },
                        {
                            name: 'editor',
                            path: '/editor',
                            component: resolve( __dirname, 'pages/editor/index.vue' )
                        },
                        {
                            name: 'editor',
                            path: '/editor/:slug',
                            component: resolve( __dirname, 'pages/editor/index.vue' )
                        },
                        {
                            name: 'profile',
                            path: '/profile/:username',
                            component: resolve( __dirname, 'pages/profile/index.vue' )
                        },
                        {
                            name: 'article',
                            path: '/article/:slug',
                            component: resolve( __dirname, 'pages/article/index.vue' )
                        },
                    ]
                }
            )
        }
    },
    server:{
        host:'0.0.0.0',
        port:3000
    },
    plugins:[
        './plugins/request.js',
        './plugins/dayjs.js'
    ]
}