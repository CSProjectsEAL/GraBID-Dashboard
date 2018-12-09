import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Authorization': 'Basic ' + btoa('admin:admin'), 'Content-Type': 'application/json' })
};

const baseUrl = 'http://192.168.0.13:9200/';

@Injectable({
  providedIn: 'root'
})
export class ElasticSearchService {

  constructor(private http: HttpClient) { }

  sendRequest(httpMethod: string, requestUrl: string, requestBody?: string): Observable<any> {
    
    httpMethod = httpMethod.trim();
    requestUrl = requestUrl.trim();

    if(requestBody)
      requestBody = requestBody.trim();

    //console.log(httpMethod + ' ' + requestUrl);
    //console.log(requestBody);

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
    return this.http.get<any>(baseUrl + requestUrl, httpOptions).pipe(
      catchError(this.handleError<any>())
    );
    
  }

  private postData(requestUrl: string, requestBody: string) {
    return this.http.post<any>(baseUrl + requestUrl, requestBody, httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }

  private putData(requestUrl: string, requestBody: string) {
    return this.http.put<any>(baseUrl + requestUrl, requestBody, httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }

  private deleteData(requestUrl: string) {
    return this.http.delete<any>(baseUrl + requestUrl, httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }

  private handleError<T>(){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(error.error as T);
    };
  }
}
