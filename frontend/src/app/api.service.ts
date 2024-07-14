import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private backendUrl = 'http://127.0.0.1:5000/run-tests';  // Flask backend URL

  constructor(private http: HttpClient) { }

  runTests(apis: any): Observable<any> {
    return this.http.post<any>(this.backendUrl, { apis });
  }
}
