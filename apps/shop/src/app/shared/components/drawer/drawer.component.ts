import { Portal, PortalModule } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import { Component, ComponentRef, computed, effect, inject, signal } from '@angular/core';
import { DrawerService } from '@core/services';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-drawer',
  imports: [AsyncPipe, PortalModule, ClickOutsideDirective],
  templateUrl: './drawer.component.html',
})
export class DrawerComponent {
  drawerService = inject(DrawerService);

  clickOutsideEnabled = signal(false);

  drawerShown = computed(() => this.drawerService.isShown());

  drawerPortalComponent: Observable<Portal<ComponentRef<unknown>> | null> = of(null)

  constructor() {
    effect(() => {
      if(this.drawerShown()) {
        setTimeout(() => {
          this.clickOutsideEnabled.set(true);
        }, 1000);
        return
      }
      this.clickOutsideEnabled() && this.clickOutsideEnabled.set(false);
    })
  }

  ngOnInit() {
    this.drawerPortalComponent = this.drawerService.getPortal();
  }

  closeDrawer() {
    if(this.clickOutsideEnabled()) {
      this.drawerService.hide();
    }
  }
}
