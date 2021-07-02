import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { LoginService } from './login.service';
import { User } from "./user.model";

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  navigateTo?:string

  loginForm: FormGroup = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required])
  })

  constructor(private fb:FormBuilder, 
    private loginService:LoginService,
    private notificationService:NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || '/'
  }

  login(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        user => this.notificationService.notify(`Bem vindo ${user.name}`),
        response => this.notificationService.notify(response.error.message),
        () => {
          this.router.navigate([this.navigateTo])
        }
      )
  }

}
