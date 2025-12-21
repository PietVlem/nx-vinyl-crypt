import { Component, input } from '@angular/core';

@Component({
  selector: 'app-title-text-action',
  imports: [],
  templateUrl: './title-text-action.component.html',
})
export class TitleTextActionComponent {
  title = input.required<string>();
  description = input.required<string>();
}
