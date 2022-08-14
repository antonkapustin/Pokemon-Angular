import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, finalize, Subscription, switchMap } from "rxjs";
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
  start = 0;
  constructor(private httpService: HttpService) {}
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    this.loading$.next(true);
    let end = this.start + 20;
    let subsctiprion1 = this.httpService
      .loadPokemonsArray()
      .pipe(
        switchMap((response) => {
          let items = response.results.slice(this.start, end);
          return this.httpService.loadPokemonsDetails(items);
        }),
        finalize(() => this.loading$.next(false))
      )
      .subscribe((value) => {
        this.renderedPokemon = value as Pokemon[];
      });
    this.subscriptions.push(subsctiprion1);
  }

  onGoTo(page: number): void {
    this.currentPage = page;
    this.start = 20 * (page - 1);
    this.loadPokemons();
  }
  onNext(page: number): void {
    this.currentPage = page + 1;
    this.start = this.start + 20;
    this.loadPokemons();
  }
  onPrevious(page: number): void {
    this.currentPage = page - 1;
    this.start = this.start - 20;
    this.loadPokemons();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }
}
