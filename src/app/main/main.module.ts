import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { HeaderModule } from "src/app/share/header/header.module";
import { SpinerComponent } from "../spiner/spiner.component";
import { PaginationModule } from "../share/pagination/pagination.module";
import { SpinerModule } from "../spiner/spiner.module";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    HeaderModule,
    PaginationModule,
    SpinerModule,
  ],
})
export class MainModule {}
