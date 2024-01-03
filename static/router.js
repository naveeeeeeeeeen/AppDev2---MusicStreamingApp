
import home from './components/home.js'
import login from './components/login.js'
import admin_login from './components/admin_login.js'
import user_register from './components/user_register.js'
import admin_dashboard from './components/admin_dashboard.js'
import user_dashboard from './components/user_dashboard.js'
import artist_dashboard from './components/artist_dashboard.js'
import play from './components/play.js'
import manage_albums from './components/manage_albums.js'
import manage_songs from './components/manage_songs.js'




const routes = [
    {path: '/', component: home}, 
    {path: '/login', component: login, name: 'login'},
    {path: '/admin_login', component: admin_login},
    {path: '/user_register', component: user_register},
    {path: '/admin_dashboard', component: admin_dashboard},
    {path: '/user_dashboard', component: user_dashboard},
    {path: '/artist_dashboard', component: artist_dashboard},
    {path: '/play', component: play},
    {path: '/api/manage_albums', component: manage_albums},
    {path: '/api/manage_songs', component: manage_songs},
]


export default new VueRouter({
    routes,
}) 