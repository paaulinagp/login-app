import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "https://identitytoolkit.googleapis.com/v1/accounts:";
  private APIKEY = "AIzaSyB23l41CkGiYqNMqkBFp0J1ZEJOYn5utnk";
  token: string;

  constructor(private http: HttpClient) {}

  login(user: UserModel): Observable<any> {
    const authData = {
      ...user,
      returnSecureToken: true,
    };
    return this.http
      .post(`${this.url}signInWithPassword?key=${this.APIKEY}`, authData)
      .pipe(
        map((res: any) => {
          this.setToken(res.idToken);
          return res;
        })
      );
  }

  newUser(user: UserModel): Observable<any> {
    const authData = {
      ...user,
      returnSecureToken: true,
    };
    return this.http
      .post(`${this.url}signUp?key=${this.APIKEY}`, authData)
      .pipe(
        map((res: any) => {
          this.setToken(res.idToken);
          return res;
        })
      );
  }

  logout(): void {}

  private setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", this.token);
  }

  getToken() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
    } else {
      this.token = "";
    }

    return this.token;
  }
}
