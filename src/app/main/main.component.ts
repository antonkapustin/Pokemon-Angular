import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, debounceTime, Subscription } from "rxjs";
import { HttpService, Pokemon } from "../services/http/http.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit, OnDestroy {
  pokemons$: BehaviorSubject<Pokemon[]> = this.httpService.getItems$();
  loading$: BehaviorSubject<boolean> = this.httpService.getLoadingState();
  constructor(private httpService: HttpService) {}
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    let subscription1 = this.httpService.loadPokemons().subscribe();
    let subscription2 = this.pokemons$.pipe(debounceTime(1000)).subscribe();
    this.subscriptions.push(subscription1);
    this.subscriptions.push(subscription2);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }
}
