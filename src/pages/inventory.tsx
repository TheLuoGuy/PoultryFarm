import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const Inventory = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
                <h3 className="text-xl font-medium mb-4">Inventory by Coup</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Coup ID</th>
                        <th className="border p-2 text-left">Bird Type</th>
                        <th className="border p-2 text-left">Count</th>
                        <th className="border p-2 text-left">Age (weeks)</th>
                        <th className="border p-2 text-left">Health Status</th>
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
                          <button className="text-blue-600 hover:text-blue-800 mr-2">
                            View
                          </button>
                          <button className="text-blue-600 hover:text-blue-800">
                            Edit
                          </button>
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
                          <button className="text-blue-600 hover:text-blue-800 mr-2">
                            View
                          </button>
                          <button className="text-blue-600 hover:text-blue-800">
                            Edit
                          </button>
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
                          <button className="text-blue-600 hover:text-blue-800 mr-2">
                            View
                          </button>
                          <button className="text-blue-600 hover:text-blue-800">
                            Edit
                          </button>
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
                          <button className="text-blue-600 hover:text-blue-800 mr-2">
                            View
                          </button>
                          <button className="text-blue-600 hover:text-blue-800">
                            Edit
                          </button>
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
                          <button className="text-blue-600 hover:text-blue-800 mr-2">
                            View
                          </button>
                          <button className="text-blue-600 hover:text-blue-800">
                            Edit
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
