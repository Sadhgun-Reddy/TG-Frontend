import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { userRegistrationVerification } from "../../api/userApi";

const initialResponse = {
  status: "",
  message: "",
};

export const UserVerification = () => {
  const { _id, email } = useParams();
  const dt = { _id, email };

  const [response, setResponse] = useState(initialResponse);

  useEffect(() => {
    const apiCall = async () => {
      const result = await userRegistrationVerification(dt);
      setResponse(result);
    };

    !response.status && apiCall();
  }, [response]);

  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center">
      <div className="mt-5 bg-white p-6 rounded-lg shadow-lg">
        {!response.status && (
          <div className="flex justify-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          </div>
        )}

        {response.status && (
          <div
            className={`${
              response.status === "success" ? "bg-green-100" : "bg-red-100"
            } text-${response.status === "success" ? "green" : "red"}-800 p-4 rounded`}
          >
            {response.message}
          </div>
        )}
      </div>
    </div>
  );
};
