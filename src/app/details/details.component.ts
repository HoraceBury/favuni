import { Component, Input, OnInit } from '@angular/core';
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

  @Input() allowDetails: boolean = true;

  displayItem: University;

  constructor() { }

  public doClick(item) {
    if (this.displayItem === item) {
      this.displayItem = null;
    }
    else {
      this.displayItem = item;
    }
  }

  ngOnInit(): void {
  }
}
