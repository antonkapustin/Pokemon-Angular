import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Pokemon } from "../http/http.service";

@Injectable({
  providedIn: "root",
})
export class PokedexService {
  pokemons$: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([]);

  getPokemons() {
    return this.pokemons$;
  }
  addPokemons(pokemon: Pokemon) {
    this.pokemons$.next([...this.pokemons$.getValue(), pokemon]);
  }
}
