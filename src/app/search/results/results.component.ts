import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
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

  favourites: University[] = [];
  searchResults: University[] = [];

  constructor() {
    // this.searchResults$.subscribe(results => {
    //   this.searchResults = results;
    //   console.log('found');
    // })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }
}
