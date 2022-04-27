import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FavouritesState } from '../shared/state';
import { University } from '../shared/university.model';
import { UniversityService } from '../shared/university.service';
import { Results } from '../shared/results.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Select(FavouritesState.getFavourites) favourites$: Observable<University[]>;
  @Select(FavouritesState.getSearchResults) searchResults$: Observable<University[]>;

  favs: University[];

  constructor(private http: HttpClient, private universityService: UniversityService, private store: Store) {
  }

  ngOnInit(): void {
    this.searchResults$.subscribe(res => {
      this.favs = res;
    })
  }

  doPost(postData: { country: string; name: string }): void {
    this.universityService.getUniversities(postData.country, postData.name)
    .subscribe(unis => {
      // unis.forEach(element => {
      //   var result = this.favs.filter(obj => {
      //     return obj.b === 6
      //   })
      //   element.isFavourite = this.favs.find()
      // });
      this.store.dispatch(new Results.Found(unis));
    });
  }
}
