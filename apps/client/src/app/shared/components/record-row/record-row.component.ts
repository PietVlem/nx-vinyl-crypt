import { Component, input } from '@angular/core';
import { BadgeComponent } from '@client/shared/components';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    phosphorTrash,
    phosphorVinylRecord,
} from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: '[app-record-row]',
  imports: [NgIcon, BadgeComponent],
  providers: [
    provideIcons({
      phosphorVinylRecord,
      phosphorTrash,
    }),
  ],
  templateUrl: './record-row.component.html',
  styles: `
    :host {
      display: table-row;
    }
  `,
})
export class RecordRowComponent {
  record = input.required<any>();
}
