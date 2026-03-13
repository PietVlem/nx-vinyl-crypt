import { Condition } from './condition.enum';

export interface IdValue {
  id: string;
  value: string | Condition;
}