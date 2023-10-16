import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  results = [];
  formGroup!: FormGroup;


  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      periodo: '',
      showClosed: false,
    });
  }

  onSubmit(): void {
    console.log("submit",this.formGroup.value);
  }

  onClean(): void {
    console.log('clean');
    this.formGroup.reset();
  }
}
