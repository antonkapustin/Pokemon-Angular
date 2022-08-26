import { compileDeclareInjectableFromMetadata } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Pokemon } from "../http/http.service";

@Injectable({
  providedIn: "root",
})
export class PokedexService {
  pokemons$: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>(
    this.getToken()
  );

  getPokemons(): BehaviorSubject<Pokemon[]> {
    return this.pokemons$;
  }
  addPokemons(pokemon: Pokemon): void {
    this.pokemons$.next([...this.pokemons$.getValue(), pokemon]);
  }
  setToken(token: Pokemon[]): void {
    localStorage.setItem("pokedex", JSON.stringify(token));
  }
  getToken(): Pokemon[] {
    let token = localStorage.getItem("pokedex");
    if (token) {
      return JSON.parse(token);
    } else {
      return [];
    }
  }
  isAdded(name: string) {
    let a = this.pokemons$.getValue().find((item) => {
      return item.name == name;
    });
    return a !== undefined;
  }
  removeFromPokedex(element: Pokemon): void {
    let newArray = this.pokemons$.getValue().filter((item) => {
      if (item.id !== element.id) {
        return item;
      }
      return;
    });
    this.pokemons$.next(newArray);
  }
}
