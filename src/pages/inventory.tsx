import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import InventoryFilters from "@/components/inventory/InventoryFilters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Edit, Trash2, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddBirdsForm from "@/components/inventory/AddBirdsForm";
import RecordMortalityForm from "@/components/inventory/RecordMortalityForm";
import AssignBirdsForm from "@/components/inventory/AssignBirdsForm";
import MarkForSaleForm from "@/components/inventory/MarkForSaleForm";

const Inventory = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    birdType: "all",
    coup: "all",
    healthStatus: "all",
    ageGroup: "all",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // In a real application, you would fetch new data based on these filters
    console.log("Filters changed:", newFilters);
  };

  const handleFormSubmit = (formData) => {
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formData);
    setActiveDialog(null); // Close the dialog after submission
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Helmet>
        <title>Inventory | Poultry Farm Management System</title>
      </Helmet>

      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Inventory" notificationCount={3} userName="John Doe" />

        {/* Inventory Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Dialog
                open={activeDialog === "add-birds"}
                onOpenChange={(open) => !open && setActiveDialog(null)}
              >
                <DialogTrigger asChild>
                  <Button onClick={() => setActiveDialog("add-birds")}>
                    <Plus className="h-4 w-4 mr-2" /> Add Birds
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <AddBirdsForm onSubmit={handleFormSubmit} />
                </DialogContent>
              </Dialog>

              <Dialog
                open={activeDialog === "record-mortality"}
                onOpenChange={(open) => !open && setActiveDialog(null)}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setActiveDialog("record-mortality")}
                  >
                    <AlertCircle className="h-4 w-4 mr-2" /> Record Mortality
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <RecordMortalityForm onSubmit={handleFormSubmit} />
                </DialogContent>
              </Dialog>

              <Dialog
                open={activeDialog === "assign-birds"}
                onOpenChange={(open) => !open && setActiveDialog(null)}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setActiveDialog("assign-birds")}
                  >
                    <FileText className="h-4 w-4 mr-2" /> Assign to Coup
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <AssignBirdsForm onSubmit={handleFormSubmit} />
                </DialogContent>
              </Dialog>

              <Dialog
                open={activeDialog === "mark-for-sale"}
                onOpenChange={(open) => !open && setActiveDialog(null)}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setActiveDialog("mark-for-sale")}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Mark for Sale
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <MarkForSaleForm onSubmit={handleFormSubmit} />
                </DialogContent>
              </Dialog>
            </div>

            {/* Inventory Filters */}
            <InventoryFilters onFilterChange={handleFilterChange} />

            {/* Inventory Overview */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold mb-6">Bird Inventory</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                  <h3 className="text-lg font-medium mb-2">Layers</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold">3,240</span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      Healthy
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Across 3 coups
                  </p>
                </div>

                <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                  <h3 className="text-lg font-medium mb-2">Broilers</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold">2,040</span>
                    <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Monitor
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Across 2 coups
                  </p>
                </div>

                <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                  <h3 className="text-lg font-medium mb-2">Total Birds</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold">5,280</span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Tracked
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Across all coups
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Birds</TabsTrigger>
                    <TabsTrigger value="layers">Layers</TabsTrigger>
                    <TabsTrigger value="broilers">Broilers</TabsTrigger>
                    <TabsTrigger value="for-sale">For Sale</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <h3 className="text-xl font-medium mb-4">
                      Inventory by Coup
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border p-2 text-left">Coup ID</th>
                            <th className="border p-2 text-left">Bird Type</th>
                            <th className="border p-2 text-left">Count</th>
                            <th className="border p-2 text-left">
                              Age (weeks)
                            </th>
                            <th className="border p-2 text-left">
                              Health Status
                            </th>
                            <th className="border p-2 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-2">Coup A</td>
                            <td className="border p-2">Layers</td>
                            <td className="border p-2">1,200</td>
                            <td className="border p-2">24</td>
                            <td className="border p-2">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                Healthy
                              </span>
                            </td>
                            <td className="border p-2">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="View Details"
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="border p-2">Coup B</td>
                            <td className="border p-2">Layers</td>
                            <td className="border p-2">1,040</td>
                            <td className="border p-2">18</td>
                            <td className="border p-2">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                Healthy
                              </span>
                            </td>
                            <td className="border p-2">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="View Details"
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="border p-2">Coup C</td>
                            <td className="border p-2">Layers</td>
                            <td className="border p-2">1,000</td>
                            <td className="border p-2">12</td>
                            <td className="border p-2">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                Healthy
                              </span>
                            </td>
                            <td className="border p-2">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="View Details"
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="border p-2">Coup D</td>
                            <td className="border p-2">Broilers</td>
                            <td className="border p-2">1,200</td>
                            <td className="border p-2">6</td>
                            <td className="border p-2">
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                                Monitor
                              </span>
                            </td>
                            <td className="border p-2">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="View Details"
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="border p-2">Coup E</td>
                            <td className="border p-2">Broilers</td>
                            <td className="border p-2">840</td>
                            <td className="border p-2">4</td>
                            <td className="border p-2">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                Healthy
                              </span>
                            </td>
                            <td className="border p-2">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="View Details"
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="layers">
                    <h3 className="text-xl font-medium mb-4">
                      Layers Inventory
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border p-2 text-left">Coup ID</th>
                            <th className="border p-2 text-left">Count</th>
                            <th className="border p-2 text-left">
                              Age (weeks)
                            </th>
                            <th className="border p-2 text-left">
                              Production Rate
                            </th>
                            <th className="border p-2 text-left">
                              Health Status
                            </th>
                            <th className="border p-2 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-2">Coup A</td>
                            <td className="border p-2">1,200</td>
                            <td className="border p-2">24</td>
                            <td className="border p-2">85%</td>
                            <td className="border p-2">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                Healthy
                              </span>
                            </td>
                            <td className="border p-2">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="View Details"
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="border p-2">Coup B</td>
                            <td className="border p-2">1,040</td>
                            <td className="border p-2">18</td>
                            <td className="border p-2">78%</td>
                            <td className="border p-2">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                Healthy
                              </span>
                            </td>
                            <td className="border p-2">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="View Details"
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="border p-2">Coup C</td>
                            <td className="border p-2">1,000</td>
                            <td className="border p-2">12</td>
                            <td className="border p-2">65%</td>
                            <td className="border p-2">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                Healthy
                              </span>
                            </td>
                            <td className="border p-2">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="View Details"
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="broilers">
                    <h3 className="text-xl font-medium mb-4">
                      Broilers Inventory
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border p-2 text-left">Coup ID</th>
                            <th className="border p-2 text-left">Count</th>
                            <th className="border p-2 text-left">
                              Age (weeks)
                            </th>
                            <th className="border p-2 text-left">
                              Weight (kg)
                            </th>
                            <th className="border p-2 text-left">
                              Health Status
                            </th>
                            <th className="border p-2 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-2">Coup D</td>
                            <td className="border p-2">1,200</td>
                            <td className="border p-2">6</td>
                            <td className="border p-2">1.8</td>
                            <td className="border p-2">
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                                Monitor
                              </span>
                            </td>
                            <td className="border p-2">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="View Details"
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="border p-2">Coup E</td>
                            <td className="border p-2">840</td>
                            <td className="border p-2">4</td>
                            <td className="border p-2">1.2</td>
                            <td className="border p-2">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                Healthy
                              </span>
                            </td>
                            <td className="border p-2">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="View Details"
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="for-sale">
                    <h3 className="text-xl font-medium mb-4">
                      Birds Marked for Sale
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border p-2 text-left">Coup ID</th>
                            <th className="border p-2 text-left">Bird Type</th>
                            <th className="border p-2 text-left">Count</th>
                            <th className="border p-2 text-left">
                              Age (weeks)
                            </th>
                            <th className="border p-2 text-left">
                              Target Sale Date
                            </th>
                            <th className="border p-2 text-left">
                              Expected Price
                            </th>
                            <th className="border p-2 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-2">Coup D</td>
                            <td className="border p-2">Broilers</td>
                            <td className="border p-2">500</td>
                            <td className="border p-2">6</td>
                            <td className="border p-2">2023-06-25</td>
                            <td className="border p-2">$12.50/bird</td>
                            <td className="border p-2">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="View Details"
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Cancel Sale"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="border p-2">Coup A</td>
                            <td className="border p-2">Layers</td>
                            <td className="border p-2">300</td>
                            <td className="border p-2">72</td>
                            <td className="border p-2">2023-06-30</td>
                            <td className="border p-2">$8.00/bird</td>
                            <td className="border p-2">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="View Details"
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Cancel Sale"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
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

export default Inventory;
