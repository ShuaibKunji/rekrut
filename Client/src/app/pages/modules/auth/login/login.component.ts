import { Component } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
import { LoginRequest } from "src/app/services/base/apiclient";
import { LocalStorageService } from "src/app/services/local-storage/local-storage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    login: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  get loginFormControl(): FormControl {
    return this.loginForm.get("login") as FormControl;
  }

  matcher = new FormErrorStateMatcher();

  get passwordFormControl(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }

  errorMessage: string = "";
  loading: boolean = false;
  hide: boolean = true;

  constructor(
    private auth: AuthService,
    private storage: LocalStorageService,
    private router: Router
  ) {
    this.loginForm.controls["login"];
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
        this.storage.userDetails = response.userDetails;
        this.router.navigate(["/"]);
      } else {
        this.errorMessage = "Failed to authenticate. Try Again";
      }
    });
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
