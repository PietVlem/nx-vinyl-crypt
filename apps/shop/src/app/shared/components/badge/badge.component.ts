import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.component.html',
})
export class BadgeComponent {
  label = input.required<string>();
  color = input<string>('');

  classes = computed(() => {
    const classesArray = [
      'inline-flex',
      'items-center',
      'rounded-md',
      'px-2',
      'py-1',
      'text-xs',
      'font-medium',
      'ring-1',
      'ring-inset',
    ];

    switch (this.color()) {
      case 'green': 
        classesArray.push('bg-green-50', 'text-green-700', 'ring-green-600/20');
        break;
      case 'yellow':
        classesArray.push('bg-yellow-50', 'text-yellow-800', 'ring-yellow-600/20');
        break;
      default:
        classesArray.push('bg-app-primary', 'text-app-primary', 'ring-app-primary/20', 'text-white');
        break;
    }

    return classesArray;
  })
}
