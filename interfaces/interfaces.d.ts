interface Colors {
  background: string;
  text: string;
  card: string;
  border: string;
  tint: string;
}

interface UserDetails {
  uid: string;
  firstName: string;
  lastName: string;
}

interface Genre {
  id: number;
  name: string;
  image_background: string;
}

interface Platform {
  id: number;
  name: string;
  slug: string;
}

interface SortOrder {
  id: string;
  name: string;
}

interface Game {
  id: number;
  name: string;
  genres?: Genre[];
  publishers?: Publisher[];
  description_raw?: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

interface GameQuery {
  genre?: Genre;
  platform?: Platform;
  sortOrder: SortOrder;
  searchText?: string;
  page: number;
}

interface ListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface Screenshot {
  id: number;
  image: string;
  width: number;
  height: number;
}

interface Trailer {
  id: number;
  name: string;
  preview: string;
  data: { 480: string; max: string };
}
