import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { University } from "./university.model";
import { Results } from "./results.actions";
import { Favourites } from "./favourite.actions";
import { FavouritesStateModel } from "./favourites-state.model";
import { append, patch } from '@ngxs/store/operators';

@State<FavouritesStateModel>({
  name: 'favouritesState',
  defaults: {
    favourites: [],
    searchResults: []
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
  Remove(ctx: StateContext<FavouritesStateModel>, action: Favourites.Remove) {
    ctx.setState(patch({
      favourites: [] as University[]
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


  @Selector()
  static getFavourites(state: FavouritesStateModel) {
    return state.favourites
  }

  @Selector()
  static getSearchResults(state: FavouritesStateModel) {
    return state.searchResults
  }
}
