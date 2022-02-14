import { Result } from '~/result';
import { Summary } from '~/summary';

export interface Outcome<Input, Output> {
  results: Result<Input, Output>[];
  summary: Summary;
}
