const formatNumber = (num: number): string => {
  let decimal = num % 1;
  let integer = Math.floor(num);

  return `${integer.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}${
    decimal > 0 ? '.' + decimal.toFixed(2).split('.')[1] : ''
  }`;
};

export default formatNumber;
