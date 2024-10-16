export class Show {
  id: string;
  artist_id: string;
  url: string;
  on_sale_datetime: string;
  datetime: string;
  description?: string;
  venue: VenueData;
  offers: any[];
  lineup: string[];

  constructor(
    id: string,
    artist_id: string,
    url: string,
    on_sale_datetime: string,
    datetime: string,
    venue: VenueData,
    offers: any[],
    lineup: string[],
    description?: string
  ) {
    this.id = id;
    this.artist_id = artist_id;
    this.url = url;
    this.on_sale_datetime = on_sale_datetime;
    this.datetime = datetime;
    this.venue = venue;
    this.offers = offers;
    this.lineup = lineup;
    this.description = description;
  }
}

class VenueData {
  // Define the properties and constructor for VenueData
}
