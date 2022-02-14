export interface Result<Input, Output> {
  input: Input;
  output: Output;
  expectedOutput: Output;
  isCorrect: boolean;
}
