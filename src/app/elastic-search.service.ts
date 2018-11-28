import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Authorization':'Basic ' + btoa('admin:admin')})
};

const baseUrl = 'http://10.140.72.54:9200';

@Injectable({
  providedIn: 'root'
})
export class ElasticSearchService {

  constructor(private http: HttpClient) { }

  sendRequest(httpMethod: string, requestUrl: string, requestBody: string): Observable<any>{
    switch(httpMethod.toUpperCase()){
      case 'GET': //get method
        return this.getData();
        break;
      case 'POST': //post method
        break;
        case 'PUT': //put method
        break;
      case 'DELETE': //delete method
        break;
    }
  }

  getData(): Observable<any> {
    return this.http.get<any>(baseUrl, httpOptions);
  }

  postData(){

  }

  putData(){

  }

  deleteData(){
    
  }
}
