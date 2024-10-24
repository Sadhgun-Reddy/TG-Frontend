import React from "react";
import RegistrationForm from "../../components/registration-form/RegistrationForm.comp";
import "./registration.style.css";

export const Registration = () => {
  return (
    <div className="registration-page bg-blue-400 min-h-screen flex items-center justify-center">
      <div className="mt-5">
        <div className="bg-white p-6 rounded shadow-lg">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};
