import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Routes } from "src/app/constants/routes.";
import { AuthService } from "src/app/services/auth/auth.service";
import { LoginRequest } from "src/app/services/base/apiclient";
import { LocalStorageService } from "src/app/services/local-storage/local-storage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = "";
  loading: boolean = false;

  constructor(
    private auth: AuthService,
    private storage: LocalStorageService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      login: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onSubmit(event: SubmitEvent) {
    this.loading = true;
    event.preventDefault();
    let payload = new LoginRequest(this.loginForm.value);
    this.auth.login(payload).subscribe((response) => {
      this.loading = false;
      if (response.authenticationSuccess) {
        this.errorMessage = "";
        this.auth.setAuthTokens(response.accessToken, response.refreshToken);
        this.storage.features = response.featureCodes;
        this.router.navigate([Routes.HOME]);
      } else {
        this.errorMessage = "Failed to authenticate. Try Again";
      }
    });
  }
}
