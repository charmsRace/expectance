# Ars Clairexpectance

> _clairexpectance_ (noun) — clarity of expectation.

## Purpose

`expectance` is a lightweight testing utility for snappy sanity checking when writing simple code. It is intended to be exceeding simple to use, so that you can quickly verify that what you're writing satisfies edge cases that otherwise may be tricky to reason about meticulously.

`expectance` is fundamentally a [DX](https://en.wikipedia.org/wiki/User_experience#Developer_experience) tool — it is not a test runner and has no place in a published project or enterprise app.

The domain of `expectance` is strictly limited to [pure functions](https://en.wikipedia.org/wiki/Pure_function). It is not equipped to handle any expectations involving side effects or stateful logic.

## Usage

`expectance` can be used in two ways: via the command line (recommended), or as an actual test runner in your application (at odds with its design & intent).

Create a file like `examples/split-string.ts`:

```typescript
import {
  createJsonPrinter,
  runTest,
  shallowArrayComparator,
} from '@rs-clair/expectance';

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

Then run it with `yarn run-test`:

```cli
> clarity ∈ expectance ∴ yarn run-test examples/split-string.ts

yarn run v1.22.4
$ ts-node --project ./tsconfig.ts-node.json examples/split-string.ts
Expected f() = [] --- ✔
Expected f(a) = ["a"] --- ✔
Expected f(abc) = ["abc"] --- ✔
Expected f(a,b,c) = ["a","b","c"] --- ✔
Expected f(a,,c) = ["a","c"] --- ✔
Expected f(a, b,c , d ,,e,) = ["a","b","c","d","e"] --- ✔
Summary: 6✔ / 0❌
All tests passed! ✔✔✔
Done in 1.24s.
```
