import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class GetUnitsService {

	readonly apiUrl = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json";
	private filteredUnits = [];
	private allUnits = [];
	private allUnitsSubject: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
	private allUnits$: Observable<Location[]> = this.allUnitsSubject.asObservable();

	constructor(private httpClient: HttpClient) {
		this.httpClient.get(this.apiUrl).subscribe((data: any) => {
			this.allUnitsSubject.next(data?.locations);
			this.allUnits = data?.locations;
			this.filteredUnits = data?.locations;
		});
	}

	getAllUnits(): Observable<Array<any>> {
		return this.allUnits$;
	}

	setFilteredUnits(filteredResults: never[]) {
		this.filteredUnits = filteredResults;
	}
	getFilteredUnits() {
		return this.filteredUnits;
	}


	filterUnits(periodo: string, showClosed: boolean) {
		let filteredResults: any;
		let data = this.allUnits;

		// filter by show closed
		filteredResults = !showClosed ? data.filter((location: any) => location?.opened === true) : data;

		// filter by valid hours
		filteredResults = filteredResults.filter((location: any) => this.isInValidHours(location, periodo));

		this.setFilteredUnits(filteredResults);
		return filteredResults;
	}



	getHoursFromPeriodo(periodo: string): Object {
		switch (periodo) {
			case "manha":
				return { 'opening': 6, 'closing': 12 };
			case "tarde":
				return { 'opening': 12, 'closing': 18 };
			default:
				return { 'opening': 18, 'closing': 23 };
		}
	}

	isInValidHours(location: any, periodo: string): boolean {
		const periodoHours: any = this.getHoursFromPeriodo(periodo);

		if (!location.schedules) return true;

		let isInValidHour: Array<boolean> = [];
		location.schedules.forEach((element: any) => {
			if (element.hour != "Fechada") {
				let location_hours = element.hour.split("às").map((value: any) => parseInt(value.replace('h', ''), 10));
				isInValidHour.push(location_hours[0] <= periodoHours?.opening && location_hours[1] >= periodoHours?.closing);
			}
		});
		// console.log(location.title, isInValidHour, isInValidHour.includes(true));
		return isInValidHour.includes(true);
	}
}
