import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PokemonPageRoutingModule } from "./pokemon-page-routing.module";
import { PokemonPageComponent } from "./pokemon-page.component";
import { HeaderModule } from "../share/header/header.module";
import { ProgressBarModule } from "../share/progress-bar/progress-bar.module";

@NgModule({
  declarations: [PokemonPageComponent],
  imports: [
    CommonModule,
    PokemonPageRoutingModule,
    HeaderModule,
    ProgressBarModule,
  ],
})
export class PokemonPageModule {}
