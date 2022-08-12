import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage!: number;
  @Input() totalPages!: number;

  @Output() goTo: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();

  renderPages: number[] = this.getPages(this.currentPage, this.totalPages);

  ngOnChanges(changes: SimpleChanges): void {
    this.renderPages = this.getPages(this.currentPage, this.totalPages);
  }

  private getPages(current: number, total: number): number[] {
    if (total <= 7) {
      return [...Array(total).keys()].map((value) => ++value);
    }

    if (current > 5) {
      if (current >= total - 4) {
        return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, -1, current - 1, current, current + 1, -1, total];
      }
    }
    return [1, 2, 3, 4, 5, -1, total];
  }

  onGoTo(page: number): void {
    this.goTo.emit(page);
  }
  onNext(): void {
    this.next.emit(this.currentPage);
  }
  onPrevious(): void {
    this.previous.next(this.currentPage);
  }
}
