import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { University } from "./university.model";
import { Results } from "./results.actions";
import { Favourites } from "./favourite.actions";
import { FavouritesStateModel } from "./favourites-state.model";
import { append, patch, removeItem } from '@ngxs/store/operators';
import { Search } from "./search.actions";

@State<FavouritesStateModel>({
  name: 'favouritesState',
  defaults: {
    favourites: [],
    searchResults: [],
    country: '',
    schoolName: ''
  }
})

@Injectable()
export class FavouritesState {
  @Action(Favourites.Add)
  Add(ctx: StateContext<FavouritesStateModel>, { university }: Favourites.Add) {
    ctx.setState(patch({
      favourites: append([university])
    }))
  }
  
  @Action(Favourites.Remove)
  Remove(ctx: StateContext<FavouritesStateModel>, { university }: Favourites.Remove) {
    ctx.setState(patch({
      favourites: removeItem<University>(f => f.name === university.name && f.country === university.country && f.alpha_two_code === university.alpha_two_code)
    }))
  }


  @Action(Results.Found)
  Found(ctx: StateContext<FavouritesStateModel>, { universities }: Results.Found) {
    ctx.setState(patch({
      searchResults: universities
    }))
  }
  
  @Action(Results.Clear)
  Clear(ctx: StateContext<FavouritesStateModel>) {
    ctx.setState(patch({
      searchResults: [] as University[]
    }))
  }


  @Action(Search.Country)
  Country(ctx: StateContext<FavouritesStateModel>, { country }: Search.Country) {
    console.log('action: ', country);
    ctx.setState(patch({
      country: country
    }))
  }

  @Action(Search.SchoolName)
  SchoolName(ctx: StateContext<FavouritesStateModel>, { schoolName }: Search.SchoolName) {
    ctx.setState(patch({
      schoolName: schoolName
    }))
  }


  @Selector()
  static getFavourites(state: FavouritesStateModel) {
    return state.favourites
  }

  @Selector()
  static getSearchResults(state: FavouritesStateModel) {
    return state.searchResults
  }

  @Selector()
  static getCountry(state: FavouritesStateModel) {
    return state.country
  }

  @Selector()
  static getSchoolName(state: FavouritesStateModel) {
    return state.schoolName
  }
}
