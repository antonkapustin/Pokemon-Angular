import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { HeaderModule } from "src/app/share/header/header.module";
import { SpinerComponent } from '../spiner/spiner.component';

@NgModule({
  declarations: [MainComponent, SpinerComponent],
  imports: [CommonModule, MainRoutingModule, HeaderModule],
})
export class MainModule {}
