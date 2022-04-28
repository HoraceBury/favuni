import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { FavouritesState } from '../shared/state';
import { University } from '../shared/university.model';
import { UniversityService } from '../shared/university.service';
import { Results } from '../shared/results.actions';
import { takeUntil } from 'rxjs/operators';
import { Search } from '../shared/search.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Select(FavouritesState.getFavourites) favourites$: Observable<University[]>;
  @Select(FavouritesState.getSearchResults) searchResults$: Observable<University[]>;
  @Select(FavouritesState.getCountry) country$: Observable<string>;
  @Select(FavouritesState.getSchoolName) schoolName$: Observable<string>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  favs: University[];
  country: string = '';
  schoolName: string = '';

  constructor(private http: HttpClient, private universityService: UniversityService, private store: Store) {
  }

  ngOnInit(): void {
    this.favourites$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.favs = res;
    });

    oneTimeListeners();

    function oneTimeListeners() {
      this.country$.subscribe((c: string) => {
        this.country = c;
      }).unsubscribe();

      this.schoolName$.subscribe((s: string) => {
        this.schoolName = s;
      }).unsubscribe();
    }
  }

  autoChange(field: string, $event: string): void {
    switch (field) { 
      case 'country': { 
        this.country = $event;
        this.store.dispatch(new Search.Country(this.country));
        break; 
      } 
      case 'name': { 
        this.schoolName = $event;
        this.store.dispatch(new Search.SchoolName(this.schoolName));
        break; 
      }
    } 
    this.doAutoPost();
  }

  private doAutoPost(): void {
    if (!this.isLoading && this.country && this.country !== '' && this.schoolName && this.schoolName !== '') {
      this.doPost( { country: this.country, name: this.schoolName } );
    }
    else{
      // console.log('not searching');
    }
  }

  isLoading: boolean = false;
  loader: Subscription;

  doPost(postData: { country: string; name: string }): void {
    this.isLoading = true;

    if (this.loader) {
      this.loader.unsubscribe();
      console.log('unsubscribed');
    }

    if (!this.country && !this.schoolName) {
      return;
    }

    console.log('loading...');

    this.loader = this.universityService
      .getUniversities(postData.country, postData.name)
      .pipe(takeUntil(this.destroy$))
      .subscribe(unis => {
        unis.forEach(uni => {
          const filtered = this.favs.filter(f => f.name === uni.name && f.country === uni.country && f.alpha_two_code === uni.alpha_two_code);
          uni.isFavourite = filtered.length > 0;
        })

        this.store.dispatch(new Results.Found(unis));
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    console.log('destroy');
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
