import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { HttpService, Pokemon } from "../services/http/http.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-pokemon-page",
  templateUrl: "./pokemon-page.component.html",
  styleUrls: ["./pokemon-page.component.scss"],
})
export class PokemonPageComponent implements OnInit {
  pokemons$: BehaviorSubject<Pokemon[]> = this.httpService.getItems$();
  pokemon: Pokemon = this.onFilter();
  constructor(
    private httpService: HttpService,
    private router: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {}
  onFilter(): Pokemon {
    let data = this.pokemons$.getValue();
    let param = this.router.snapshot.params["name"];
    let pokemon = data.filter((item) => {
      return item.name === param;
    });
    return pokemon[0];
  }
  onNavigateBack() {
    this.location.back();
  }
}
