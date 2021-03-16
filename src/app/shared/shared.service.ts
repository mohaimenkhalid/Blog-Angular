import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public baseUrl = 'http://localhost:8000/';
  constructor() { }
}
