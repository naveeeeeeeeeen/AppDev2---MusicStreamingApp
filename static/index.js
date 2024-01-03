import router from './router.js';
import navbar from './components/navbar.js';

new Vue({
    el: '#app',
    components: {navbar},
    template: 
    `<div style="font-family:'Times New Roman', Times, serif"><navbar :key='has_changed'/> <router-view/></div>`,
    router,
    data: {
        has_changed: false,
    },
    watch: {
        '$route' (to, from) {
            this.has_changed = !this.has_changed;
        }
    }

});
