import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { Show } from '../models/show';
import { HttpClient } from '@angular/common/http';
import { BandsInTownService } from '../services/bands-in-town.service';


@Component({
  selector: 'app-show',
  standalone: true,
  imports: [FormsModule, RouterModule, RouterOutlet, CommonModule],
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  artistName: string | null = null

  shows: Show[] = []

  constructor(public route: ActivatedRoute, public http: HttpClient, private bandsInTownService: BandsInTownService) { }

  ngOnInit() {
    this.artistName = this.route.snapshot.paramMap.get("artistName")
    if (this.artistName) {
      this.getShows(this.artistName);
    }


  }
  async getShows(artistName: string): Promise<void> {
    try {
      this.shows = await this.bandsInTownService.getShow(artistName);
      if (this.shows.length == 0) {
        console.log('No events found for this artist.');
      }
      else {
        console.log('Events found for this artist:', this.shows);
      }
    }
    catch (error) {
      console.error('An error occurred while trying to get events for this artist:', error);
    }
  }
}


