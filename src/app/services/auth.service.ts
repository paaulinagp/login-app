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
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  constructor(private http: HttpClient) {}

  login(user: UserModel): void {}

  newUser(user: UserModel): Observable<any> {
    const authData = {
      ...user,
      returnSecureToken: true,
    };
    console.log("Servicio: ", authData);
    return this.http.post(`${this.url}signUp?key=${this.APIKEY}`, authData);
  }
  logout(): void {}
}
