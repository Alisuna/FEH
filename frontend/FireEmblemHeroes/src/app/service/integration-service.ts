import { Injectable } from '@angular/core';
import { Request } from '../models/request';
import { Response } from '../models/response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntegrationService {

  login(request: Request): Observable<Response> {
    return this.http.post<Response>('http://localhost:8080/api/login', request);
  }

  register(request: Request): Observable<Response> {
    return this.http.post<Response>('http://localhost:8080/api/register', request);
  }

  constructor(private http: HttpClient) {}
}
