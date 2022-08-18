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
  tap,
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

export interface api {
  count: number;
  next: string;
  privious: string;
  results: results[];
}
export interface results {
  name: string;
  url: string;
}

@Injectable({
  providedIn: "root",
})
export class HttpService {
  allPokemons$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  sortedPokemons$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private api: string =
    " https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

  constructor(private http: HttpClient) {}

  loadPokemonsArray(): Observable<any> {
    const pokemons = this.http.get<api>(this.api).pipe(
      tap((value: api) => {
        this.allPokemons$.next(value.results);
      }),
      catchError(this.handleError<api>("getApi"))
    );
    return pokemons;
  }

  loadPokemonsDetails(data: results[]) {
    const observ = data.map((value) => {
      return this.http.get(value.url);
    });
    return forkJoin(observ);
  }

  loadPokemon(id: string) {
    this.loading$.next(true);
    return this.http
      .get<Pokemon>("https://pokeapi.co/api/v2/pokemon/" + id + "/")
      .pipe(finalize(() => this.loading$.next(false)));
  }

  updateItems(data: Pokemon[]): void {
    this.allPokemons$.next(data);
  }
  getAllItems(): Pokemon[] {
    return this.allPokemons$.getValue();
  }

  getAllItems$(): BehaviorSubject<Pokemon[]> {
    return this.allPokemons$;
  }
  getSortedPokemons(): BehaviorSubject<Pokemon[]> {
    return this.sortedPokemons$;
  }
  getLoadingState(): BehaviorSubject<boolean> {
    return this.loading$;
  }

  searchPokemon(value: string) {
    let items = this.allPokemons$.getValue().filter((el) => {
      return el.name.toUpperCase().trim().indexOf(value.toUpperCase()) === 0;
    });
    this.sortedPokemons$.next(items);
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
