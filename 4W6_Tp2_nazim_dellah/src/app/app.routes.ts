import { Routes } from '@angular/router';
import { ArtistComponent } from '../artist/artist.component';
import { AlbumComponent } from '../album/album.component';
import { SongComponent } from '../song/song.component';
import { ShowComponent } from '../show/show.component';

export const routes: Routes = [
    { path: "", component: ArtistComponent },
    { path: "artist", component: ArtistComponent },
    { path: "album", component: AlbumComponent },
    { path: "song", component: SongComponent },
    { path: "show", component: ShowComponent },
    { path: "album/:artiste", component: AlbumComponent },
    { path: "show/:artistName", component: ShowComponent },
    { path: "song/:albumName/:albumId", component: SongComponent }

];
