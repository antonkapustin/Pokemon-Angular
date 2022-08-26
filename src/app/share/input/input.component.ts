import { Component, forwardRef, Input, OnDestroy, OnInit } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { debounceTime, of, Subscription } from "rxjs";

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
export class InputComponent implements ControlValueAccessor {
  @Input() type!: string;
  value = "";
  subscription!: Subscription;

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
}
