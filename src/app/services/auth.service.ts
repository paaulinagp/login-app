import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "https://identitytoolkit.googleapis.com/v1/accounts:";
  private APIKEY = "AIzaSyB23l41CkGiYqNMqkBFp0J1ZEJOYn5utnk";

  constructor(private http: HttpClient) {}

  login(user: UserModel): Observable<any> {
    const authData = {
      ...user,
      returnSecureToken: true,
    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.APIKEY}`,
      authData
    );
  }

  newUser(user: UserModel): Observable<any> {
    const authData = {
      ...user,
      returnSecureToken: true,
    };
    return this.http.post(`${this.url}signUp?key=${this.APIKEY}`, authData);
  }

  logout(): void {}
}
