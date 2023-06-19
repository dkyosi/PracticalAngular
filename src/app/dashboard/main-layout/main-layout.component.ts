import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  balance:number = 0

  constructor(private authService:AuthService, private mainService:MainService, private router:Router) { }

  ngOnInit(): void {
    this.getBalance()
  }

  getBalance() {
    let u:any = localStorage.getItem('user')
    let user:any = JSON.parse(u)
    this.mainService.mainGetCalls(`/accounts/balance/${user.id}`).subscribe((response: any) => {
      console.log(response)
      let resp: any = response
      this.balance = resp.response.balance
    })
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }

}
