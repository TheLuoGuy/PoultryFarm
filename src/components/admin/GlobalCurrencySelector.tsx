import React, { useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const GlobalCurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  const handleCurrencyChange = (value: string) => {
    const selectedCurrency = currencies.find((c) => c.code === value);
    if (selectedCurrency) {
      setCurrency(selectedCurrency);
      toast({
        title: "Currency Updated",
        description: `System currency has been updated to ${selectedCurrency.name}`,
      });
    }
  };

  const resetToDefault = () => {
    setCurrency(currencies[0]); // Reset to UGX
    toast({
      title: "Currency Reset",
      description: "System currency has been reset to Ugandan Shilling (UGX)",
    });
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
            <div className="mt-4">
              <Button variant="outline" onClick={resetToDefault}>
                Reset to Default (UGX)
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalCurrencySelector;
