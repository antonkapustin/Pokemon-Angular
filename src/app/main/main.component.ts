import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, debounceTime, Subscription, take } from "rxjs";
import { HttpService, Pokemon } from "../services/http/http.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit, OnDestroy {
  pokemons$: BehaviorSubject<Pokemon[]> = this.httpService.getItems$();
  loading$: BehaviorSubject<boolean> = this.httpService.getLoadingState();
  currentPage: number = 1;
  totalPages: number = 50;
  private api: string = " https://pokeapi.co/api/v2/pokemon?limit=20&offset=";
  currentOffset = 0;
  constructor(private httpService: HttpService) {}
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    let subscription1 = this.httpService
      .loadPokemons(this.api + this.currentOffset)
      .pipe(take(1))
      .subscribe();
    let subscription2 = this.pokemons$.pipe().subscribe();
    this.subscriptions.push(subscription2);
  }

  public onGoTo(page: number): void {
    this.currentPage = page;
    this.currentOffset = 20 * (page - 1);
    this.httpService
      .loadPokemons(this.api + this.currentOffset)
      .pipe(take(1))
      .subscribe();
  }
  public onNext(page: number): void {
    this.currentPage = page + 1;
    this.currentOffset = this.currentOffset + 20;
    this.httpService
      .loadPokemons(this.api + this.currentOffset)
      .pipe(take(1))
      .subscribe();
  }
  public onPrevious(page: number): void {
    this.currentPage = page - 1;
    this.currentOffset = this.currentOffset - 20;
    this.httpService
      .loadPokemons(this.api + this.currentOffset)
      .pipe(take(1))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }
}
