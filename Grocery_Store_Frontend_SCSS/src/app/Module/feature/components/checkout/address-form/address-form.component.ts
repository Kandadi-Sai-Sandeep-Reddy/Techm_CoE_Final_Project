import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/State/Order/order.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  addresses=[1,1,1];

  myForm:FormGroup=this.formBuilder.group(
    {
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      streetAddress:["", Validators.required],
      city:["", Validators.required],
      state:["", Validators.required],
      zipCode:["", Validators.required],
      mobile:["", Validators.required],

    }
  )
  constructor(private formBuilder: FormBuilder, private orderService:OrderService) { }

  ngOnInit(): void {
  }

  handleCreateOrder(item:any)
  {

  }

  handleSubmit=()=>
  {
    const formValue=this.myForm.value;
    this.orderService.createOrder(formValue)
    console.log("Form Data",formValue);
  }

}
