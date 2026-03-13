import {
    Component,
    DestroyRef,
    effect,
    ElementRef,
    inject,
    input,
    model,
    signal,
    viewChild,
} from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { StylingInputDirective } from '../../directives/styling-input.directive';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    phosphorCaretUpDown,
    phosphorCheck,
} from '@ng-icons/phosphor-icons/regular';
import { IdValue } from '../../../core/models/id-value.model';

@Component({
  selector: 'app-select',
  imports: [ClickOutsideDirective, StylingInputDirective, NgIcon, FormsModule],
  templateUrl: './select.component.html',
  providers: [provideIcons({ phosphorCaretUpDown, phosphorCheck })],
})
export class SelectComponent {
  private destroyRef = inject(DestroyRef);

  control = input.required<FormControl<IdValue | null>>();
  searchable = input<boolean>(false);
  options = input<IdValue[]>([]);
  loading = input<boolean>(false);
  placeholder = input<string>('');
  createFn = input<((data: { value: string }) => void) | undefined>(undefined);

  searchModel = model<string>('');

  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  open = signal<boolean>(false);

  close = () => this.open.set(false);

  toggleOpen = () => {
    this.open.update((prev) => !prev);
    this.control().markAsTouched();
  };

  selectOption = (option: IdValue) => {
    this.control().setValue(option);
    this.control().markAsDirty();
    this.close();
  };

  createEmit = async () => {
    const fn = this.createFn();
    if (!fn) return;

    const value = this.searchModel();
    fn({ value });
  };

  autoFocusSearchInput = effect(() => {
    const searchable = this.searchable();
    if (!searchable) return;

    const searchInput = this.searchInput();
    const open = this.open();
    if (!open || !searchInput) return;

    searchInput.nativeElement.focus();
  });
}
