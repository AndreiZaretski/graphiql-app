export const IsJsonString = (str: string) => {
  str = str.trim();
  if (str === '') {
    return true;
  }
  try {
    const result = JSON.parse(str);
    return typeof result === 'object' && result !== null;
  } catch (e) {
    return false;
  }
};
