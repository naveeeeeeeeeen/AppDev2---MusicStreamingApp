export default {
    template: 
    `<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #cfe6f6;">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarScroll" v-if="!is_logged_in">
                <h3 class="navbar-brand" >HOME</h3>
                <ul class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
                    <li class="nav-item">
                        <button class="nav-link" @click='admin_login'>Admin</button>
                    </li>
                </ul>
            </div>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarScroll" v-if="is_logged_in">
                <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px; ">
                    <li class="nav-item">
                        <button class="nav-link" @click='dashboard'>Dashboard</button>
                    </li>
                    <li class="nav-item" v-if="this.role.includes('user')">
                        <button class="nav-link" @click='artist_account'>Artist Account</button>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
                    <li class="nav-item">
                        <button class="nav-link" @click='logout'>Logout</button>
                    </li>
                </ul>    
            </div>
        </div>
    </nav>`,
    data() {
        return{
            role: localStorage.getItem('role'),
            token: localStorage.getItem('auth_token'),
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('role');
            localStorage.removeItem('songs');
            this.$router.push('/');
        },
        dashboard() {
            if (this.role.includes('admin')) {
                this.$router.push('/admin_dashboard')
            }
            else if (this.role.includes('user')) {
                this.$router.push('/user_dashboard')
            }
            else {
                console.log('role not found')
            }
            // console.log("dashboard clicked")
        },
        artist_account() {
            if (this.role.includes('user')) {
                this.$router.push('/artist_dashboard')
            }
            // console.log("artist_account clicked")
        },
        admin_login(){
            this.$router.push('/admin_login')
        },

    },
    computed: {
        is_logged_in() {
            return localStorage.getItem('auth_token') !== null;
        }
    }
}