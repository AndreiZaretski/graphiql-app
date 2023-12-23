export const isValidFormat = (str: string) => {
  str = str.trim();
  if (str === '') {
    return true;
  }
  if (str[0] !== '{' || str[str.length - 1] !== '}') {
    return false;
  }

  //const regex = /(?<!")\s*[:,]\s*(?=")/;
  // const regex =
  //   /^\s*\{(?:\s*"(?:^"\\]|\\.)*"\s*:\s*(?:"(?:[^"\\]|\\.)*"|\d+)\s*,?)*\}\s*$/;
  // // /(?<!")\s*[:,]\s*(?=")/;
  // if (!regex.test(str)) {
  //   console.log('error');
  //   return false;
  //   //new Error('Invalid format: missing commas or colons');
  // }

  const pairs = str.slice(1, -1).split(',');
  //(/(?<!")\s*,\s*(?=")/);
  for (const pair of pairs) {
    //let [key, value] = pair.split(':');
    let [key, value] = pair.split(':');
    //(/(?<!")\s*:\s*(?=")/);

    if (!key || !value) {
      return false;
    }
    key = key.trim();
    value = value.trim();
    if (
      key[0] !== '"' ||
      key[key.length - 1] !== '"'
      //value[0] !== '"' ||
      //value[value.length - 1] !== '"'
    ) {
      return false;
    }
  }
  return true;
};
