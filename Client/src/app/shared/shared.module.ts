import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { InvalidComponent } from "./invalid/invalid.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [InvalidComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule],
  exports: [
    ReactiveFormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule,
    InvalidComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
})
export class SharedModule {}
