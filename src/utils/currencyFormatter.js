export const currencyFormatter = (c_type, number) => {
  const formatter = new Intl.NumberFormat(
    `${c_type === 'USD' ? 'en-US' : c_type === 'AUD' ? 'en-AU' : 'en-TW'}`,
    {
      currency: c_type,
      style: 'currency',
      minimumFractionDigits: 0,
    }
  );
  return formatter.format(number);
};
