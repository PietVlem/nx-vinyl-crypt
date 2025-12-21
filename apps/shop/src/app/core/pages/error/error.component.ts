import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ERROR_DATA from './errorData';
import { ButtonPrimaryDirective } from '@shared/directives';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  imports: [ButtonPrimaryDirective],
})

export class ErrorComponent {
  route = inject(ActivatedRoute)
  errorData = signal(ERROR_DATA);

  activeErrorObject = computed(() => {
    const { errorCode } = this.route.snapshot.data;
    const code = this.route.snapshot.queryParams['code'];
    const activeErrorCode = errorCode ?? (code && parseInt(code)) ?? 404;

    return this.errorData().find(({ code }) => code === activeErrorCode);
  })
}
