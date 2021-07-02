import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { meat_api } from "src/app/app.api";
import { User } from "./user.model";
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable()
export class LoginService{

    user?: User

    constructor(private http:HttpClient,
        private router: Router){}

    isLoggedIn(): boolean{
        return this.user !== undefined
    }

    login(email:string, password:string): Observable<User>{
        console.log(meat_api)
        return this.http.post<User>(`${meat_api}/login`, {email: email, password: password})
            .pipe(
                tap(user => this.user = user)
            )
    }

    handleLogin(path?:string){
        this.router.navigate(['/login', path])
    }

    logout(){
        this.user = undefined
    }

}