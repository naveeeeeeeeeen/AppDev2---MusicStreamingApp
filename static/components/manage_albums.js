export default {
    template: 
    `<div class="container" style="margin-top: 20px; align-items: center; display: flex; flex-direction: column; font-family:'Times New Roman', Times, serif">
        <h2> Enter Album Details</h2>
        <div class="mb-3 p-5 bg-light" style="margin-top: 10px">
            <label for="name" class="form-label">Album Name</label>
            <input type="text" class="form-control" id="name" v-model="album_details.name" required>
            <label for="year" class="form-label">Year</label>
            <input type="number" class="form-control" id="year" v-model="album_details.year" required>
            <br>
            <div class="text-center">
            <button type="button" class="btn btn-primary" @click="add">Add</button>
            </div>
        </div>
    </div>`,
    data() {
        return {
            album_details: {
                name: null,
                year: null
            },
            token: localStorage.getItem('auth_token'),        
        }
    },
    methods: {
        async add() {
            // console.log(this.album_details)
            if (this.album_details.name == null || this.album_details.year == null) {
                alert("Please enter all the details")
                return
            }
            else{
                const response = await fetch('/api/manage_albums', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication-Token': this.token,
                    },
                    body: JSON.stringify(this.album_details)
                })
                
                if (response.status == 200) {
                    const response_data = await response.json();
                    // console.log(response_data)
                    // console.log(response_data.album_id)
                    alert(response_data.message);
                    this.$router.push({path:'/api/manage_songs' , query: {album_id: response_data.album_id}})
                }
                else {
                    const error = await response.json();
                    // console.log(this.token)
                    alert(error.message);
                }
            }  
        },
    },
}