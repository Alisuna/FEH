import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandlerFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

import { Hero } from '../models/hero';
import { HeroType } from '../models/heroType';

const heroes: Hero[] = [
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
      id: 1,
      type: HeroType.RED,
      level: 1,
      name: 'Ike',
      hp: 40,
      atk: 36,
      spd: 42,
      def: 26,
      res: 42
    }
  ];

export function fakeBackendInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
  const { url, method, headers, body } = req;

  console.log('FAKE BACKEND INTERCEPTOR ACTIVE', url, method);
  console.log('REQUEST URL: ', url);

  return handleRoute();

  function handleRoute() {
    switch (true) {
      case url.endsWith('/api/heroes') && method === 'GET':
        return getHeroes();
      case /\/api\/heroes\/\d+$/.test(url) && method ==='GET':
        return getHeroById();
      default:
        return next(req);
    }
  }

  function getHeroes() {
    return ok(heroes);
  }

  function getHeroById() {
    const id = idFromUrl();
    const hero = heroes.find(h => h.id === id);
    return ok(hero);
  }

  // helper functions
  function ok(body: any) {
    return of(new HttpResponse({ status: 200, body}))
  }

  function idFromUrl(): number {
    return parseInt(url.split('/').pop()!, 10);
  }
}
