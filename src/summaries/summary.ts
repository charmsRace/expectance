import { Printer } from '~/printers';
import { Result } from '~/results';

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

export const printSummary: Printer<Summary> = ({ pass, fail }) =>
  [
    `Summary: ${pass}✔ / ${fail}❌`,
    ...(fail === 0 ? ['All tests passed! ✔✔✔'] : []),
  ].join('\n');
