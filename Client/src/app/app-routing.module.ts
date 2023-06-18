import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthModule } from "./pages/modules/auth/auth.module";
import { InvalidComponent } from "./shared/invalid/invalid.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "auth", loadChildren: () => AuthModule },
  {
    path: "sessionexpired",
    component: InvalidComponent,
    data: {
      message: "Please login to continue",
      title: "Session Expired",
      invalidSession: true,
    },
  },
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "**",
    component: InvalidComponent,
    data: {
      message: "Please check the route you have entered",
      title: "Invalid URL",
      invalidSession: false,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
