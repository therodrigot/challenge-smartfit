import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {

  readonly apiUrl = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json";

  constructor(private httpClient: HttpClient) { }

  data = undefined;

  getAllUnits() {
    return this.httpClient.get(this.apiUrl);
  }

  getFilteredUnits(data: any, periodo: string, showClosed: boolean) {
    let filteredResults: any;

    if (!showClosed)
      filteredResults = data.filter((location: any) => location?.opened === true);
    else
      filteredResults = data;

    filteredResults = filteredResults.filter((location: any) => this.isInValidHours(location, periodo));

    return filteredResults;
  }



  getHoursFromPeriodo(periodo: string): Object {
    switch (periodo) {
      case "manha":
        return { 'opening': 6, 'closing': 12 };
      case "tarde":
        return { 'opening': 12, 'closing': 18 }
      default:
        return { 'opening': 18, 'closing': 23 }
    }
  }

  isInValidHours(location: any, periodo: string): boolean {
    const periodoHours: any = this.getHoursFromPeriodo(periodo);

    if (!location.schedules) return true;

    let isInValidHour: Array<boolean> = [];
    location.schedules.forEach((element: any) => {
      if (element.hour != "Fechada") {
        let location_hours = element.hour.split("às").map((value: any) => parseInt(value.replace('h', ''), 10));
        isInValidHour.push(location_hours[0] <= periodoHours?.opening && location_hours[1] >= periodoHours?.closing)
      }
    });
    // console.log(location.title, isInValidHour, isInValidHour.includes(true));

    return isInValidHour.includes(true);
  }
}
