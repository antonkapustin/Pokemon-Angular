import { Component } from "@angular/core";
import { debounceTime, of } from "rxjs";
import { HttpService } from "src/app/services/http/http.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  search!: string;
  constructor(private httpService: HttpService) {}
  searchChange(value: string) {
    of(value)
      .pipe(debounceTime(500))
      .subscribe((value) => this.httpService.searchPokemon(value));
  }
}
