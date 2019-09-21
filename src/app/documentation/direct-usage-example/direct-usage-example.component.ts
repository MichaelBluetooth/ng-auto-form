import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-direct-usage-example',
  templateUrl: './direct-usage-example.component.html',
  styleUrls: ['./direct-usage-example.component.css']
})
export class DirectUsageExampleComponent implements OnInit {

  myForm: FormGroup;
  myModelData: any = {};

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      textField: new FormControl(null, Validators.required),
      multiListField: new FormControl(['one', 'three']),
      myFormSubGroup: this.formBuilder.group({
        dateField: new FormControl(new Date()),
        numberField: new FormControl(null),
        listField: new FormControl('two', Validators.required),
      })
    });
  }

}
