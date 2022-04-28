import { NgModule } from '@angular/core';
import { NgxsModule, State } from '@ngxs/store';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavouritesState } from './shared/state';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { SearchResultsComponent } from './search/results/results.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    DetailsComponent,
    SearchResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxsModule.forRoot([FavouritesState]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
