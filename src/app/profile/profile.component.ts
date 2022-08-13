import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../services/authorization/auth.service";
import { Pokemon } from "../services/http/http.service";
import { PokedexService } from "../services/pokedex/pokedex.service";

export interface trainer {
  name: string;
  gender: string;
  email: string;
}

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  trainer: trainer = this.authServise.getToken();
  pokemons$: BehaviorSubject<Pokemon[]> = this.pokedexService.getPokemons();

  constructor(
    private authServise: AuthService,
    private pokedexService: PokedexService
  ) {}

  ngOnInit(): void {
    this.pokedexService.setToken(this.pokemons$.getValue());
  }
}
