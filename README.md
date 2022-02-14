# Ars Clairexpectance

> _clairexpectance_ (noun) — clarity of expectation.

## Purpose

`expectance` is a lightweight testing utility for snappy sanity checking when writing simple code. It is intended to be exceeding simple to use, so that you can quickly verify that what you're writing satisfies edge cases that otherwise may be tricky to reason about meticulously.

`expectance` is fundamentally a [DX](https://en.wikipedia.org/wiki/User_experience#Developer_experience) tool — it is not a test runner and has no place in a published project or enterprise app. Reach for `expectance` when you want to verify the function you're writing is correct — if you want to do actual unit testing inside your repo, set up a full framework like [AVA](https://github.com/avajs/ava).

The domain of `expectance` is strictly limited to [pure functions](https://en.wikipedia.org/wiki/Pure_function). It is not equipped to handle any expectations involving side effects or stateful logic.

## Usage

The most straightforward way to use this library is to pull down this repo & run `yarn` so you have your own little test turf. In your home directory:

```cli
> clarity ∈ ~ ∴ git clone git@github.com:charmsRace/expectance.git
> clarity ∈ ~ ∴ cd expectance/
> clarity ∈ expectance ∴ yarn
```

Then you can create a file like `~/expectance/examples/split-string.ts`:

```typescript
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
```

and run it with `yarn run-test`:

```cli
> clarity ∈ expectance ∴ yarn run-test examples/split-string.ts

yarn run v1.22.4
$ ts-node --project ./tsconfig.ts-node.json examples/split-string.ts
Expect f() = [] ——— ✔
Expect f(a) = ["a"] ——— ✔
Expect f(abc) = ["abc"] ——— ✔
Expect f(a,b,c) = ["a","b","c"] ——— ✔
Expect f(a,,c) = ["a","c"] ——— ✔
Expect f(a, b,c , d ,,e,) = ["a","b","c","d","e"] ——— ✔

Summary: 6 ✔, 0 ❌
All tests passed! 🎉🎉🎉
Done in 1.27s.
```

## Types / Interfaces

For most use cases, these are the relevant outward-facing interfaces.

```typescript
interface RunTestOptions<Input, Output> {
  subject: (input: Input) => Output;
  expectations: [Input, Output][];
  comparator?: (a: Output, b: Output) => boolean;
  printInput?: (input: Input) => string;
  printOutput?: (output: Output) => string;
  printResult?: (result: Result<Input, Output>) => string;
  printSummary?: (summary: Summary) => string;
  callback?: (value: string) => void;
}

interface Result<Input, Output> {
  input: Input;
  output: Output;
  expectedOutput: Output;
  isCorrect: boolean;
}

interface Summary {
  pass: number;
  fail: number;
}
```
