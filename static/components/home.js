export default {
    template: 
    `<div>
        <div class="container" style="margin-top: 20px; align-items: center; display: flex; flex-direction: column; font-family:'Times New Roman', Times, serif">
            <h1>Welcome to MusicPlay- The Music App</h1>
            <br>
            <h3>Click on <button class="btn btn-primary" @click="login">login</button> to use the app.</h3>
            <br>
            <br>
            <h5>If you are new to the app, Please click on <button class="btn btn-primary" @click="register">register</button> to regsiter yourself.</h5>
        </div>
        <footer style="position: fixed; bottom: 0; width: 100%; background-color: #f1f1f1; padding: 0; text-align: center;">
            <p>Project by - <b>Naveen Kumawat</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Roll No. - <b>21f1001711</b></p>
        </footer>
    </div>`,
    data() {
        return {
            message: 'Welcome to the Home Page'
        }
    },
    methods: {
        login() {
            this.$router.push('/login');

        },
        register() {
            this.$router.push('/user_register');
        }
    },
}