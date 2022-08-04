import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ChildActivationStart } from "@angular/router";
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
} from "rxjs";

export interface Pokemon {
  type: string;
  name: string;
  id: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
}

interface api {
  count: number;
  next: string;
  privious: string;
  results: { name: string; url: string }[];
}

@Injectable({
  providedIn: "root",
})
export class HttpService {
  pokemons$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private api: string = " https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
  constructor(private http: HttpClient) {}

  loadPokemons(): Observable<api> {
    this.loading$.next(true);
    const pokemons = this.http.get<api>(this.api).pipe(
      map((response) => {
        let pokemons: any[] = [];
        response.results.forEach((value) => {
          this.http.get(value.url).subscribe((value) => {
            pokemons.push(value);
            return;
          });
        });
        this.updateItems(pokemons);
        return response;
      }),
      catchError(this.handleError<api>("getApi")),
      finalize(() => this.loading$.next(false))
    );

    return pokemons;
  }

  private updateItems(data: Pokemon[]): void {
    this.pokemons$.next(data);
  }
  getItems(): Pokemon[] {
    return this.pokemons$.getValue();
  }

  getItems$(): BehaviorSubject<Pokemon[]> {
    return this.pokemons$;
  }
  getLoadingState(): BehaviorSubject<boolean> {
    return this.loading$;
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
