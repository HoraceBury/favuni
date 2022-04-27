import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Favourites } from 'src/app/shared/favourite.actions';
import { Results } from 'src/app/shared/results.actions';
import { FavouritesState } from 'src/app/shared/state';
import { University } from 'src/app/shared/university.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Select(FavouritesState.getFavourites) favourites$: Observable<University[]>;
  @Select(FavouritesState.getSearchResults) searchResults$: Observable<University[]>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  changeCheckbox(ev: University) {
    if (ev.isFavourite) {
      this.store.dispatch(new Favourites.Add(ev));
    }
    else
    {
      this.store.dispatch(new Favourites.Remove(ev));
    }
  }

  ngOnDestroy() {
  }
}
