import { Component, input } from '@angular/core';

@Component({
  selector: 'app-horizontal-form-group',
  templateUrl: './horizontal-form-group.component.html',
  styles: `:host { display: block; }`
})
export class HorizontalFormGroupComponent {
  label = input.required<string>()
  labelFor = input<string>('')
  description = input<string>('')
  required = input<boolean>(false)
}
