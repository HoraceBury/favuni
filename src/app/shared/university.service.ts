import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { University } from './university.model';
import { map } from 'rxjs/operators';
import { Store, Select } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private http: HttpClient) { }

  public getUniversities = (country: string, name: string) : Observable<University[]> => this.http
    .get<University[]>(`http://universities.hipolabs.com/search?country=${country}&name=${name}`)
    .pipe(map(this.produceUniArr));

  private produceUniArr(respData: University[]) {
    const uniArr: University[] = [];
    respData.forEach(element => {
      uniArr.push(new University(element['state-province'], element.country, element.name));
    });
    return uniArr;
  }
}
