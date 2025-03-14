import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, DollarSign } from "lucide-react";

type Purchase = {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  invoiceNumber?: string;
};

type Payment = {
  id: number;
  date: string;
  amount: number;
  method: string;
  reference?: string;
};

type PurchaseHistoryViewProps = {
  customerId: number;
  customerName: string;
  purchases?: Purchase[];
  payments?: Payment[];
  onRecordPayment?: () => void;
};

const PurchaseHistoryView = ({
  customerId,
  customerName = "Customer",
  purchases = [
    {
      id: 1,
      date: "2023-06-15",
      description: "Egg Sales - Retail",
      category: "Product Sales",
      amount: 1250.0,
      status: "paid" as const,
      invoiceNumber: "INV-2023-001",
    },
    {
      id: 2,
      date: "2023-06-10",
      description: "Egg Sales - Wholesale",
      category: "Product Sales",
      amount: 3450.0,
      status: "paid" as const,
      invoiceNumber: "INV-2023-002",
    },
    {
      id: 3,
      date: "2023-06-05",
      description: "Broiler Sales",
      category: "Bird Sales",
      amount: 2800.0,
      status: "pending" as const,
      invoiceNumber: "INV-2023-003",
    },
  ],
  payments = [
    {
      id: 1,
      date: "2023-06-15",
      amount: 1250.0,
      method: "Bank Transfer",
      reference: "REF123456",
    },
    {
      id: 2,
      date: "2023-06-10",
      amount: 3450.0,
      method: "Check",
      reference: "CHK789012",
    },
  ],
  onRecordPayment = () => {},
}: PurchaseHistoryViewProps) => {
  // Calculate totals
  const totalPurchases = purchases.reduce(
    (sum, purchase) => sum + purchase.amount,
    0,
  );
  const totalPayments = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0,
  );
  const balance = totalPurchases - totalPayments;

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">
              {customerName} - Purchase History
            </CardTitle>
            <CardDescription>
              View purchase history and payment records
            </CardDescription>
          </div>
          <Button onClick={onRecordPayment}>
            <DollarSign className="h-4 w-4 mr-2" /> Record Payment
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Purchases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalPurchases.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalPayments.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Current Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
              <p className="text-xs mt-1">
                {balance > 0 ? "Outstanding balance" : "No outstanding balance"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="purchases">
          <TabsList className="mb-4">
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="purchases">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-left">Date</th>
                    <th className="border p-2 text-left">Description</th>
                    <th className="border p-2 text-left">Category</th>
                    <th className="border p-2 text-left">Invoice #</th>
                    <th className="border p-2 text-left">Amount</th>
                    <th className="border p-2 text-left">Status</th>
                    <th className="border p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((purchase) => (
                    <tr key={purchase.id}>
                      <td className="border p-2">{purchase.date}</td>
                      <td className="border p-2">{purchase.description}</td>
                      <td className="border p-2">{purchase.category}</td>
                      <td className="border p-2">
                        {purchase.invoiceNumber || "-"}
                      </td>
                      <td className="border p-2">
                        ${purchase.amount.toFixed(2)}
                      </td>
                      <td className="border p-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            purchase.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : purchase.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {purchase.status.charAt(0).toUpperCase() +
                            purchase.status.slice(1)}
                        </span>
                      </td>
                      <td className="border p-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" /> View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-left">Date</th>
                    <th className="border p-2 text-left">Amount</th>
                    <th className="border p-2 text-left">Method</th>
                    <th className="border p-2 text-left">Reference</th>
                    <th className="border p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="border p-2">{payment.date}</td>
                      <td className="border p-2">
                        ${payment.amount.toFixed(2)}
                      </td>
                      <td className="border p-2">{payment.method}</td>
                      <td className="border p-2">{payment.reference || "-"}</td>
                      <td className="border p-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" /> Receipt
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PurchaseHistoryView;
