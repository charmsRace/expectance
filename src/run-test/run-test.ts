import { log } from '~/callback';
import { Comparator, strictComparator } from '~/comparator';
import { Expectation } from '~/expectation';
import { getOutcome, GetOutcomeOptions } from '~/outcome/get-outcome';
import {
  createOutcomePrinter,
  OutcomePrinterOptions,
} from '~/outcome/printers';
import { defaultPrinter, Printer } from '~/printer';
import { createResultPrinter, Result, ResultPrinterOptions } from '~/result';
import { Subject } from '~/subject';
import { defaultSummaryPrinter, Summary } from '~/summary';

export interface RunTestOptions<Input, Output>
  extends GetOutcomeOptions<Input, Output>,
    ResultPrinterOptions<Input, Output>,
    OutcomePrinterOptions<Input, Output> {
  subject: Subject<Input, Output>;
  expectations: Expectation<Input, Output>[];
  comparator?: Comparator<Output>;
  printInput?: Printer<Input>;
  printOutput?: Printer<Output>;
  printResult?: Printer<Result<Input, Output>>;
  printSummary?: Printer<Summary>;
  callback?: (value: string) => void;
}

export const runTest = <Input, Output>({
  subject,
  expectations,
  comparator = strictComparator,
  printInput = defaultPrinter,
  printOutput = defaultPrinter,
  printResult = createResultPrinter({
    printInput,
    printOutput,
  }),
  printSummary = defaultSummaryPrinter,
  callback = log,
}: RunTestOptions<Input, Output>) => {
  const outcome = getOutcome({
    subject,
    expectations,
    comparator,
  });

  const printOutcome = createOutcomePrinter({
    printResult,
    printSummary,
  });

  callback(printOutcome(outcome));
};
