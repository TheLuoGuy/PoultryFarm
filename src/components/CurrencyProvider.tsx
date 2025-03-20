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
    // Clear any potentially corrupted currency data
    try {
      const savedCurrency = localStorage.getItem("currency");
      if (savedCurrency) {
        const parsed = JSON.parse(savedCurrency);
        // Validate the parsed currency against our known currencies
        const isValid = currencies.some((c) => c.code === parsed.code);
        if (isValid) {
          return parsed;
        } else {
          // If invalid, reset to default
          localStorage.removeItem("currency");
          return currencies[0]; // Default to UGX
        }
      }
    } catch (e) {
      // If any error occurs, reset to default
      localStorage.removeItem("currency");
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
