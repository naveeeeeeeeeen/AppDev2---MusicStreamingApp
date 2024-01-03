export default {
    template: 
    `<div class="container" style="margin-top: 20px; align-items: center; display: flex; flex-direction: column; font-family:'Times New Roman', Times, serif">
        <h2> Please Login</h2>
        <div class="mb-3 p-5 bg-light" style="margin-top: 10px">
            <label for="user_email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="user_email" placeholder="name@example.com" v-model="login_details.email">
            <label for="user_password" class="form-label">Password</label>
            <input type="password" class="form-control" id="user_password" v-model="login_details.password">
            <br>
            <div class="text-center">
            <button type="button" class="btn btn-primary" @click="login">Login</button>
            </div>
            <br>
            <h6> 
                New User?  <button type="button" class="btn btn-link" @click="register">Register</button>
            </h6>
        </div>
        <footer style="position: fixed; bottom: 0; width: 100%; background-color: #f1f1f1; padding: 0; text-align: center;">
            <p>Project by - <b>Naveen Kumawat</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Roll No. - <b>21f1001711</b></p>
        </footer>
    </div>`,
    data() {
        return {
            login_details: {
                email: null,
                password: null
            },
        }
    },
    methods: {
        async login() {
            if (!this.isValidEmail(this.login_details.email)){
                alert("Invalid email address")
                return
            }
            else{
                // console.log(this.login_details)
                const response = await fetch('/user_login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.login_details)
                })
                
                if (response.status == 200) {
                    const response_data = await response.json();
                    // console.log(response_data)
                    localStorage.setItem('auth_token', response_data.auth_token);
                    localStorage.setItem('role', response_data.role);

                    // to check list element in javascript:- list.includes('element')
                    if (response_data.role.includes('admin')) {
                        this.$router.push('/admin_dashboard')
                    }
                    if (response_data.role.includes('user')) {
                        this.$router.push('/user_dashboard');
                    }
                }
                else {
                    const error = await response.json();
                    alert(error.message);
                }

            }
            
        },
        register(){
            this.$router.push('/user_register')
        },

        isValidEmail(email) {
            // Regular expression for basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
    },
}
