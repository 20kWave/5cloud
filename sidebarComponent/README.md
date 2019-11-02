# SideBar
This feature displays: the current song, related tracks, playlists that include it, albums that include it, the users' likes, and the user's reposts.

## Table of Contents
1. [API](#API)
1. [Requirements](#Requirements)
1. [Dependencies](#Dependencies)

## API
### URL
'localhost/5000/songs/:id'
Currently generates based on song id

## GET
REQUEST: `/currentSong/songs/${this.state.currentSongId}/next`
PURPOSE: switch to the next song
INPUT:
    {this.state.currentSongId}
    type: String
    example:
OUTPUT:
    {this.state.currentSongId}
    type: String

## POST
REQUEST: '/:{this.state.currentSongId}/likes/:{User_id}/'
PURPOSE: Add user to likes list on song which increases the likes count on the current song
INPUT:
    {this.state.currentSongId}
    type: String
    {User_id}
    type: String
OUTPUT:
    confirmation of post
    type: Boolian

## DELETE
REQUEST: '/:{this.state.currentSongId}/likes/:{User_id}/'
PURPOSE: Remove user from like list, decreasing likes on song
INPUT:
    {this.state.currentSongId}
    type: String
    {User_id}
    type: String
OUTPUT:
    confirmation of post
    type: Boolian
## PUT
REQUEST:'/{:User_id}/{new_username}'
PURPOSE: change username
INPUT:
    {User_id}
    type: String
OUTPUT:

## Requirements
## Installing Dependencies