import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { BehaviorSubject, map, Observable, Subscription } from "rxjs";
import { HttpService, Pokemon } from "../services/http/http.service";
import { Location } from "@angular/common";
import { PokedexService } from "../services/pokedex/pokedex.service";

@Component({
  selector: "app-pokemon-page",
  templateUrl: "./pokemon-page.component.html",
  styleUrls: ["./pokemon-page.component.scss"],
})
export class PokemonPageComponent implements OnInit, OnDestroy {
  pokemon!: Pokemon;
  loading$: BehaviorSubject<boolean> = this.httpService.getLoadingState();
  added = true;
  subscriptions: Subscription[] = [];
  constructor(
    private httpService: HttpService,
    private router: ActivatedRoute,
    private location: Location,
    private pokedex: PokedexService
  ) {}

  ngOnInit(): void {
    let subscriptions1$ = this.router.paramMap
      .pipe(map((param: ParamMap) => param.get("name") as string))
      .subscribe((value) => {
        this.filterPokemons(value);
      });
    this.subscriptions.push(subscriptions1$);
  }
  filterPokemons(value: string) {
    this.added = this.pokedex.isAdded(value);
    let subscriptions1$ = this.httpService
      .loadPokemon(value)
      .subscribe((value) => (this.pokemon = value));
    this.subscriptions.push(subscriptions1$);
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
  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }
}
