import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { University } from './university.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  constructor(private http: HttpClient) { }

  public getUniversities = (country: string, name: string) : Observable<University[]> => this.http
    .get<University[]>(`http://universities.hipolabs.com/search?country=${country}&name=${name}`);
    // .pipe(map(this.produceUniArr));

  // private produceUniArr(respData: University[]) {
  //   const uniArr: University[] = [];
  //   respData.forEach(element => {
  //     const uni = new University(element['state-province'], element.country, element.name, element.web_pages, element.domains, element.alpha_two_code);

      // const isContains = this.favs?.filter(u => u.country === element.country && u.name === element.name).length > 0;
      // console.log(isContains);
      // uni.isFavourite = isContains;

  //     uniArr.push(uni);
  //   });
  //   return uniArr;
  // }
}
