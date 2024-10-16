import { RouterModule, RouterOutlet } from '@angular/router';
import { Album } from './../models/Album';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { Artist } from '../models/Artist';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BandsInTownService } from '../services/bands-in-town.service';
@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artistName: string = "";
  artist?: Artist;
  tabArtist: Artist[] = []
  Album: Album[] = []
  constructor(public spotify: SpotifyService,public Show:BandsInTownService ) { }
  ngOnInit() {
    this.spotify.connect()
  }
  async getArtist(): Promise<void> {
    this.artist = await this.spotify.searchArtist(this.artistName);
    this.tabArtist.push(this.artist)
  }
  async viderTab() {
    this.tabArtist = []
  }

}
