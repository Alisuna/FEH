import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandlerFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

import { Hero } from '../models/hero';
import { HeroType } from '../models/heroType';

let heroes: Hero[] = [
  {
    id: 1,
    type: HeroType.RED,
    level: 1,
    name: 'Celica',
    hp: 40,
    atk: 36,
    spd: 42,
    def: 26,
    res: 42
  },
  {
    id: 2,
    type: HeroType.RED,
    level: 1,
    name: 'Ike',
    hp: 40,
    atk: 36,
    spd: 34,
    def: 40,
    res: 34
  },
  {
    id: 3,
    type: HeroType.RED,
    level: 1,
    name: 'Elincia',
    hp: 40,
    atk: 40,
    spd: 40,
    def: 26,
    res: 28
  }
];

export function fakeBackendInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {

  const http = inject(HttpClient);
  const { url, method, headers, body } = req;

  return handleRoute();

  function handleRoute(): Observable<any> {
    switch (true) {
      case url.endsWith('/api/heroes') && method === 'GET':
        return getHeroes();
      case /\/api\/heroes\/\d+$/.test(url) && method === 'GET':
        return getHeroById();
      case /\/api\/heroes\/\d+$/.test(url) && method === 'PUT':
        return updateHero(body);
      case url.endsWith('/api/heroes') && method === 'POST':
        return createHero(body);
      default:
        return next(req);
    }
  }

  function getHeroes(): Observable<HttpResponse<Hero[]>> {
    return ok(heroes);
  }

  function getHeroById(): Observable<HttpResponse<Hero>> {
    const id = idFromUrl();
    const hero = heroes.find(h => h.id === id);
    return ok(hero);
  }

  function updateHero(hero: Hero): Observable<HttpResponse<Hero>> {
    const index = heroes.findIndex((h: Hero) => h.id === hero.id);
    if (index !== -1) {
      heroes[index] = hero;
    }
    return ok(hero);
  }

  function createHero(hero: Hero): Observable<HttpResponse<Hero>> {
    heroes.push(hero);
    return ok(hero);
  }

  // helper functions
  function ok(body: any): Observable<HttpResponse<any>> {
    return of(new HttpResponse({ status: 200, body}))
  }

  function idFromUrl(): number {
    return parseInt(url.split('/').pop()!, 10);
  }
}
