import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorTrash, phosphorVinylRecord } from '@ng-icons/phosphor-icons/regular';
import { BadgeComponent } from '@shared/components';

@Component({
  selector: '[app-record-row]',
  imports: [NgIcon, BadgeComponent],
  providers: [
    provideIcons({
      phosphorVinylRecord,
      phosphorTrash,
    })
  ],
  templateUrl: './record-row.component.html',
  styles: `
    :host {
      display: table-row;
    }
  `
})

export class RecordRowComponent {
  record = input.required<any>();
}