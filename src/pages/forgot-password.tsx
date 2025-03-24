import React, { useState } from "react";
import { Helmet } from "react-helmet";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Mock function to handle password reset request
  const handlePasswordReset = (values: { email: string }) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, always show success
      setSuccess(
        `Password reset instructions sent to ${values.email}. Please check your inbox.`,
      );

      // In a real implementation, this would call an API endpoint
      console.log("Password reset requested for:", values.email);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <Helmet>
        <title>Forgot Password | Poultry Farm Management System</title>
      </Helmet>

      <div className="w-full max-w-6xl flex flex-col items-center p-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ForgotPasswordForm
            onSubmit={handlePasswordReset}
            isLoading={isLoading}
            error={error}
            success={success}
          />
        </motion.div>
      </div>

      <footer className="w-full text-center p-4 text-sm text-slate-500">
        © {new Date().getFullYear()} Poultry Farm Management System. All rights
        reserved.
      </footer>
    </div>
  );
};

export default ForgotPassword;
