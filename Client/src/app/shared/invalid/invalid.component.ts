import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Routes } from "src/app/constants/routes.";

@Component({
  selector: "app-invalid",
  templateUrl: "./invalid.component.html",
  styleUrls: ["./invalid.component.scss"],
})
export class InvalidComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.data["title"];
    this.invalidSession = this.activatedRoute.snapshot.data["invalidSession"];
  }

  public get message(): string {
    return this.activatedRoute.snapshot.data["message"];
  }
  public title: string = "";
  public invalidSession: boolean = false;

  redirect() {
    this.router.navigate([Routes.LOGIN]);
  }
}
