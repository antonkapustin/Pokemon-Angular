import { Component, forwardRef, Input, OnDestroy, OnInit } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { debounceTime, Subscription } from "rxjs";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    },
  ],
})
export class InputComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() type!: string;
  value = "";
  subscription!: Subscription;

  input = new FormControl("");

  onChange = (value: any) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  writeValue(value: string) {
    this.value = value;
    this.onChange(this.value);
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
  ngOnInit(): void {
    this.subscription = this.input.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => this.onChange(value));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
