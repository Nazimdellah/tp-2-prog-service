import { Album } from './../models/Album';

import { Artist } from './../models/Artist';
import { Song } from './../models/Song';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CommonModule, RouterOutlet]
})
export class SongComponent implements OnInit {
  Artist: Artist | null = null;
  nomAlbum: string | null = null;
  albumId: string | null = null
  song?: Song;
  listSong: Song[] = [];
  Album: Album | null = null;


  constructor(public route: ActivatedRoute, public spotify: SpotifyService,) { }

  async ngOnInit() {


    this.nomAlbum = this.route.snapshot.paramMap.get("albumName")
    this.albumId = this.route.snapshot.paramMap.get("albumId")
    this.spotify.connect()
    this.getSong()


  }





  async getSong() {
    this.listSong = await this.spotify.getSongs(this.albumId)

  }

}
