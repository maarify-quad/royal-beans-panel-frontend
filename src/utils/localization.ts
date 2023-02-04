export const formatCurrency = (value: number, locale = "tr-TR", currency = "TRY") => {
  return Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};
