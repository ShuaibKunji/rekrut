import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { InvalidComponent } from "./invalid/invalid.component";

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
  ],
})
export class SharedModule {}
