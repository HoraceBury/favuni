import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FavouritesState } from '../shared/state';
import { University } from '../shared/university.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Select(FavouritesState.getFavourites) favourites$: Observable<University[]>;
  @Select(FavouritesState.getSearchResults) searchResults$: Observable<University[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
