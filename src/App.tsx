import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load pages for better performance
const Dashboard = lazy(() => import("./pages/dashboard"));
const Inventory = lazy(() => import("./pages/inventory"));
const Financials = lazy(() => import("./pages/financials"));
const Customers = lazy(() => import("./pages/customers"));
const Admin = lazy(() => import("./pages/admin"));
const Profile = lazy(() => import("./pages/profile"));
const Settings = lazy(() => import("./pages/settings"));
const Notifications = lazy(() => import("./pages/notifications"));
const Help = lazy(() => import("./pages/help"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/financials" element={<Financials />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/help" element={<Help />} />

          {/* Add this before any catchall route */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
