import { defaultPrinter, Printer } from '~/printer';
import { Result } from '~/result';

export interface ResultPrinterOptions<Input, Output> {
  printInput?: Printer<Input>;
  printOutput?: Printer<Output>;
}

export const createResultPrinter =
  <Input, Output>({
    printInput = defaultPrinter,
    printOutput = defaultPrinter,
  }: ResultPrinterOptions<Input, Output> = {}): Printer<
    Result<Input, Output>
  > =>
  ({ input, output, expectedOutput, isCorrect }) =>
    `Expect f(${printInput(input)}) = ${printOutput(expectedOutput)} ——— ${
      isCorrect ? '✔' : `❌ (received ${printOutput(output)})`
    }`;

export const createDefaultResultPrinter = <Input, Output>() =>
  createResultPrinter<Input, Output>();
