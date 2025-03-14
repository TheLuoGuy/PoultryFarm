import React, { useState } from "react";
import { useCurrency } from "@/lib/currency";
import { Helmet } from "react-helmet";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import RecordIncomeForm from "@/components/financials/RecordIncomeForm";
import RecordExpenseForm from "@/components/financials/RecordExpenseForm";
import GenerateReportForm from "@/components/financials/GenerateReportForm";

const Financials = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const { formatCurrency } = useCurrency();

  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    setActiveDialog(null); // Close the dialog after submission
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Helmet>
        <title>Financials | Poultry Farm Management System</title>
      </Helmet>

      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Financials" notificationCount={2} userName="John Doe" />

        {/* Financials Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto space-y-6">
            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Revenue
                  </CardTitle>
                  <div className="rounded-full bg-green-100 p-2 w-fit">
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(24680)}
                  </div>
                  <p className="flex items-center text-xs mt-1">
                    <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-green-500">12.5%</span>
                    <span className="text-muted-foreground ml-1">
                      from last month
                    </span>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Expenses
                  </CardTitle>
                  <div className="rounded-full bg-red-100 p-2 w-fit">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(16240)}
                  </div>
                  <p className="flex items-center text-xs mt-1">
                    <ArrowUp className="mr-1 h-4 w-4 text-red-500" />
                    <span className="text-red-500">8.3%</span>
                    <span className="text-muted-foreground ml-1">
                      from last month
                    </span>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Net Profit
                  </CardTitle>
                  <div className="rounded-full bg-blue-100 p-2 w-fit">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(8440)}
                  </div>
                  <p className="flex items-center text-xs mt-1">
                    <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-green-500">18.7%</span>
                    <span className="text-muted-foreground ml-1">
                      from last month
                    </span>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pending Payments
                  </CardTitle>
                  <div className="rounded-full bg-yellow-100 p-2 w-fit">
                    <FileText className="h-4 w-4 text-yellow-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(3250)}
                  </div>
                  <p className="flex items-center text-xs mt-1">
                    <ArrowDown className="mr-1 h-4 w-4 text-green-500" />
                    <span className="text-green-500">5.2%</span>
                    <span className="text-muted-foreground ml-1">
                      from last month
                    </span>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Dialog
                open={activeDialog === "record-income"}
                onOpenChange={(open) => !open && setActiveDialog(null)}
              >
                <DialogTrigger asChild>
                  <Button onClick={() => setActiveDialog("record-income")}>
                    <Plus className="h-4 w-4 mr-2" /> Record Income
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <RecordIncomeForm onSubmit={handleFormSubmit} />
                </DialogContent>
              </Dialog>

              <Dialog
                open={activeDialog === "record-expense"}
                onOpenChange={(open) => !open && setActiveDialog(null)}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setActiveDialog("record-expense")}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Record Expense
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <RecordExpenseForm onSubmit={handleFormSubmit} />
                </DialogContent>
              </Dialog>

              <Dialog
                open={activeDialog === "generate-report"}
                onOpenChange={(open) => !open && setActiveDialog(null)}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setActiveDialog("generate-report")}
                  >
                    <FileText className="h-4 w-4 mr-2" /> Generate Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <GenerateReportForm onSubmit={handleFormSubmit} />
                </DialogContent>
              </Dialog>
            </div>

            {/* Financial Details Tabs */}
            <Tabs defaultValue="income" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent
                value="income"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <h3 className="text-xl font-semibold mb-4">
                  Income Transactions
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Date</th>
                        <th className="border p-2 text-left">Description</th>
                        <th className="border p-2 text-left">Category</th>
                        <th className="border p-2 text-left">Amount</th>
                        <th className="border p-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">2023-06-15</td>
                        <td className="border p-2">Egg Sales - Retail</td>
                        <td className="border p-2">Product Sales</td>
                        <td className="border p-2">{formatCurrency(1250)}</td>
                        <td className="border p-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">2023-06-12</td>
                        <td className="border p-2">Egg Sales - Wholesale</td>
                        <td className="border p-2">Product Sales</td>
                        <td className="border p-2">{formatCurrency(3450)}</td>
                        <td className="border p-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">2023-06-10</td>
                        <td className="border p-2">
                          Broiler Sales - Restaurant A
                        </td>
                        <td className="border p-2">Bird Sales</td>
                        <td className="border p-2">{formatCurrency(2800)}</td>
                        <td className="border p-2">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                            Pending
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">2023-06-05</td>
                        <td className="border p-2">
                          Egg Sales - Supermarket B
                        </td>
                        <td className="border p-2">Product Sales</td>
                        <td className="border p-2">{formatCurrency(1850)}</td>
                        <td className="border p-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">2023-06-01</td>
                        <td className="border p-2">Manure Sales</td>
                        <td className="border p-2">Other</td>
                        <td className="border p-2">{formatCurrency(450)}</td>
                        <td className="border p-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            Completed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent
                value="expenses"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <h3 className="text-xl font-semibold mb-4">
                  Expense Transactions
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Date</th>
                        <th className="border p-2 text-left">Description</th>
                        <th className="border p-2 text-left">Category</th>
                        <th className="border p-2 text-left">Amount</th>
                        <th className="border p-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">2023-06-14</td>
                        <td className="border p-2">
                          Feed Purchase - Supplier X
                        </td>
                        <td className="border p-2">Feed</td>
                        <td className="border p-2">{formatCurrency(3200)}</td>
                        <td className="border p-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            Paid
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">2023-06-10</td>
                        <td className="border p-2">Medication - Vitamins</td>
                        <td className="border p-2">Medicine</td>
                        <td className="border p-2">{formatCurrency(850)}</td>
                        <td className="border p-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            Paid
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">2023-06-08</td>
                        <td className="border p-2">Electricity Bill</td>
                        <td className="border p-2">Utilities</td>
                        <td className="border p-2">{formatCurrency(1250)}</td>
                        <td className="border p-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            Paid
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">2023-06-05</td>
                        <td className="border p-2">Staff Salaries</td>
                        <td className="border p-2">Labor</td>
                        <td className="border p-2">{formatCurrency(4500)}</td>
                        <td className="border p-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            Paid
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">2023-06-01</td>
                        <td className="border p-2">Equipment Maintenance</td>
                        <td className="border p-2">Maintenance</td>
                        <td className="border p-2">{formatCurrency(750)}</td>
                        <td className="border p-2">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                            Pending
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent
                value="reports"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <h3 className="text-xl font-semibold mb-4">
                  Financial Reports
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>Income Statement</CardTitle>
                      <CardDescription>
                        Monthly profit and loss report
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        View detailed breakdown of income and expenses for the
                        current month.
                      </p>
                      <button className="text-primary hover:underline">
                        Generate Report
                      </button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>Cash Flow</CardTitle>
                      <CardDescription>Cash movement analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Track cash inflows and outflows to manage liquidity
                        effectively.
                      </p>
                      <button className="text-primary hover:underline">
                        Generate Report
                      </button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>Balance Sheet</CardTitle>
                      <CardDescription>
                        Assets and liabilities overview
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Complete financial position of your poultry farm
                        business.
                      </p>
                      <button className="text-primary hover:underline">
                        Generate Report
                      </button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>Tax Report</CardTitle>
                      <CardDescription>
                        Tax liability calculation
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Prepare for tax season with organized financial data.
                      </p>
                      <button className="text-primary hover:underline">
                        Generate Report
                      </button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>Expense Analysis</CardTitle>
                      <CardDescription>
                        Detailed expense breakdown
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Analyze where your money is being spent to optimize
                        costs.
                      </p>
                      <button className="text-primary hover:underline">
                        Generate Report
                      </button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>Revenue Analysis</CardTitle>
                      <CardDescription>Income source breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Understand which products are generating the most
                        revenue.
                      </p>
                      <button className="text-primary hover:underline">
                        Generate Report
                      </button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Poultry Farm Management System. All
          rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Financials;
