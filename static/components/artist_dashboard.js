export default {
    template: 
    `<div>
        <div v-if="this.role.includes('artist')">
            <div class="text-center" style="margin-top: 20px;">
            <h3>Welcome to Artist Dashboard</h3>
            </div>
            <div class="container" style="margin-top: 20px;">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-text">Total Uploads: {{ total_uploads }}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-text">Total Likes: {{ total_likes }}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-text">Total Albums: {{ total_albums }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>

            <div class="text-center">
                <h3>Your Uploads:</h3>
            </div>

            <table class="table mx-auto" style="width: 50%; max-width: 600px;">
                <thead v-if="my_songs.length !== 0">
                    <tr>
                        <th>Song</th>
                        <th>Album</th>
                        <th>Likes</th>
                        <th>Views</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody v-for="song in my_songs" :key="song.id">
                    <tr>    
                        <td>{{song.name}}</td>
                        <td>{{song.album_name}}</td>
                        <td>{{song.likes}}</td>
                        <td>{{song.play_count}}</td>
                        <td>
                        <button type="button" class="btn btn-link" @click="delete_upload(song.id)">Delete</button>
                        <button type="button" class="btn btn-link" @click="edit_upload(song.id)">Edit</button>
                            <div class="text-center" v-if="edit_upload_clicked[song.id]">
                                <form action="/save_changes(song.id)" enctype="multipart/form-data">
                                    <label for="title" class="form-label"> Title
                                        <input v-model="song_name" type="text" name="title" id="title" class="form-control" required>
                                    </label>
                                    <br>
                                    <label for="album" class="form-label"> Album
                                        <input v-model="album_name" type="text" name="album" id="album" class="form-control" required>
                                    </label>
                                    <br>
                                    <label for="genre" class="form-label"> Genre
                                        <input v-model="genre" type="text" name="genre" id="genre" class="form-control" required>
                                    </label>
                                    <br>
                                    <label for="year" class="form-label"> Release year
                                        <input v-model="year" type="number" name="year" id="year" class="form-control" required>
                                    </label>
                                    <br>
                                    <label for="duration" class="form-label"> Song length (in seconds)
                                        <input v-model="duration" type="number" name="duration" id="duration" class="form-control" required>
                                    </label>
                                    <br>
                                    <label for="lyrics" class="form-label"> Lyrics </label>
                                        <textarea v-model="lyrics" name="lyrics" cols="8" rows="3" class="form-control" required></textarea>
                                    <br>
                                    <button type="button" class="btn btn-success" @click="save_changes(song.id)">Save Changes</button>
                                    <button type="button" class="btn btn-secondary" @click="cancel(song.id)">Cancel</button>
                                </form>
                            </div> 
                        </td>
                        
                    </tr>
                </tbody>
            </table>

            <div class="text-center">
                <button type="button" class="btn btn-primary" @click="upload">Add to uploads</button>
            </div>
        </div>

        <div class="text-center"style="margin-top: 20px" v-else>
            <h3>Would you like to Register as an Artist</h3>
            <br>
            <div class="text-center">
                <button type="button" class="btn btn-primary" @click="register">Register</button>
            </div>
        </div>
    </div>`,
    data(){
        return{
            role: localStorage.getItem('role'),
            my_songs: [],

            total_uploads: 0,
            total_likes: 0,
            total_albums: 0,

            song_name: '',
            album_name: '',
            genre: '',
            year: 0,
            duration: 0,
            lyrics: '',
            song_file: null,
            edit_upload_clicked: {},

            token: localStorage.getItem('auth_token'),
            
        }
    },
    async mounted(){
        try{
            await this.your_uploads();}
        catch(err){
            console.log("not an artist");
        }    
    },
    
    methods: {
        async register(){
            const confirm_register = window.confirm("Are you sure you want to become an artist?")

            if (confirm_register == true){
                const response = await fetch('/artist_register', {
                    method: 'POST',
                    headers: {
                        'Authentication-Token': this.token
                    },
                })
                if (response.status == 200) {
                    const response_data = await response.json();
                    localStorage.setItem('role', response_data.role);
                    alert(response_data.message);
                    window.location.reload();
                }
                else {
                    const error = await response.json();
                    alert(error.message);
                }
            }
            else{
                return
            }
        },
        upload(){
            return this.$router.push('/api/manage_albums')
        },

        async your_uploads(){
            const response = await fetch('/your_uploads',{
                method: 'GET',
                headers: {
                    'Authentication-Token': this.token

                },
            })
            
            if (response.status == 200) {
                const response_data = await response.json();
                this.my_songs = response_data.songs
                // console.log(this.my_songs)
                this.artist_statistics();
                
            }
            else {
                const error = await response.json();
                alert(error.message);
            }
        },

        artist_statistics(){
            this.total_uploads = this.my_songs.length;
            this.total_likes = this.my_songs.reduce((a, b) => a + b.likes, 0);
            const albums_set = new Set();
            for (var i = 0; i < this.my_songs.length; i++){
                albums_set.add(this.my_songs[i].album_id);
            }
            this.total_albums = albums_set.size;
        },


        async delete_upload(song_id){
            const confirm_delete = window.confirm("Are you sure you want to delete this song?")
            
            if (confirm_delete == true){
                const response = await fetch(`/delete_upload/${song_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication-Token': this.token,
                    },
                })
                if (response.status == 200) {
                    const response_data = await response.json();
                    // this.$router.push('/user_dashboard')
                    alert(response_data.message);
                    window.location.reload();
                }
                else {
                    const error = await response.json();
                    alert(error.message);
                }
            }
            else{
                return
            }

        },
        
        edit_upload(song_id){
            this.$set(this.edit_upload_clicked, song_id, true);
            this.song_name = this.my_songs.find(song => song.id == song_id).name;
            this.album_name = this.my_songs.find(song => song.id == song_id).album_name;
            this.genre = this.my_songs.find(song => song.id == song_id).genre;
            this.year = this.my_songs.find(song => song.id == song_id).year;
            this.duration = this.my_songs.find(song => song.id == song_id).duration;
            this.lyrics = this.my_songs.find(song => song.id == song_id).lyrics;
            
        },
        cancel(song_id){
            this.$set(this.edit_upload_clicked, song_id, false);
        },

        async save_changes(song_id){
            const formData = new FormData();
            formData.append('song_name', this.song_name);
            formData.append('album_name', this.album_name);
            formData.append('genre', this.genre);
            formData.append('year', this.year);
            formData.append('duration', this.duration);
            formData.append('lyrics', this.lyrics);
            
            const response = await fetch(`/save_changes/${song_id}`, {
                method: 'POST',
                headers: {
                    'Authentication-Token': this.token
                },
                body: formData
            })
            if (response.status == 200) {
                const response_data = await response.json();
                alert(response_data.message);
                window.location.reload();
            }
            else {
                const error = await response.json();
                alert(error.message);
            }
        }
    } 
}