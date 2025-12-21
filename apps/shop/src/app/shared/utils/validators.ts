import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import dayjs from 'dayjs';

const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export const imgUrlValidator = [
    Validators.pattern(urlRegex),
]

export function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value && dayjs(value).isBefore(dayjs(), 'day')) {
    return { futureDate: true }; 
  }
  return null;
}