import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/forms/login.form';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  loginForm: FormGroup;
  loginText: string = 'Login'
  formSubmitted: boolean = false
  loginError: string = ''
  isLoading: boolean = false

  constructor(private router: Router, private formBuilder: FormBuilder,private authService:AuthService) {
    this.loginForm = new LoginForm(this.formBuilder).createForm();
   }

   get f () {return this.loginForm.controls}

  ngOnInit(): void {
  }

  login(){
    this.formSubmitted = true
    this.loginError = ""
    if (this.loginForm.invalid) {
      return
    }
    this.isLoading = true

    let postData = {
      customerId: this.f['customerId'].value,
      pin: this.f['pin'].value
    }
    return this.authService.authServerCalls(postData, '/auth/users/login').subscribe(results => {
      let data: any = results
      if(data.status == 200){
        console.log(data)
        localStorage.setItem("JWT_TOKEN", data.response.token)
        localStorage.setItem("user", JSON.stringify(data.response.profile))
        this.isLoading = false
        this.router.navigate(['dashboard'])
      }else{
        this.loginError = data.message
        this.isLoading = false
      }

    }, err => {
      this.isLoading = false;
      if (err.status == 401) {
        this.loginError = "You have entered incorrect Id or password."
      } else {
        this.loginError = "Failed to communicate with the server. Please try again later."
      }
    })
  }

}
