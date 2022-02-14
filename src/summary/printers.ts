import { Printer } from '~/printer';
import { Summary } from '~/summary';

export const defaultSummaryPrinter: Printer<Summary> = ({ pass, fail }) =>
  [
    `Summary: ${pass} ✔, ${fail} ❌`,
    ...(fail === 0 ? ['All tests passed! 🎉🎉🎉'] : []),
  ].join('\n');
