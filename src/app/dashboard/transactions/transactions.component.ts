import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions:any [] = []
  searchId:any = 1

  constructor(private mainService:MainService) { }

  ngOnInit(): void {
    this.getTransactions()
  }

  search(){
    console.log(this.searchId)
    if(this.searchId != 0){
      this.mainService.mainPostCalls({}, `/transactions/${this.searchId}`).subscribe(results => {
         let response:any = results
         console.log(response)
         if(response.status == 200){
          if(!response.response.toString().includes("Failed")){
             this.transactions = []
             this.transactions.push(response.response)
          }else{
            this.getTransactions()
          }
         }
      })
    }else{
      alert('Please enter transaction ID to search')
    }
  }

  getTransactions() {
    let u:any = localStorage.getItem('user')
    let user:any = JSON.parse(u)
    this.mainService.mainGetCalls(`/transactions/statement/${user.id}`).subscribe((response: any) => {
      console.log(response)
      let resp: any = response
      this.transactions = resp.response.response
    })
  }

}
