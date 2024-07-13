import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/State/Auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  @Input() changeTemplate:any;
  constructor(private formBuilder:FormBuilder, private store:Store,
    private authService:AuthService) { }

  ngOnInit(): void {
  }

  loginForm : FormGroup= this.formBuilder.group({
    email : ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required,Validators.minLength(8)]]
  })

  submitForm():void {

    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value)
      console.log("Login Request Data", this.loginForm.value)
    }
  }


}
