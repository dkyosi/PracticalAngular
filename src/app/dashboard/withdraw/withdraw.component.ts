import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { WithdrawForm } from 'src/app/forms/withdraw.form';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  amount:number = 0
  withdrawForm: FormGroup;
  withdrawText: string = 'withdraw'
  formSubmitted: boolean = false
  withdrawError: string = ''
  isLoading: boolean = false

  constructor(private router: Router, private formBuilder: FormBuilder,private authService:AuthService) {
    this.withdrawForm = new WithdrawForm(this.formBuilder).createForm();
   }

   get f () {return this.withdrawForm.controls}

  ngOnInit(): void {
  }

  withdraw(){
    this.formSubmitted = true
    this.withdrawError = ""
    if (this.withdrawForm.invalid) {
      return
    }
    this.isLoading = true
    let u:any = localStorage.getItem('user')
    let user:any = JSON.parse(u)

    let postData = {
      userId: user.id,
      amount: this.f['amount'].value
    }
    return this.authService.authServerCalls(postData, '/accounts/withdraw').subscribe(results => {
      let data: any = results
      console.log(data)
      if(data.status == 200){
        this.isLoading = false
        this.router.navigate(['dashboard/transactions'])
      }else{
        this.withdrawError = data.message
        this.isLoading = false
      }

    }, err => {
      this.isLoading = false;
      if (err.status == 401) {
        this.withdrawError = "Failed to withdraw."
      } else {
        this.withdrawError = "Failed to communicate with the server. Please try again later."
      }
    })
  }

}
