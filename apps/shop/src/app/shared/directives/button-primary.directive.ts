import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appButtonPrimary]'
})
export class ButtonPrimaryDirective {
  @HostBinding('class') hostClasses = `inline-flex gap-2 items-center justify-center rounded-md bg-app-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-app-primary`;
}