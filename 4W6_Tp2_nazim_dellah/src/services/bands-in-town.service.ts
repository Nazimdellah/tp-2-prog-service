import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Artist } from '../models/Artist';
import { Album } from '../models/Album';
import { Song } from '../models/Song'; // Import Song class
import { Show } from '../models/show';

const key: string = "2b32475766802ac01eefda45e9e42ea0";
@Injectable({
  providedIn: 'root'

})
export class BandsInTownService {




  constructor(public http: HttpClient) { }

  async ngOnInit() {

  }
  async getShow(artist: string): Promise<Show[]> {
    const url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${key}`;
    let x = await lastValueFrom(this.http.get<any>(url));
    console.log(x); let shows: Show[] = [];
    for (let i = 0; i < x.length; i++) {
      shows.push(new Show(x[i].venue.latitude, x[i].venue.longitude, x[i].venue.country, x[i].venue.city, x[i].datetime));
    }

    return shows

  }
}
