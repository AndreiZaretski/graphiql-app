export const parseVariables = (str: string) => {
  str = str.trim();
  if (str === '') {
    return {};
  }

  str = str
    .replaceAll(/"/g, '')
    .replaceAll(/ /g, '')
    .replaceAll(/{/g, '')
    .replaceAll(/}/g, '');

  const obj = Object.fromEntries(
    str.split(',').map((pair) => {
      const [key] = pair.trim().split(':');
      let value: string | number | boolean = pair.trim().split(':')[1];
      if (/^\d+$/.test(value)) {
        value = Number(value);
      }
      if (!isNaN(+value)) {
        value = Number(value);
      }
      if (value === 'true' || value === 'false') {
        value = JSON.parse(value);
      }
      return [key, value];
    })
  );

  return obj;
};
