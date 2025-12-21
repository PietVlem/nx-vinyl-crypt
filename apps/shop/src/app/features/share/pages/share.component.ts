import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { routePaths } from '@app/routes';
import { ShareLinksService } from '@features/share/data-access';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorArrowRight } from '@ng-icons/phosphor-icons/regular';
import { BaseContentTableComponent, RecordRowComponent } from '@shared/components';
import { ButtonPrimaryDirective, StylingInputDirective } from '@shared/directives';

@Component({
  selector: 'app-share',
  imports: [
    CommonModule, 
    BaseContentTableComponent,
    RecordRowComponent, 
    StylingInputDirective, 
    ButtonPrimaryDirective,
    NgIcon,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [provideIcons({ phosphorArrowRight })],
  templateUrl: './share.component.html',
})
export class ShareComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private activateRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private shareLinkService = inject(ShareLinksService);

  token = signal<string>('');
  queryEnabled = signal<boolean>(false);
  hasPassword = signal<boolean>(false);

  passwordForm = new FormGroup({
    password: new FormControl<string>('', [
      Validators.required,
    ])
  })

  SharedLinkDataQuery = this.shareLinkService.getSharedData(
    this.token, 
    this.queryEnabled, 
    this.passwordForm.controls.password
  );

  ngOnInit(): void {
    this.activateRoute.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const token = params.get('token');
        token && this.token.set(token);
      });

    this.activateRoute.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any): void => {
        const metaData = res.metaData;
        if (!metaData) return;

        if (!metaData.isValid) {
          this.router.navigate([routePaths.ERROR], { queryParams: { code: 404 } });
          return
        }

        if (metaData.isExpired) {
          this.router.navigate([routePaths.ERROR], { queryParams: { code: 410 } });
          return
        }

        this.hasPassword.set(metaData.hasPassword);
        this.queryEnabled.set(!metaData.hasPassword);
      });
  }

  onPasswordSubmit = () => {
    const queryEnabled = this.queryEnabled()

    if(!queryEnabled) {
      return this.queryEnabled.set(true);
    }
    
    this.SharedLinkDataQuery.refetch()
  }
}