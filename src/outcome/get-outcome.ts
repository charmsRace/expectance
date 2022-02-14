import { Comparator, strictComparator } from '~/comparator';
import { Expectation } from '~/expectation';
import { Outcome } from '~/outcome';
import { Result } from '~/result';
import { Subject } from '~/subject';
import { createSummary } from '~/summary';

export interface GetOutcomeOptions<Input, Output> {
  subject: Subject<Input, Output>;
  expectations: Expectation<Input, Output>[];
  comparator?: Comparator<Output>;
}

export const getOutcome = <Input, Output>({
  subject,
  expectations,
  comparator = strictComparator,
}: GetOutcomeOptions<Input, Output>): Outcome<Input, Output> => {
  const results = expectations.map<Result<Input, Output>>(
    ([input, expectedOutput]) => {
      const output = subject(input);

      return {
        input,
        output,
        expectedOutput,
        isCorrect: comparator(output, expectedOutput),
      };
    },
  );

  const summary = createSummary(results);

  return {
    results,
    summary,
  };
};
