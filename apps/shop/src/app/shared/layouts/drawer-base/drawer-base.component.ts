import { Component, inject, input } from '@angular/core';
import { DrawerService } from '@core/services';

@Component({
  selector: 'app-layout-drawer-base',
  imports: [],
  templateUrl: './drawer-base.component.html',
})
export class DrawerBaseComponent {
  drawerService = inject(DrawerService)

  title = input<string>();
  description = input<string>();
}
