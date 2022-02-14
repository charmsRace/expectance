import { Result } from '~/result';

export interface Summary {
  pass: number;
  fail: number;
}

export const createSummary = <Input, Output>(
  results: Result<Input, Output>[],
) =>
  results.reduce<Summary>(
    ({ pass, fail }, { isCorrect }) => ({
      pass: pass + +isCorrect,
      fail: fail + +!isCorrect,
    }),
    {
      pass: 0,
      fail: 0,
    },
  );
