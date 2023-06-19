import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TransferForm } from 'src/app/forms/transfer.form';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  
  amount:number = 0
  transferForm: FormGroup;
  transferText: string = 'transfer'
  formSubmitted: boolean = false
  transferError: string = ''
  isLoading: boolean = false

  constructor(private router: Router, private formBuilder: FormBuilder,private authService:AuthService) {
    this.transferForm = new TransferForm(this.formBuilder).createForm();
   }

   get f () {return this.transferForm.controls}

  ngOnInit(): void {
  }

  transfer(){
    this.formSubmitted = true
    this.transferError = ""
    if (this.transferForm.invalid) {
      return
    }
    this.isLoading = true
    let postData = {
      customerId: this.f['customerId'].value,
      amount: this.f['amount'].value
    }
    return this.authService.authServerCalls(postData, '/accounts/transfer').subscribe(results => {
      let data: any = results
      console.log(data)
      if(data.status == 200){
        this.isLoading = false
        this.router.navigate(['dashboard/transactions'])
      }else{
        this.transferError = data.message
        this.isLoading = false
      }

    }, err => {
      this.isLoading = false;
      if (err.status == 401) {
        this.transferError = "Failed to transfer."
      } else {
        this.transferError = "Failed to communicate with the server. Please try again later."
      }
    })
  }

}
