import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appButtonSecondary]'
})
export class ButtonSecondaryDirective {
  @HostBinding('class') hostClasses = 'inline-flex gap-2 items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white';
}