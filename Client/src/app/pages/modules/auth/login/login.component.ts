import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
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
  isLoggedIn: boolean = false;
  fullName: string | null | undefined = "";
  errorMessage: string = "";

  constructor(private auth: AuthService, private storage: LocalStorageService) {
    this.loginForm = new FormGroup({
      login: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    let payload = new LoginRequest(this.loginForm.value);
    this.auth.login(payload).subscribe((response) => {
      if (response.authenticationSuccess) {
        this.errorMessage = "";
        this.auth.setAuthTokens(response.accessToken, response.refreshToken);
        this.storage.features = response.featureCodes;
        this.fullName = response.name;
        this.isLoggedIn = true;
      } else {
        this.errorMessage = "Failed to authenticate. Try Again";
      }
    });
  }

  Logout() {
    this.auth.logout();
    this.isLoggedIn = false;
  }
}
