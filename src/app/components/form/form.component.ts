import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetUnitsService } from 'src/app/services/get-units.service';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent {
	@Output() submitEvent = new EventEmitter();

	results: any[] = [];
	filteredResults: any[] = [];
	formGroup!: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private unitService: GetUnitsService
	) { }

	ngOnInit(): void {
		this.unitService.getAllUnits().subscribe(data => { this.results = data; this.filteredResults = data });

		this.formGroup = this.formBuilder.group({
			periodo: '',
			showClosed: false,
		});
	}

	onSubmit(): void {
		const periodo = this.formGroup.value.periodo;
		const showClosed = this.formGroup.value.showClosed
		if (!periodo) return;

		this.filteredResults = this.unitService.filterUnits(periodo, showClosed)
		this.submitEvent.emit();
	}

	onClean(): void {
		this.formGroup.reset();
		this.unitService.setFilteredUnits([])
		this.filteredResults = []
		this.submitEvent.emit();
	}
}
