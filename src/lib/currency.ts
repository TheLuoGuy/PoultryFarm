import { createContext, useContext, useState } from "react";

export type CurrencyType = {
  code: string;
  symbol: string;
  name: string;
};

export const currencies: CurrencyType[] = [
  { code: "UGX", symbol: "UGX", name: "Ugandan Shilling" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
  { code: "TZS", symbol: "TSh", name: "Tanzanian Shilling" },
  { code: "RWF", symbol: "RF", name: "Rwandan Franc" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
];

type CurrencyContextType = {
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
  formatCurrency: (amount: number) => string;
};

const defaultCurrency = currencies[0]; // UGX as default

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: defaultCurrency,
  setCurrency: () => {},
  formatCurrency: () => "",
});

export const useCurrency = () => useContext(CurrencyContext);

export const formatCurrency = (
  amount: number,
  currency: CurrencyType,
): string => {
  return `${currency.symbol} ${amount.toLocaleString()}`;
};
