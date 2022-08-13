import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { HttpService, Pokemon } from "../services/http/http.service";
import { Location } from "@angular/common";
import { PokedexService } from "../services/pokedex/pokedex.service";

@Component({
  selector: "app-pokemon-page",
  templateUrl: "./pokemon-page.component.html",
  styleUrls: ["./pokemon-page.component.scss"],
})
export class PokemonPageComponent implements OnInit {
  pokemons$: BehaviorSubject<Pokemon[]> = this.httpService.getItems$();
  pokemon!: Pokemon;
  loading$: BehaviorSubject<boolean> = this.httpService.getLoadingState();
  added = true;
  constructor(
    private httpService: HttpService,
    private router: ActivatedRoute,
    private location: Location,
    private pokedex: PokedexService
  ) {}

  ngOnInit(): void {
    let id = this.router.snapshot.params["id"];
    this.added = this.pokedex.isAdded(id);
    this.httpService
      .loadPokemon(id)
      .subscribe((value) => (this.pokemon = value));
  }
  onNavigateBack() {
    this.location.back();
  }
  addToPokedex() {
    this.pokedex.addPokemons(this.pokemon);
    this.added = true;
  }
  removeFromPokedex() {
    this.pokedex.removeFromPokedex(this.pokemon);
    this.added = false;
  }
}
