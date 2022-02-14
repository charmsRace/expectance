import { Printer } from '~/printer';

export const defaultPrinter: Printer = value => `${value}`;

export const createJsonPrinter =
  <T = any>(spaces = 0): Printer<T> =>
  value =>
    JSON.stringify(value, null, spaces);
