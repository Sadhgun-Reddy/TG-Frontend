import React from "react";
import { useSelector } from "react-redux";

import { ResetPassword } from "../../components/password-reset/PasswordReset.comp";
import UpdatePasswordForm from "../../components/password-reset/UpdatePasswordForm.comp";

import "./passwordOtpForm.style.css";

// Workflow
// [x] Create password reset page
// [] Add request OTP form
// [] Add redux store with Redux-toolkit to handle the network status
// [] Send OTP to email from API (API Already created)
// [] Load form to input OTP and new password
// [] New password must match confirm password, form validation
// [] Connect to API Endpoint (API Already created)
// [] Add reducer through Redux-toolkit to handle the network status and provide the feedback to the user
// [] Send email, OTP, and new password to update the password.

export const PasswordOtpForm = () => {
  const { showUpdatePassForm } = useSelector((state) => state.password);

  return (
    <div className="entry-page bg-blue-400 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        {showUpdatePassForm ? <UpdatePasswordForm /> : <ResetPassword />}
        <div className="text-center mt-4">
          <a href="/" className="text-blue-500 hover:underline">
            Login Now
          </a>
        </div>
      </div>
    </div>
  );
};
