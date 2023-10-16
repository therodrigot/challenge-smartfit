import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {

  readonly apiUrl = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json";

  constructor(private httpClient: HttpClient) { }

  getAllUnits() {
    return this.httpClient.get(this.apiUrl);
  }
}
