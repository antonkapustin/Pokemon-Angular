import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ChildActivationStart } from "@angular/router";
import {
  BehaviorSubject,
  catchError,
  finalize,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
} from "rxjs";

export interface Pokemon {
  type: string;
  abilities: {
    ability: {
      name: string;
      url: string;
      is_hidden: boolean;
      slot: number;
    };
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  id: string;
  stats: {
    base_stat: number;
    efford: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    back_default: string;
    front_default: string;
    front_shiny: string;
  };
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

  constructor(private http: HttpClient) {}

  loadPokemonsArray(api: string): Observable<any> {
    this.loading$.next(true);
    const pokemons = this.http.get<api>(api).pipe(
      switchMap((response: api) => {
        const observ = response.results.map((value) => {
          return this.http.get(value.url);
        });
        return forkJoin(observ);
      }),
      catchError(this.handleError<api>("getApi")),
      finalize(() => this.loading$.next(false))
    );

    return pokemons;
  }
  loadPokemon(id: string) {
    this.loading$.next(true);
    return this.http
      .get<Pokemon>("https://pokeapi.co/api/v2/pokemon/" + id + "/")
      .pipe(finalize(() => this.loading$.next(false)));
  }

  updateItems(data: Pokemon[]): void {
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
