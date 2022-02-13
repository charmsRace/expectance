import { Comparator, strictComparator } from '~/comparators';
import { Expectation } from '~/expectations';
import { defaultPrinter, Printer } from '~/printers';
import { createResultPrinter } from '~/results';
import { Subject } from '~/subjects';
import { createSummary, printSummary } from '~/summaries';

export interface TestOptions<Input, Output> {
  subject: Subject<Input, Output>;
  expectations: Expectation<Input, Output>[];
  comparator?: Comparator<Output>;
  printInput?: Printer<Input>;
  printOutput?: Printer<Output>;
}

export const runTest = <Input, Output>({
  subject,
  expectations,
  comparator = strictComparator,
  printInput = defaultPrinter,
  printOutput = defaultPrinter,
}: TestOptions<Input, Output>) => {
  const printResult = createResultPrinter({
    printInput,
    printOutput,
  });

  const results = expectations.map(([input, expectedOutput]) => {
    const output = subject(input);

    return {
      input,
      output,
      expectedOutput,
      isCorrect: comparator(output, expectedOutput),
    };
  });

  results.forEach(result => {
    console.log(printResult(result));
  });

  console.log(printSummary(createSummary(results)));
};
