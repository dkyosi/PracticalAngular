import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterForm } from 'src/app/forms/register.form';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerText: string = 'Register'
  formSubmitted: boolean = false
  registerError: string = ''
  isLoading: boolean = false

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    this.registerForm = new RegisterForm(this.formBuilder).createForm();
  }

  get f() { return this.registerForm.controls }

  ngOnInit(): void {
  }

  register(){
    this.formSubmitted = true
    this.registerError = ""
    if (this.registerForm.invalid) {
      return
    }
    this.isLoading = true

    let postData = {
      customerId: this.f['customerId'].value,
      email: this.f['email'].value,
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      pin: this.f['pin'].value
    }
    return this.authService.authServerCalls(postData, '/auth/users/register').subscribe(results => {
      let data: any = results
      console.log(data)
      if(data.status == 200){
        localStorage.setItem("JWT_TOKEN", data.response.token)
        localStorage.setItem("user", JSON.stringify(data.response.profile))
        this.isLoading = false
        this.router.navigate(['dashboard'])
      }else{
        this.registerError = data.message
        this.isLoading = false
      }

    }, err => {
      this.isLoading = false;
      if (err.status == 401) {
        this.registerError = "You have entered incorrect Id or password."
      } else {
        this.registerError = "Failed to communicate with the server. Please try again later."
      }
    })
  }


}
