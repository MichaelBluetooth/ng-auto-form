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
  componentStr = 
  `
  import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
  import { Component, OnInit } from '@angular/core';
  
  @Component({
    selector: 'app-direct-usage-example',
    templateUrl: './direct-usage-example.component.html',
    styleUrls: ['./direct-usage-example.component.css']
  })
  export class DirectUsageExampleComponent implements OnInit {
  
    myForm: FormGroup;
  
    constructor(private formBuilder: FormBuilder) { }
  
    ngOnInit() {
      this.myForm = this.formBuilder.group({
        textField: new FormControl(null, Validators.required),
        multiListField: new FormControl(['one', 'three']),
        myFormSubGroup: this.formBuilder.group({
          dateField: new FormControl(new Date(), Validators.required),
          numberField: new FormControl(null, [Validators.required, Validators.max(10), Validators.min(0)]),
          listField: new FormControl('two', Validators.required),
        })
      });
    }
  }
  `;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      textField: new FormControl(null, Validators.required),
      multiListField: new FormControl(['one', 'three']),
      myFormSubGroup: this.formBuilder.group({
        dateField: new FormControl(new Date(), Validators.required),
        numberField: new FormControl(null, [Validators.required, Validators.max(10), Validators.min(0)]),
        listField: new FormControl('two', Validators.required),
      })
    });
  }
}
