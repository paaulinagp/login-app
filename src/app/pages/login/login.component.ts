import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import swal from "sweetalert";

import { UserModel } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user: UserModel;
  remember: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = new UserModel();
    if (localStorage.getItem("email")) {
      this.user.email = localStorage.getItem("email");
      this.remember = true;
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.log("Es inválido");
      return;
    }
    // swal({
    //   title: "Espere un momento",
    //   text: "...",
    //   icon: "info",
    //   button: false,
    //   closeOnClickOutside: false,
    // });
    swal("Esperando", "....", "success");
    this.auth.login(this.user).subscribe(
      (res) => {
        swal.close();
        if (this.remember) {
          localStorage.setItem("email", this.user.email);
        }
        this.router.navigateByUrl("/home");
      },
      (err) => {
        swal("Oops", err.error.error.message, "error");
      }
    );
  }
}
