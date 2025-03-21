import React, { useState } from "react";
import { useCurrency } from "@/lib/currency";
import { Helmet } from "react-helmet";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddCustomerForm from "@/components/customers/AddCustomerForm";
import EditCustomerForm from "@/components/customers/EditCustomerForm";
import PurchaseHistoryView from "@/components/customers/PurchaseHistoryView";
import RecordPaymentForm from "@/components/customers/RecordPaymentForm";
import {
  Search,
  Plus,
  FileText,
  Edit,
  Trash2,
  Phone,
  Mail,
  DollarSign,
} from "lucide-react";

const Customers = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const { formatCurrency } = useCurrency();

  // Mock customer data
  const customers = [
    {
      id: 1,
      name: "Greenfield Supermarket",
      contact: "John Smith",
      email: "john@greenfield.com",
      phone: "(555) 123-4567",
      type: "Retail",
      lastPurchase: "2023-06-10",
      totalSpent: 12450.0,
    },
    {
      id: 2,
      name: "Farm Fresh Restaurant",
      contact: "Sarah Johnson",
      email: "sarah@farmfresh.com",
      phone: "(555) 234-5678",
      type: "Restaurant",
      lastPurchase: "2023-06-15",
      totalSpent: 8320.0,
    },
    {
      id: 3,
      name: "City Grocers",
      contact: "Michael Brown",
      email: "michael@citygrocers.com",
      phone: "(555) 345-6789",
      type: "Wholesale",
      lastPurchase: "2023-06-12",
      totalSpent: 24780.0,
    },
    {
      id: 4,
      name: "Sunrise Bakery",
      contact: "Emily Davis",
      email: "emily@sunrisebakery.com",
      phone: "(555) 456-7890",
      type: "Bakery",
      lastPurchase: "2023-06-08",
      totalSpent: 5640.0,
    },
    {
      id: 5,
      name: "Golden Eggs Distributor",
      contact: "Robert Wilson",
      email: "robert@goldeneggs.com",
      phone: "(555) 567-8901",
      type: "Distributor",
      lastPurchase: "2023-06-14",
      totalSpent: 32150,
    },
  ];

  // Filter customers based on search query
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Helmet>
        <title>Customers | Poultry Farm Management System</title>
      </Helmet>

      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Customers" notificationCount={2} userName="John Doe" />

        {/* Customers Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto space-y-6">
            {/* Search and Add Customer */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Dialog
                  open={activeDialog === "add-customer"}
                  onOpenChange={(open) => !open && setActiveDialog(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="w-full sm:w-auto"
                      onClick={() => setActiveDialog("add-customer")}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Customer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <AddCustomerForm
                      onSubmit={(data) => {
                        console.log("Add customer data:", data);
                        setActiveDialog(null);
                      }}
                    />
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={activeDialog === "record-payment"}
                  onOpenChange={(open) => !open && setActiveDialog(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => setActiveDialog("record-payment")}
                    >
                      <DollarSign className="h-4 w-4 mr-2" /> Record Payment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <RecordPaymentForm
                      onSubmit={(data) => {
                        console.log("Record payment data:", data);
                        setActiveDialog(null);
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Customer List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Customer Directory</h2>
                <p className="text-sm text-muted-foreground">
                  Manage your customer relationships and track purchase history
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted text-sm">
                      <th className="border-b p-3 text-left">Customer Name</th>
                      <th className="border-b p-3 text-left">Contact Person</th>
                      <th className="border-b p-3 text-left">Contact Info</th>
                      <th className="border-b p-3 text-left">Type</th>
                      <th className="border-b p-3 text-left">Last Purchase</th>
                      <th className="border-b p-3 text-left">Total Spent</th>
                      <th className="border-b p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-3">
                          <div className="font-medium">{customer.name}</div>
                        </td>
                        <td className="p-3">{customer.contact}</td>
                        <td className="p-3">
                          <div className="flex flex-col">
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                              {customer.email}
                            </div>
                            <div className="flex items-center text-sm mt-1">
                              <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                              {customer.phone}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                            {customer.type}
                          </span>
                        </td>
                        <td className="p-3">{customer.lastPurchase}</td>
                        <td className="p-3 font-medium">
                          {formatCurrency(customer.totalSpent)}
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Dialog
                              open={activeDialog === `history-${customer.id}`}
                              onOpenChange={(open) =>
                                !open && setActiveDialog(null)
                              }
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="View History"
                                  onClick={() => {
                                    setSelectedCustomer(customer);
                                    setActiveDialog(`history-${customer.id}`);
                                  }}
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <PurchaseHistoryView
                                  customerId={customer.id}
                                  customerName={customer.name}
                                  onRecordPayment={() => {
                                    setActiveDialog(`payment-${customer.id}`);
                                  }}
                                />
                              </DialogContent>
                            </Dialog>

                            <Dialog
                              open={activeDialog === `edit-${customer.id}`}
                              onOpenChange={(open) =>
                                !open && setActiveDialog(null)
                              }
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit Customer"
                                  onClick={() => {
                                    setSelectedCustomer(customer);
                                    setActiveDialog(`edit-${customer.id}`);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl">
                                <EditCustomerForm
                                  customer={{
                                    id: customer.id,
                                    name: customer.name,
                                    contactPerson: customer.contact,
                                    email: customer.email,
                                    phone: customer.phone,
                                    type: customer.type.toLowerCase(),
                                    address: "123 Main St, Anytown, USA",
                                    notes: "",
                                  }}
                                  onSubmit={(data) => {
                                    console.log("Edit customer data:", data);
                                    setActiveDialog(null);
                                  }}
                                  onDelete={(id) => {
                                    console.log("Delete customer:", id);
                                    setActiveDialog(null);
                                  }}
                                />
                              </DialogContent>
                            </Dialog>

                            <Dialog
                              open={activeDialog === `payment-${customer.id}`}
                              onOpenChange={(open) =>
                                !open && setActiveDialog(null)
                              }
                            >
                              <DialogContent className="max-w-3xl">
                                <RecordPaymentForm
                                  customerId={String(customer.id)}
                                  customerName={customer.name}
                                  onSubmit={(data) => {
                                    console.log("Record payment data:", data);
                                    setActiveDialog(null);
                                  }}
                                />
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Delete Customer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredCustomers.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">
                    No customers found matching your search criteria.
                  </p>
                </div>
              )}

              <div className="p-4 border-t border-gray-200 text-sm text-muted-foreground">
                Showing {filteredCustomers.length} of {customers.length}{" "}
                customers
              </div>
            </div>
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

export default Customers;
