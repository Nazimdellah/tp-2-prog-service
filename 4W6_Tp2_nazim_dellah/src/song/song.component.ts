import { Album } from './../models/Album';

import { Artist } from './../models/Artist';
import { Song } from './../models/Song';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class SongComponent implements OnInit {
  Artist: Artist | null = null;
  nomAlbum: string | null = null;
  nomArtist: string | null = null;
  listSong: Song[] = [];
Album: Album | null = null;


  constructor(public route: ActivatedRoute, public spotify: SpotifyService) { }

  async ngOnInit() {
    if (this.nomAlbum != null) {

      this.nomAlbum = this.route.snapshot.paramMap.get('album');
    }
  }





    async Start(Album: Album) {
      if (Album!= null  ) {

        this.listSong = await this.spotify.getSongs(Album);
        console.log(this.listSong);
      }

    }

}
