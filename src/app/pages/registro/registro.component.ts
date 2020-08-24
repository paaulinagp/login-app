import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import swal from "sweetalert";
import { UserModel } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  user: UserModel;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = new UserModel();
    this.user.email = "paaulinagp@gmail.com";
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
    this.auth.newUser(this.user).subscribe(
      (res) => {
        swal.close();
        this.router.navigateByUrl("/home");
      },
      (err) => {
        swal("Oops", err.error.error.message, "error");
      }
    );
  }
}
