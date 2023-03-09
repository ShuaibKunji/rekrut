import { Component } from "@angular/core";
import { AuthService } from "./services/auth/auth.service";
import { LoginRequest } from "./services/base/apiclient";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor() {
    console.log("AppComponent loaded");
  }
}
