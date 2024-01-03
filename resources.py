from flask import request
from flask_restful import Resource, Api, reqparse, marshal_with, fields
from models import db, Album, Song
from flask_security import auth_required, current_user

api= Api(prefix='/api')





## MANAGING ALBUMS ##

album_parser = reqparse.RequestParser()

album_parser.add_argument('name', type=str, required= True, help='Name is required and should be a string.')
album_parser.add_argument('year', type=int, help='Year is required and should be a number.')

album_fields = {
    'id': fields.Integer,
    'creator_name': fields.String,
    'name': fields.String,
    'year': fields.Integer
}

class Manage_album(Resource):
    @marshal_with(album_fields)
    @auth_required()
    def get(self):
        all_albums = Album.query.all()
        return all_albums
    @auth_required()
    def post(self):
        args = album_parser.parse_args()
        username= current_user.username
        args['creator_name'] = username
        new_album = Album(**args)
        db.session.add(new_album)
        db.session.commit()
        return {'message': 'Album added', 'album_id': new_album.id}
api.add_resource(Manage_album, '/manage_albums')









## MANAGING SONGS ##

song_parser = reqparse.RequestParser()

song_parser.add_argument('name', type=str, required= True, help='Name is required and should be a string.')
song_parser.add_argument('album_id', type=int, required= True, help='Album id is required and should be a number.')
song_parser.add_argument('genre', type=str, required= True, help='Genre is required and should be a string.')
song_parser.add_argument('duration', type=int, required= True, help='Duration is required and should be a number.')
song_parser.add_argument('lyrics', type=str, required= True, help='Lyrics is required and should be a string.')

song_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'creator_name': fields.String,
    'album_id': fields.Integer,
    'lyrics': fields.String,
    'genre': fields.String,
    'duration': fields.Integer,
    'likes': fields.Integer,
    'play_count': fields.Integer
}

class Manage_song(Resource):
    @marshal_with(song_fields)
    @auth_required()
    def get(self):
        all_songs = Song.query.all()
        return all_songs
    @auth_required()
    def post(self):
        
        args = song_parser.parse_args()
        username= current_user.username
        args['creator_name'] = username
        new_song = Song(**args)
        db.session.add(new_song)
        db.session.commit()

        return {'message': 'Song added', 'song_name': new_song.name}
api.add_resource(Manage_song, '/manage_songs')


