import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorLink, phosphorVinylRecord } from '@ng-icons/phosphor-icons/regular';
import { ButtonPrimaryDirective } from '@shared/directives';

@Component({
  selector: 'app-empty-state',
  imports: [NgIcon, ButtonPrimaryDirective],
  viewProviders: [provideIcons({ 
    phosphorVinylRecord,
    phosphorLink
  })],
  templateUrl: './empty-state.component.html',
})
export class EmptyStateComponent {
  title = input.required<string>();
  description = input.required<string>();
  buttonText = input<string>('Add');
  iconName = input<string>('phosphorVinylRecord');

  create = output<void>();
}
