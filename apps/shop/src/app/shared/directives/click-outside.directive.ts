import { Directive, ElementRef, HostListener, inject, output } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  private _elementRef = inject(ElementRef)

  public clickOutside = output<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: EventTarget | null): void {
    if (!targetElement || !(targetElement instanceof HTMLElement)) return

    const clickedInside = this._elementRef.nativeElement.contains(targetElement)
    !clickedInside && this.clickOutside.emit(event)
  }
}