import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/security/login/login.service';
import { User } from 'src/app/security/login/user.model';

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  user(): User | undefined{
    return this.loginService.user
  }

  isLoggedIn():boolean{
    return this.loginService.isLoggedIn()
  }

  login(){
    this.loginService.handleLogin('')
  }

  logout(){
    this.loginService.logout()
  }

}
