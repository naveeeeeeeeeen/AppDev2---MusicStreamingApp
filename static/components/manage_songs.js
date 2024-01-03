export default {
    template:
    `<div>
        <div class="text-center" style="margin-top: 20px" v-if="add_song_button==0">
            <form>
            <label for="name" class="form-label"> <b>Title</b>
                <input v-model="song_details.name" type="text" name="name" id="name" class="form-control" required>
            </label>
            <br>
            <label for="genre" class="form-label"> <b>Genre</b>
                <input v-model="song_details.genre" type="text" name="genre" id="genre" class="form-control" required>
            </label>
            <br>
            <label for="duration" class="form-label"> <b>Song length</b> (in seconds)
                <input v-model="song_details.duration" type="number" name="duration" id="duration" class="form-control" required>
            </label>
            <br>
            <label for="lyrics" class="form-label"> <b>Lyrics</b> </label>
                <textarea v-model="song_details.lyrics" name="lyrics" cols="8" rows="3" class="form-control" required></textarea>
            <br>
            <button type="button" class="btn btn-primary" @click="add">Add</button>
            </form>
        </div>

        <div class="text-center" style="margin-top: 20px" v-if="add_song_button==1">
            <label for="myfile" class="form-label"> <h3> Select a file: </h3>
                <input @change="getFile" type="file" id="myfile" name="myfile" class="form-control" required>
            </label>
            <br>
            <br>
            <button type="button" class="btn btn-primary" @click="upload_song">Upload mp3 file</button>
        </div>
    </div>
    `,
    data(){
        return {
            song_details: {
                name: null,
                genre: null,
                duration: null,
                lyrics: null,
                album_id: this.$route.query.album_id,
            },
            token: localStorage.getItem('auth_token'),
            add_song_button: 0,
            song_file: null,
            file_name: null,
        }
    },
    methods: {
        async add() {
            // console.log(this.song_details)
            if (this.song_details.name == null || this.song_details.genre == null || this.song_details.duration == null || this.song_details.lyrics == null) {
                alert("Please enter all the details")
                return
            }
            else{
                const response = await fetch('/api/manage_songs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication-Token': this.token,
                    },
                    body: JSON.stringify(this.song_details),
                })
                
                if (response.status == 200) {
                    const response_data = await response.json();
                    // console.log(response_data)
                    alert(response_data.message);
                    this.add_song_button=1
                    this.file_name = response_data.song_name
                }
                else {
                    const error = await response.json();
                    alert(error.message);
                }
            }     
        },
        
        getFile(event) {
            this.song_file = event.target.files[0];
        },

        async upload_song(){
            if (this.song_file == null) {
                alert("Please select a file")
                return
            }
            else{
                const formData = new FormData();
                formData.append('song_file', this.song_file);
                formData.append('file_name', this.file_name);
                
                const response = await fetch('/upload_song', {
                    method: 'POST',
                    headers: {
                        'Authentication-Token': this.token
                    },
                    body: formData         //to upload files we need to use formData
                })
                if (response.status == 200) {
                    const response_data = await response.json();
                    alert(response_data.message);
                    this.$router.push('/artist_dashboard');
                }
                else {
                    const error = await response.json();
                    alert(error.message);
                }
            }  
        }
    },
}