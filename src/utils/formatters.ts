export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
};

export const calculateDiscount = (price: number, oldPrice?: number): number => {
  if (!oldPrice) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
};
