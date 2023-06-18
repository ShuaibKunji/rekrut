import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Routes } from "../constants/routes.";
import { LocalStorageService } from "../services/local-storage/local-storage.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  username: string | undefined;
  isAuthenticated: boolean = true;
  showSideNav: boolean = false;

  constructor(
    private router: Router,
    private tokenservice: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.username = this.tokenservice.userDetails?.userName;
    this.isAuthenticated = this.username != "" && this.username != undefined;
    this.showSideNav = this.isAuthenticated;
  }

  login() {
    this.router.navigate([Routes.LOGIN]);
  }

  toggleSideNav() {
    if (this.isAuthenticated) this.showSideNav = !this.showSideNav;
  }

  logout() {
    this.tokenservice.clear();
    this.ngOnInit();
    this.router.navigate(["/"]);
  }
}
