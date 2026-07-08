const normalizeInvoiceNumber = (value) => {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
};

export const getNextInvoiceNumberValue = (existingInvoiceNumbers = []) => {
  const numericValues = existingInvoiceNumbers
    .map(normalizeInvoiceNumber)
    .filter(Boolean)
    .map((number) => Number.parseInt(number, 10))
    .filter((number) => Number.isFinite(number) && number >= 0);

  const highest = numericValues.length ? Math.max(...numericValues) : 0;

  return String(highest + 1).padStart(2, "0");
};

export const resolveInvoiceNumber = (
  providedInvoiceNumber,
  existingInvoiceNumbers = []
) => {
  const normalized = normalizeInvoiceNumber(providedInvoiceNumber);

  if (normalized) {
    return normalized;
  }

  return getNextInvoiceNumberValue(existingInvoiceNumbers);
};
