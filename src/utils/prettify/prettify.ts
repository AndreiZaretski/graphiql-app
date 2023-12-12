export const prettifyData = (data: string, initialTab?: number) => {
  let dataPrettified = '';
  let tabIndex = initialTab || 0;
  let firstBracket = true;

  for (let i = 0; i < data.length; i++) {
    switch (data[i]) {
      case '{': {
        if (!firstBracket) tabIndex++;
        if (data[i - 1] === ',' || data[i - 1] === '[')
          dataPrettified += '  '.repeat(tabIndex) + data[i] + '\n';
        else dataPrettified += data[i] + '\n';
        firstBracket = false;
        break;
      }
      case '[': {
        tabIndex++;
        dataPrettified += data[i] + '\n';
        break;
      }
      case '}':
      case ']': {
        dataPrettified += '\n' + '  '.repeat(tabIndex) + data[i];
        if (tabIndex) tabIndex--;
        break;
      }
      case ':': {
        dataPrettified += data[i] + ' ';
        break;
      }
      case ',': {
        dataPrettified += data[i] + '\n';
        break;
      }
      case '(': {
        const closeBracket = data.indexOf(')', i);
        dataPrettified += prettifyFunctionParameters(
          data.slice(i, closeBracket + 1),
          tabIndex + 1
        );
        i = closeBracket;
        break;
      }
      default: {
        if (data[i - 1] === '{' || data[i - 1] === ',') {
          dataPrettified += '  '.repeat(tabIndex + 1) + data[i];
        } else if (data[i - 1] === '}') {
          dataPrettified += '\n' + '  '.repeat(tabIndex + 1) + data[i];
        } else dataPrettified += data[i];
      }
    }
  }
  return dataPrettified;
};

const prettifyFunctionParameters = (data: string, tabIndex: number) => {
  let parametersData = '';
  if (data.includes('{')) {
    parametersData = data
      .slice(1, data.length - 1)
      .split(',')
      .map((el) => {
        return (
          '\n' +
          '  '.repeat(tabIndex + 1) +
          prettifyData(el.trim(), tabIndex + 1)
        );
      })
      .join(',');
  }

  return parametersData
    ? '(' + parametersData + '\n' + '  '.repeat(tabIndex) + ')'
    : data;
};

export const removeTrailingSpacesEnterComments = (data: string) => {
  let dataWithoutComments = '';
  if (data.includes('//') || data.includes('/*')) {
    for (let i = 0; i < data.length; i++) {
      switch (data[i] + data[i + 1]) {
        case '//': {
          i =
            data.indexOf('\n', i) !== -1
              ? data.indexOf('\n', i)
              : data.length - 1;
          break;
        }
        case '/*': {
          i = data.indexOf('*/', i) + 1;
          break;
        }
        default:
          dataWithoutComments += data[i];
      }
    }
  }
  const stringFromData = (dataWithoutComments || data)
    .split('\n')
    .join('')
    .split('\t')
    .join('')
    .trim();
  let resultString = '';
  for (let i = 0; i < stringFromData.length; i++) {
    if (
      stringFromData[i] === ' ' &&
      (stringFromData[i - 1] === ' ' ||
        stringFromData[i - 1] === '{' ||
        stringFromData[i - 1] === '}')
    ) {
      continue;
    } else {
      resultString += stringFromData[i];
    }
  }
  return resultString;
};
