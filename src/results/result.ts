import { Printer } from '~/printers';

export interface Result<Input, Output> {
  input: Input;
  output: Output;
  expectedOutput: Output;
  isCorrect: boolean;
}

export interface ResultPrinterOptions<Input, Output> {
  printInput: Printer<Input>;
  printOutput: Printer<Output>;
}

export const createResultPrinter =
  <Input, Output>({
    printInput,
    printOutput,
  }: ResultPrinterOptions<Input, Output>): Printer<Result<Input, Output>> =>
  ({ input, output, expectedOutput, isCorrect }) =>
    `Expected f(${printInput(input)}) = ${printOutput(expectedOutput)} --- ${
      isCorrect ? '✔' : `❌ (received ${printOutput(output)})`
    }`;
