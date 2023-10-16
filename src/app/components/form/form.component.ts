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
  formGroup!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private unitService: GetUnitsService) {

  }

  ngOnInit(): void {
    this.unitService.getAllUnits().subscribe(data=>console.log(data));

    this.formGroup = this.formBuilder.group({
      periodo: '',
      showClosed: false,
    });
  }

  onSubmit(): void {
    console.log("submit", this.formGroup.value);
  }

  onClean(): void {
    console.log('clean');
    this.formGroup.reset();
  }
}
