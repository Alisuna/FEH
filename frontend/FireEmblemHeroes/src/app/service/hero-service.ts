import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Hero } from '../models/hero';
import { HeroType } from '../models/heroType';

@Injectable()
export class HeroService {

  private baseUrl = '/api/heroes'

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.baseUrl);
  }

  updateHero(hero: Hero): Observable<Hero> {
    const url = `${this.baseUrl}/${hero.id}`;
    return this.http.put<Hero>(url, hero);
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.baseUrl, hero);
  }
}
