import React from "react";
import { useCurrency, currencies } from "@/lib/currency";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  const handleCurrencyChange = (value: string) => {
    const selectedCurrency = currencies.find((c) => c.code === value);
    if (selectedCurrency) {
      setCurrency(selectedCurrency);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Currency Settings</CardTitle>
        <CardDescription>
          Set the default currency for the entire system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currency">System Currency</Label>
            <Select value={currency.code} onValueChange={handleCurrencyChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    {curr.symbol} - {curr.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-2">
              This will affect how monetary values are displayed throughout the
              system
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencySelector;
