import React from "react";
import { Helmet } from "react-helmet";
import LoginForm from "./auth/LoginForm";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Mock function to handle login submission
  const handleLogin = (values: any) => {
    console.log("Login attempt:", values);
    // In a real implementation, this would call an authentication service
    // For now, just navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <Helmet>
        <title>Login | Poultry Farm Management System</title>
      </Helmet>

      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center p-4 md:p-0">
        {/* Left side - Branding and information */}
        <motion.div
          className="w-full md:w-1/2 p-6 md:p-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Poultry Farm Management System
            </h1>
            <p className="text-lg text-slate-600">
              A comprehensive solution for managing all aspects of your poultry
              farm operations.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Financial Management
                </h3>
                <p className="text-slate-600">
                  Track income, expenses, and generate financial reports.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Inventory Tracking
                </h3>
                <p className="text-slate-600">
                  Monitor birds by coup with lifecycle status indicators.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="M4.93 4.93l2.83 2.83" />
                  <path d="M16.24 16.24l2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <path d="M4.93 19.07l2.83-2.83" />
                  <path d="M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Performance Analytics
                </h3>
                <p className="text-slate-600">
                  View key metrics and trends with interactive charts.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Login form */}
        <motion.div
          className="w-full md:w-1/2 p-6 md:p-12"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LoginForm onSubmit={handleLogin} isLoading={false} error={null} />
        </motion.div>
      </div>

      <footer className="w-full text-center p-4 text-sm text-slate-500">
        © {new Date().getFullYear()} Poultry Farm Management System. All rights
        reserved.
      </footer>
    </div>
  );
};

export default Home;
