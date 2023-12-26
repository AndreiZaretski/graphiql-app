export const IsJsonString = (str: string) => {
  str = str.trim();
  if (str === '') {
    return true;
  }
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
