import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetUnitsService } from 'src/app/services/get-units.service';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent {
	results = [];
	filteredResults = [];
	formGroup!: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private unitService: GetUnitsService
	) { }

	ngOnInit(): void {
		this.unitService.getAllUnits().subscribe((data: any) => {
			this.results = data?.locations;
		});

		this.formGroup = this.formBuilder.group({
			periodo: '',
			showClosed: false,
		});
	}

	onSubmit(): void {
		const periodo = this.formGroup.value.periodo;
		const showClosed = this.formGroup.value.showClosed
		this.filteredResults = this.unitService.getFilteredUnits(this.results, periodo, showClosed)
	}

	onClean(): void {
		console.log('clean');
		this.formGroup.reset();
	}
}
