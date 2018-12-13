import { Injectable } from '@angular/core';

let queries = new Map<string, any>();

queries.set('getAll', {displayName: 'Select all', query: 'GET test/_search'});
queries.set('get50', {displayName: 'Select 50', query: 'GET test/_search?size=50'});
queries.set('get100', {displayName: 'Select 100', query: 'GET test/_search?size=100'});

@Injectable({
  providedIn: 'root'
})

export class TemplateQueriesService {

  constructor() { }

  getQuery(queryKey: string): any {
    if(queries.has(queryKey))
      return queries.get(queryKey);
    return null;
  }

  getQueries(): Map<string, any>{
    return queries;
  }
}
