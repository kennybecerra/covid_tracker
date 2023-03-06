const formatNumber = (num: number, short: boolean = false): string => {
  let decimal = num % 1;
  let integer = Math.floor(num);

  let formatted = `${integer
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}${
    decimal > 0 ? '.' + decimal.toFixed(2).split('.')[1] : ''
  }`;

  if (!short) return formatted;

  switch (formatted.length) {
    case 4:
    case 5:
    case 6:
    case 7:
      formatted = formatted.substring(0, formatted.length - 4) + 'K';
      break;
    case 8:
    case 9:
    case 10:
    case 11:
      formatted = formatted.substring(0, formatted.length - 8) + 'M';
      break;
    case 12:
    case 13:
    case 14:
    case 15:
      formatted = formatted.substring(0, formatted.length - 12) + 'B';
      break;
    default:
      break;
  }

  return formatted;
};

export default formatNumber;
