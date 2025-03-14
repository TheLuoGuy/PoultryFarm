import React, { useState, useEffect } from "react";
import {
  CurrencyContext,
  currencies,
  CurrencyType,
  formatCurrency,
} from "@/lib/currency";

interface CurrencyProviderProps {
  children: React.ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({
  children,
}) => {
  // Try to get saved currency from localStorage, default to UGX
  const [currency, setCurrency] = useState<CurrencyType>(() => {
    const savedCurrency = localStorage.getItem("currency");
    if (savedCurrency) {
      try {
        return JSON.parse(savedCurrency);
      } catch (e) {
        return currencies[0]; // Default to UGX
      }
    }
    return currencies[0]; // Default to UGX
  });

  // Save currency to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(currency));
  }, [currency]);

  const handleSetCurrency = (newCurrency: CurrencyType) => {
    setCurrency(newCurrency);
  };

  const handleFormatCurrency = (amount: number) => {
    return formatCurrency(amount, currency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: handleSetCurrency,
        formatCurrency: handleFormatCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
