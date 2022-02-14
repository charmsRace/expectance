import {
  createJsonPrinter,
  runTest,
  shallowArrayComparator,
} from '@rs.clair/expectance';

runTest({
  subject: (values: string) =>
    values
      .split(',')
      .map(value => value.trim())
      .filter(value => value !== ''),

  expectations: [
    ['', []],
    ['a', ['a']],
    ['abc', ['abc']],
    ['a,b,c', ['a', 'b', 'c']],
    ['a,,c', ['a', 'c']],
    ['a, b,c , d ,,e,', ['a', 'b', 'c', 'd', 'e']],
  ],

  comparator: shallowArrayComparator,
  printOutput: createJsonPrinter(),
});
