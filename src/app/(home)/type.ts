type Images = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
  maximum_image_url?: string;
};
type Titles = Array<{
  type: string;
  title: string;
}>;
type Contacts = Array<{
  mal_id: number;
  type: string;
  name: string;
  url: string;
}>;
type Relations = Array<{
  relation: string;
  entry: Contacts;
}>;
type ExternalLinks = Array<{
  name: string;
  url: string;
}>;
export type AnimeFull = {
  mal_id: number;
  url: string;
  images: {
    jpg: Images;
    webp: Images;
  };
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: Images;
  };
  approved: boolean;
  titles: Titles;
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: {
    from: string;
    to: string;
    prop: {
      from: {
        day: number;
        month: number;
        year: number;
      };
      to: {
        day: number;
        month: number;
        year: number;
      };
    };
    string: string;
  };
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
  producers: Contacts;
  licensors: Contacts;
  studios: Contacts;
  genres: Contacts;
  explicit_genres: Contacts;
  themes: Contacts;
  demographics: Contacts;
  relations: Relations;
  theme: {
    openings: string[];
    endings: string[];
  };
  external: ExternalLinks;
  streaming: ExternalLinks;
};
