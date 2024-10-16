import { Show } from './../models/show';
import { Artist } from './../models/Artist';
import { BandsInTownService } from '../services/bands-in-town.service';

import { routes } from './../app/app.routes';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Album } from '../models/Album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule]


})
export class AlbumComponent  {
  nomArtist: string|null = null
 Album:Album|null = null
  list : Album[] = [];
  jsonData:string|null = null
  Artist:Artist|null = null

  constructor(public route : ActivatedRoute,public spotify: SpotifyService,public Show:BandsInTownService) {

   }

   async ngOnInit() {
    this.nomArtist = this.route.snapshot.paramMap.get('artiste');
    if(this.nomArtist != null){
      this.Artist = await this.spotify.searchArtist(this.nomArtist);
      this.list = await this.spotify.getAlbums(this.Artist);
      console.log(this.list);
    }



}}
