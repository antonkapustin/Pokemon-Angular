import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  BehaviorSubject,
  debounceTime,
  finalize,
  map,
  Subscription,
  switchMap,
  take,
} from "rxjs";
import { api, HttpService, Pokemon } from "../services/http/http.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit, OnDestroy {
  pokemons$: BehaviorSubject<any[]> = this.httpService.getItems$();
  loading$: BehaviorSubject<boolean> = this.httpService.getLoadingState();
  renderedPokemon!: Pokemon[];
  currentPage: number = 1;
  totalPages: number = 50;
  private api: string = " https://pokeapi.co/api/v2/pokemon?limit=20&offset=";
  currentOffset = 0;
  constructor(private httpService: HttpService) {}
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.loadPokemons();
    // let subscription2 = this.pokemons$
    //   .pipe()
    //   .subscribe((value) => console.log(value));
    // this.subscriptions.push(subscription2);
  }

  loadPokemons() {
    let subsctiprion1 = this.httpService
      .loadPokemonsArray(this.api + this.currentOffset)
      .pipe(take(1))
      .subscribe((value) => this.pokemons$.next(value));
    this.subscriptions.push(subsctiprion1);
  }

  onGoTo(page: number): void {
    this.currentPage = page;
    this.currentOffset = 20 * (page - 1);
    this.loadPokemons();
  }
  onNext(page: number): void {
    this.currentPage = page + 1;
    this.currentOffset = this.currentOffset + 20;
    this.loadPokemons();
  }
  onPrevious(page: number): void {
    this.currentPage = page - 1;
    this.currentOffset = this.currentOffset - 20;
    this.loadPokemons();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }
}
