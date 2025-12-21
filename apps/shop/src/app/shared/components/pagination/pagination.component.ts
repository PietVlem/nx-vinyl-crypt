import { Component, computed, input, output } from '@angular/core';
import { ButtonSecondaryDirective } from '@shared/directives';

@Component({
  selector: 'app-pagination',
  imports: [ButtonSecondaryDirective],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  currentPage = input.required<number>()
  totalPages = input.required<number>()
  pageSize = input.required<number>()
  totalRecords = input.required<number>()

  updatePage = output<number>()

  goToPage = (page: number) => this.updatePage.emit(page)

  fromRecordCount = computed(() => (this.currentPage() - 1) * this.pageSize() + 1)
  toRecordCount = computed(() => {
    const toRecordCount = this.currentPage() * this.pageSize()
    return toRecordCount > this.totalRecords() ? this.totalRecords() : toRecordCount
  })
  disablePreviousButton = computed(() => this.currentPage() === 1)
  disableNextButton = computed(() => this.currentPage() === this.totalPages())
}
