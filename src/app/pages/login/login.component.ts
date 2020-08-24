import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserModel } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user: UserModel;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.user = new UserModel();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.log("Es inválido");
      return;
    }
    this.auth.login(this.user).subscribe(
      (res) => {
        console.log("respuesta: ", res);
      },
      (err) => {
        console.log(err.error.error);
      }
    );
  }
}
