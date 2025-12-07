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
}
