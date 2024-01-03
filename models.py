from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin
from datetime import datetime

db = SQLAlchemy()

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key= True)
    username = db.Column(db.String, nullable= True)
    email = db.Column(db.String, unique= True, nullable= False)
    password = db.Column(db.String, unique= True, nullable= False)
    active = db.Column(db.Boolean)
    fs_uniquifier = db.Column(db.String)
    last_activity = db.Column(db.DateTime, default=datetime.utcnow)
    roles = db.relationship('Role', secondary='roles_users', backref= db.backref('users', lazy='dynamic'))
    



class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String, unique= True)
    description = db.Column(db.String)

class RolesUsers(db.Model):
    __tablename__ = 'roles_users'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
    role_id = db.Column('role_id', db.Integer, db.ForeignKey('role.id'))


class Song(db.Model):
    __tablename__ = 'song'
    id = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String, nullable= False)
    creator_name = db.Column(db.String, nullable= False)
    album_id = db.Column(db.Integer, db.ForeignKey('album.id'))
    lyrics = db.Column(db.String, nullable= True)
    genre = db.Column(db.String, nullable = False)
    duration = db.Column(db.Integer, nullable= False) #duration in seconds
    likes = db.Column(db.Integer, default= 0)
    play_count = db.Column(db.Integer, default= 0)
    flag_count = db.Column(db.Integer, default= 0)

class Album(db.Model):
    id = db.Column(db.Integer, primary_key= True)
    creator_name = db.Column(db.String, nullable= False)
    name = db.Column(db.String, nullable= False)
    year = db.Column(db.Integer, nullable= False)
    songs = db.relationship('Song', backref='album', lazy= True)


#Association table for many to many relationship between playlist and song
playlist_song_table = db.Table('playlist_song', 
    db.Column('playlist_id', db.Integer, db.ForeignKey('playlist.id'), primary_key= True), 
    db.Column('song_id', db.Integer, db.ForeignKey('song.id'), primary_key= True)
    )

class Playlist(db.Model):
    id = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String(50), nullable= False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    songs = db.relationship('Song', secondary= playlist_song_table, backref='playlist', lazy= True, primaryjoin=(id == playlist_song_table.c.playlist_id))





## Code changes asked in Viva - (make table such that users can 'favourite' some songs)
## answer:-
    
## favourite song of users
# favourite_song_table = db.Table('favourite_song', 
#     db.Column('favourite_id', db.Integer, db.ForeignKey('favourite.id'), primary_key= True), 
#     db.Column('song_id', db.Integer, db.ForeignKey('song.id'), primary_key= True)
#     )

# class Favourite(db.Model):
#     id = db.Columnn() 
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     songs = db.relationship('Song', secondary= favourite_song_table, backref='favourite', lazy= True, primaryjoin=(id == favourite_song_table.c.favourite_id))














## not useful anymore ##

# # association table for the many-to-many relationship between flagged songs and users
# flagged_song_user_table= db.Table(
#     'flagged_song_user',
#     db.Column('flagged_song_id', db.Integer, db.ForeignKey('flagged_song.id')),
#     db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
# )

# class flaggedSong(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     song_id = db.Column(db.Integer, db.ForeignKey('song.id'), unique= True, nullable=False)
#     users = db.relationship('User', secondary=flagged_song_user_table, backref='flagged_songs', lazy= True, primaryjoin=(id == flagged_song_user_table.c.flagged_song_id))
    
