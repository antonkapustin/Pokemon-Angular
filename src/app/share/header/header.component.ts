import { Component, OnInit } from "@angular/core";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  switchMap,
} from "rxjs";
import { HttpService, Pokemon } from "src/app/services/http/http.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  pokemons$!: Observable<Pokemon[]>;
  search!: string;
  private searchTerm = new BehaviorSubject<string>("");
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {}
}
