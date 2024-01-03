
export default {
    template: 
    `<div>
        <div class="container" v-if="create_playlist_button==0">
            <div style="display: flex; justify-content: center; padding: 5px;">
                <form class="d-flex">
                    <input type="text" v-model="search_query" class="form-control" placeholder="Search" style="max-width: 100%; margin-right: 10px;">
                    <select v-model="search_type" class="form-select" style="max-width: 30%; margin-right: 10px;">
                        <option value="songs">Songs</option>
                        <option value="albums">Albums</option>
                        <option value="artists">Artists</option>
                        <option value="genres">Genre</option>
                    </select>
                    <button type="button" class="btn btn-outline-success" @click="search">Search</button>
                </form>
            </div>
    
            
            <div v-if="search_results !== null" style="margin-top: 10px;">
                <div class="text-center">
                <h4>Showing results for "{{this.search_query}}"</h4>
                </div>
                <table class="table mx-auto" style="width: 50%; max-width: 600px;">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th v-if="search_type == 'artists'">Artist</th>
                            <th v-if="search_type == 'albums'">Album</th>
                            <th v-if="search_type == 'genres'">Genre</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody v-for="result in search_results" :key="result.id">
                        <tr>
                            <td>{{result.name}}</td>
                            <td v-if="search_type == 'artists'">{{result.creator_name}}</td>
                            <td v-if="search_type == 'albums'">{{result.album_name}}</td>
                            <td v-if="search_type == 'genres'">{{result.genre}}</td>
                            <td>
                                <button type="button" class="btn btn-info" @click="play(result.id)">Play</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            

            <br>
            <div class="row justify-content-center">
                <div class="col-md-5" style="margin-top: 10px;">
                <h2>Recommended Songs</h2>
                </div>
                <div class="col-md-5 text-end ms-auto">
                    <form class="d-flex">
                        <label for="filter_type">Filter by:</label>
                        <select v-model="filter_type" class="form-select" style="max-width: 30%; margin-right: 3px;">
                            <option value="likes">Likes</option>
                            <option value="views">Views</option>
                        </select>
                        <input type="number" v-model="filter_value" class="form-control" style="max-width: 15%; margin-right: 3px;">
                        <button type="button" class="btn btn-outline-success btn-sm" @click="filtered">Apply</button>
                    </form>
                </div>
            </div>
            

            <div class="row justify-content-center">
                <div v-for="song in filtered_songs" :key="song.id" class="col-md-4 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">{{ song.name }}</h5>
                            <p class="card-text">Artist: {{ song.creator_name }}</p>
                            <p class="card-text">Likes: {{ song.likes }}</p>
                            <p class="card-text">Views: {{ song.play_count }}</p>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-info" @click="play(song.id)">Play</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        





            
          
            <div class="text-center">
            <button type="submit" class="btn btn-primary" @click="show_all_songs">Show All Songs</button>
            </div>
            <div class="container">   
                <table class="table" v-if="all_songs_button==1">
                    <thead>
                        <tr>
                            <th>Song</th>
                            <th>Artist</th>
                            <th>Album</th>
                            <th>Genre</th>
                            <th>Length</th>
                            <th>Likes</th>
                            <th>Views</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody v-for="song in all_songs" :key="song.id">
                        <tr>
                            <td>{{song.name}}</td>
                            <td>{{song.creator_name}}</td>
                            <td>{{song.album_name}}</td>
                            <td>{{song.genre}}</td>
                            <td>{{song.duration}}</td>
                            <td>{{song.likes}}</td>
                            <td>{{song.play_count}}</td>
                            <td>
                            <button type="button" class="btn btn-info" @click="play(song.id)">Play</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            


            <br>

            <div class="text-center">
            <button type="button" class="btn btn-link" @click="create_playlist()">Create a Playlist</button>
            <button type="button" class="btn btn-link" @click="show_playlists()">Show My Playlists</button>
            </div>

            <div>
                <table class="table mx-auto" style="width: 50%; max-width: 600px;" v-if="playlists.length !== 0">
                    <thead>
                        <tr>
                            <th>Playlist Name</th>
                            <th>Songs</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody v-for="playlist in playlists" :key="playlist.id">
                        <tr>
                            <td>{{playlist.name}}</td>
                            <td>{{playlist.songs.length}}</td>
                            <td>
                            <button type="button" class="btn btn-link" @click="delete_playlist(playlist.id)">Delete</button>
                            <button type="button" class="btn btn-link" @click="open_playlist(playlist.id)">Show</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="opened_playlist_button==1">
                <div class="text-center">
                <h2>Playlist: {{opened_playlist[0].name}}</h2>
                </div>
                <table class="table mx-auto" style="width: 50%; max-width: 600px;">
                    <thead>
                        <tr>
                            <th>Song</th>
                            <th>Artist</th>
                            <th>Likes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody v-for="song in opened_playlist[0].songs" :key="song.id">
                        <tr>
                            <td>{{song.name}}</td>
                            <td>{{song.creator_name}}</td>
                            <td>{{song.likes}}</td>
                            <td>
                            <button type="button" class="btn btn-info" @click="play(song.id)">Play</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="create_playlist_button == 1" style="margin-top: 20px;">
            <div class="text-center">
            <label for="playlist_name" class="form-label"><h4><b>Playlist Name:</b></h4>
                <input v-model="playlistName" type="text" name="playlist_name" id="playlist_name" class="form-control" style="width: 300px;" required>
            </label>
            </div>

            <div class="text-center">
                <table class="table mx-auto" style="width: 50%; max-width: 600px;">
                    <thead>
                        <tr>
                            <th style="text-align: left;">Select Songs</th>
                        </tr>
                    </thead>
                    <tbody v-for="(song, index) in all_songs" :key="index">
                        <tr>
                            <td style="text-align: left;">{{ song.name }}</td>
                            <td style="text-align: left;">
                                <input type="checkbox" v-model="selectedSongs" :value="song.id" style="transform: scale(2.5); margin-left: 5px;">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="text-center">
                <button type="button" class="btn btn-primary" @click="createPlaylist" style="margin-right: 10px;">Done</button>
                <button type="button" class="btn btn-secondary" @click="back">Back</button>
            </div>
        </div>

    </div>`,

    data() {
        return {
            token: localStorage.getItem('auth_token'),
            role: localStorage.getItem('role'),
            all_songs: [],
            all_songs_button: 0,

            
            playlists: [],
            opened_playlist: [],
            opened_playlist_button: 0,

            search_type: 'songs',
            search_query: null,
            search_results: null,

            filter_type: 'likes',
            filter_value: 8,
            filtered_songs: null,

            playlistName: '',
            selectedSongs: [],
            create_playlist_button: 0,

        }
    },
    async mounted() {
       await this.get_all_songs()
       await this.filtered();
    },

    methods:{

        async get_all_songs(){
            const response = await fetch('/get_all_songs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token,
                },
            })
            if (response.status == 200) {
                const response_data = await response.json();
                this.all_songs = response_data.songs
                // console.log(this.all_songs)
            }
            else {
                const error = await response.json();
                alert(error.message);
            }

        },

        show_all_songs(){
            if (this.all_songs_button==0){
                this.all_songs_button=1   
            }
            else{
                this.all_songs_button=0
            }
        },

        filtered(){
            if (this.filter_value==null){
                alert('Please enter a value')
            }
            if (this.filter_type=='likes'){
                this.filtered_songs = this.all_songs.filter(song => song.likes >= this.filter_value);
            }
            else if (this.filter_type=='views'){
                this.filtered_songs = this.all_songs.filter(song => song.play_count >= this.filter_value);
            }
            // console.log(this.filtered_songs)
        },


        async show_playlists(){
            const response = await fetch('/show_playlists', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token,   
                },
            })
            if (response.status == 200) {
                const response_data = await response.json();
                this.playlists = response_data.playlists
                // console.log(this.playlists)
                // this.show_playlists_button=1
            }
            else {
                const error = await response.json();
                alert(error.message);
            }
        },

        create_playlist(){
            if (this.create_playlist_button==0){
                this.playlistName=''
                this.selectedSongs=[]
                this.create_playlist_button=1
            }
            else{
                this.create_playlist_button=0
            }
        },

        back(){
            this.create_playlist_button=0
        },


        async createPlaylist(){ 
            const response = await fetch('/create_playlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token,
                },
                body: JSON.stringify({
                    name: this.playlistName,
                    songs: this.selectedSongs
                })
            })
            // console.log(this.playlistName)
            // console.log(this.selectedSongs)
            if (response.status == 200) {
                const response_data = await response.json();
                this.create_playlist_button=0
                this.$router.push('/user_dashboard')
                alert(response_data.message);
            }
            else {
                const error = await response.json();
                alert(error.message);
            }
        },

        async delete_playlist(playlist_id){
            const confirm_delete = window.confirm("Are you sure you want to delete this playlist?")
            if (confirm_delete == true){
                const response = await fetch(`/delete_playlist/${playlist_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication-Token': this.token,
                    },
                })
                if (response.status == 200) {
                    const response_data = await response.json();
                    this.show_playlists_button=0
                    this.opened_playlist_button=0
                    this.$router.push('/user_dashboard')
                    alert(response_data.message);
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


        async open_playlist(playlist_id){ 
            const response = await fetch(`/open_playlist/${playlist_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token,
                },
            })
            if (response.status == 200) {
                const response_data = await response.json();
                this.opened_playlist = response_data.playlist
                // console.log(this.opened_playlist)
                this.opened_playlist_button=1
            }
            else {
                const error = await response.json();
                alert(error.message);
            }
        },

        async play(song_id){
            const response = await fetch(`/play/${song_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token,
                },
            })
            if (response.status == 200) {
                const response_data = await response.json();
                // console.log(response_data)
                this.$router.push({path:'/play', query: {song: response_data.song}})
            }
            else {
                const error = await response.json();
                alert(error.message);
            }
        },
        
        search() {
            // console.log('Search Query:', this.search_query);
            // console.log('All Songs:', this.all_songs);

            if (this.search_query == null) {
                alert('Please enter a search query');
            }
            else if (this.search_type == 'songs') {
                this.search_results = this.all_songs.filter(song => song.name.toLowerCase().includes(this.search_query.toLowerCase()));
                // console.log('searching song')
            }
            else if (this.search_type == 'albums') {
                this.search_results = this.all_songs.filter(song => song.album_name.toLowerCase().includes(this.search_query.toLowerCase()));
                // console.log('searching album')
            }
            else if (this.search_type == 'artists') {
                this.search_results = this.all_songs.filter(song => song.creator_name.toLowerCase().includes(this.search_query.toLowerCase()));
                // console.log('searching artist')
            }
            else if (this.search_type == 'genres') {
                this.search_results = this.all_songs.filter(song => song.genre.toLowerCase().includes(this.search_query.toLowerCase()));
                // console.log('searching genre')
            }
            else {
                alert('Please select a search type');
            }


            if (this.search_results.length == 0) {
                alert('No results found');
                this.search_results = null;
                this.search_query = null;
                this.search_type = 'songs';
            }
            
        },
        
    },  

}

