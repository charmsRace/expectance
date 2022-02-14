import { Outcome } from '~/outcome';
import { Printer } from '~/printer';
import { createDefaultResultPrinter, Result } from '~/result';
import { defaultSummaryPrinter, Summary } from '~/summary';

export interface OutcomePrinterOptions<Input, Output> {
  printResult?: Printer<Result<Input, Output>>;
  printSummary?: Printer<Summary>;
}

export const createOutcomePrinter =
  <Input, Output>({
    printResult = createDefaultResultPrinter(),
    printSummary = defaultSummaryPrinter,
  }: OutcomePrinterOptions<Input, Output> = {}): Printer<
    Outcome<Input, Output>
  > =>
  ({ results, summary }) =>
    [...results.map(printResult), '', printSummary(summary)].join('\n');
