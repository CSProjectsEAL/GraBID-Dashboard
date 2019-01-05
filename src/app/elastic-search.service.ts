import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Authorization': 'Basic ' + btoa('admin:admin'), 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ElasticSearchService {
  baseUrl = 'http://' + window.location.hostname + ':9200/';

  constructor(private http: HttpClient, private location: Location) { }

  sendRequest(httpMethod: string, requestUrl: string, requestBody?: string): Observable<any> {

    httpMethod = httpMethod.trim();
    requestUrl = requestUrl.trim();

    if (requestBody)
      requestBody = requestBody.trim();

    if (httpMethod.toUpperCase() == 'GET' && requestBody != null)
      httpMethod = 'POST';

    switch (httpMethod.toUpperCase()) {
      case 'GET':
        return this.getData(requestUrl);
      case 'POST':
        return this.postData(requestUrl, requestBody);
      case 'PUT':
        return this.putData(requestUrl, requestBody);
      case 'DELETE':
        return this.deleteData(requestUrl);
    }
  }

  private getData(requestUrl: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + requestUrl, httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }

  private postData(requestUrl: string, requestBody: string) {
    return this.http.post<any>(this.baseUrl + requestUrl, requestBody, httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }

  private putData(requestUrl: string, requestBody: string) {
    return this.http.put<any>(this.baseUrl + requestUrl, requestBody, httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }

  private deleteData(requestUrl: string) {
    return this.http.delete<any>(this.baseUrl + requestUrl, httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }

  private handleError<T>() {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(error.error as T);
    };
  }
}
