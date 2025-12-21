import {
  Directive,
  DoCheck,
  ElementRef,
  OnInit,
  Renderer2,
  inject
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInput]'
})
export class StylingInputDirective implements OnInit, DoCheck {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private control = inject(NgControl, { optional: true });

  private hasErrorClass = false;

  private readonly baseClasses = [
    'block',
    'w-full',
    'rounded-md',
    'bg-white',
    'px-3',
    'py-1.5',
    'text-base',
    'text-gray-900',
    'outline',
    'outline-1',
    '-outline-offset-1',
    'outline-gray-300',
    'placeholder:text-gray-400',
    'focus:outline',
    'focus:outline-2',
    'focus:-outline-offset-2',
    'focus:outline-slate-600',
    'sm:text-sm/6'
  ];

  private readonly errorClasses = [
    'outline-red-300',
    'focus:outline-red-600',
    'text-red-900',
    'placeholder:text-red-300'
  ];

  ngOnInit(): void {
    this.baseClasses.forEach(cls =>
      this.renderer.addClass(this.el.nativeElement, cls)
    );
  }

  ngDoCheck(): void {
    if (!this.control || !this.control.control) return;

    const invalid = this.control.control.invalid;
    const touchedOrDirty =
      this.control.control.touched || this.control.control.dirty;

    const shouldHaveError = invalid && touchedOrDirty;

    if (shouldHaveError && !this.hasErrorClass) {
      this.addErrorClasses();
      this.hasErrorClass = true;
    }
    
    if (!shouldHaveError && this.hasErrorClass) {
      this.removeErrorClasses();
      this.hasErrorClass = false;
    }
  }

  private addErrorClasses() {
    this.errorClasses.forEach(cls =>
      this.renderer.addClass(this.el.nativeElement, cls)
    );
  }

  private removeErrorClasses() {
    this.errorClasses.forEach(cls =>
      this.renderer.removeClass(this.el.nativeElement, cls)
    );
  }
}
