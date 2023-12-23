export const parseHeaders = (str: string) => {
  str = str.trim();
  if (str === '') {
    const headers = new Headers();
    return headers;
  }

  str = str
    .replaceAll(/"/g, '')
    .replaceAll(/ /g, '')
    .replaceAll(/{/g, '')
    .replaceAll(/}/g, '');

  const obj = Object.fromEntries(
    str.split(',').map((pair) => pair.trim().split(':'))
  );

  const headers = new Headers(obj);
  return headers;
};
