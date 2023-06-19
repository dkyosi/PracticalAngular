import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DepositForm } from 'src/app/forms/deposit.form';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  amount:number = 0
  depositForm: FormGroup;
  depositText: string = 'deposit'
  formSubmitted: boolean = false
  depositError: string = ''
  isLoading: boolean = false

  constructor(private router: Router, private formBuilder: FormBuilder,private authService:AuthService) {
    this.depositForm = new DepositForm(this.formBuilder).createForm();
   }

   get f () {return this.depositForm.controls}

  ngOnInit(): void {
  }

  deposit(){
    this.formSubmitted = true
    this.depositError = ""
    if (this.depositForm.invalid) {
      return
    }
    this.isLoading = true
    let u:any = localStorage.getItem('user')
    let user:any = JSON.parse(u)

    let postData = {
      userId: user.id,
      amount: this.f['amount'].value
    }
    return this.authService.authServerCalls(postData, '/accounts/deposit').subscribe(results => {
      let data: any = results
      console.log(data)
      if(data.status == 200){
        this.isLoading = false
        this.router.navigate(['dashboard/transactions'])
      }else{
        this.depositError = data.message
        this.isLoading = false
      }

    }, err => {
      this.isLoading = false;
      if (err.status == 401) {
        this.depositError = "Failed to deposit."
      } else {
        this.depositError = "Failed to communicate with the server. Please try again later."
      }
    })
  }

}
