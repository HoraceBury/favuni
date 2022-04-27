import { University } from "./university.model";

export interface FavouritesStateModel {
  favourites: University[];
  searchResults: University[];

  country: string;
  schoolName: string;
}