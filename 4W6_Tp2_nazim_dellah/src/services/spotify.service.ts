import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Artist } from '../models/Artist';
import { Album } from '../models/Album';
import { Song } from '../models/Song'; // Import Song class

const CLIENT_ID: string = "330ef220cf864f509e3ccb791e610f3d";
const CLIENT_SECRET: string = "69bc53ef905e47a485aec939fa920b13";

// ███ ^^^ UTILISEZ VOTRE PROPRES DONNÉES SPOTIFY ^^^ ███

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyToken: string | null = null;
  albums: Album[] = [];
  artist?: Artist;

  constructor(public http: HttpClient) { }

  async connect(): Promise<void> {
    let body = new HttpParams().set('grant_type', 'client_credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
      })
    };
    let x = await lastValueFrom(this.http.post<any>('https://accounts.spotify.com/api/token', body.toString(), httpOptions));
    console.log(x);
    this.spotifyToken = x.access_token;
  }

  async searchArtist(artist: string): Promise<Artist> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.spotifyToken
      })
    };

    let x = await lastValueFrom(this.http.get<any>('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + artist, httpOptions));
    console.log(x);
    return new Artist(x.artists.items[0].id, x.artists.items[0].name, x.artists.items[0].images[0].url);
  }

  async getAlbums(artist: Artist): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.spotifyToken
      })
    };
    let x = await lastValueFrom(this.http.get<any>("https://api.spotify.com/v1/artists/" + artist.id + "/albums?include_groups=album,single", httpOptions));

    this.albums = [];
    console.log(x);

    for (let i = 0; i < x.items.length; i++) {
      this.albums.push(new Album(x.items[i].id, x.items[i].name, x.items[i].images[0].url));
    }
  }

  async getSongs(album: Album): Promise<Song[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.spotifyToken
      })
    };
    let x = await lastValueFrom(this.http.get<any>("https://api.spotify.com/v1/albums/" + album.id, httpOptions));
    console.log(x);

    let songs: Song[] = [];
    for (let i = 0; i < x.tracks.items.length; i++) {
      songs.push(new Song(x.tracks.items[i].id, x.tracks.items[i].name));
    }
    return songs;
  }
}
