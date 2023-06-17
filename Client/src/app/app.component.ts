import { Component, OnInit } from "@angular/core";
import { LocalStorageService } from "./services/local-storage/local-storage.service";
import { Router } from "@angular/router";
import { Routes } from "./constants/routes.";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private token: LocalStorageService, private router: Router) {}

  ngOnInit(): void {
    let accessToken = this.token.accessToken;
    let refreshToken = this.token.refreshToken;

    if (
      accessToken != null &&
      accessToken != undefined &&
      accessToken != "" &&
      refreshToken != null &&
      refreshToken != undefined &&
      refreshToken != ""
    )
      this.router.navigate([Routes.HOME]);
    else this.router.navigate([Routes.SESS_EXP]);
  }
}
