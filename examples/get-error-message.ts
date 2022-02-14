import { createJsonPrinter, runTest } from '@rs.clair/expectance';

export const getErrorMesssage = (error: any): string => {
  if (error.response && error.response.data) {
    return `${error.response.data.message}: ${error.response.data.error} ${error.response.data.status}`;
  }

  return `${error.message}`;
};

const message = 'message';

runTest({
  subject: (error: any) =>
    error.response?.data
      ? `${error.response.data.message}`
      : `${error.message}`,

  expectations: [
    [{ message }, message],
    [{ response: {}, message }, message],
    // [{ response: {} }, message],
    // [{ response: { data: {} } }, message],
    [{ response: { data: { message } } }, message],
  ],

  printInput: createJsonPrinter(),
});
