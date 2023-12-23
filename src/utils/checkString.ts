export const isValidFormat = (str: string) => {
  str = str.trim();

  if (str === '') {
    return true;
  }
  if (str[0] !== '{' || str[str.length - 1] !== '}') {
    return false;
  }

  const pairs = str.slice(1, -1).split(',');
  for (const pair of pairs) {
    let [key, value] = pair.split(':');
    key = key.trim();
    value = value.trim();
    if (
      key[0] !== '"' ||
      key[key.length - 1] !== '"' ||
      value[0] !== '"' ||
      value[value.length - 1] !== '"'
    ) {
      return false;
    }
  }
  return true;
};
