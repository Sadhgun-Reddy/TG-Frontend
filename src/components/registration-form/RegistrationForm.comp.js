import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newUserRegistration } from "./userRegAction";

const initialState = {
  name: "Prem Acharya",
  phone: "0410000000",
  email: "fakeemail@email.com",
  company: "Dented Code",
  address: "George st Sydney",
  password: "sfsd#3Dsg",
  confirmPass: "sfsd#3Dsg",
};
const passVerificationError = {
  isLenthy: false,
  hasUpper: false,
  hasLower: false,
  hasNumber: false,
  hasSpclChr: false,
  confirmPass: false,
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState(initialState);
  const [passwordError, setPasswordError] = useState(passVerificationError);
  const { isLoading, status, message } = useSelector(
    (state) => state.registration
  );

  useEffect(() => {}, [newUser]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setNewUser({ ...newUser, [name]: value });

    if (name === "password") {
      const isLenthy = value.length > 8;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpclChr = /[@,#,$,%,&]/.test(value);

      setPasswordError({
        ...passwordError,
        isLenthy,
        hasUpper,
        hasLower,
        hasNumber,
        hasSpclChr,
      });
    }

    if (name === "confirmPass") {
      setPasswordError({
        ...passwordError,
        confirmPass: newUser.password === value,
      });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, company, address, password } = newUser;

    const newRegistration = {
      name,
      phone,
      email,
      company,
      address,
      password,
    };
    dispatch(newUserRegistration(newRegistration));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-info mb-4">User Registration</h1>
      <hr className="mb-4" />
      {message && (
        <div
          className={`mb-4 p-2 rounded ${
            status === "success" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleOnSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            onChange={handleOnChange}
            placeholder="Your name"
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="number"
            name="phone"
            onChange={handleOnChange}
            placeholder="Phone"
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Email address</label>
          <input
            type="email"
            name="email"
            onChange={handleOnChange}
            placeholder="Enter email"
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Company name</label>
          <input
            type="text"
            name="company"
            onChange={handleOnChange}
            placeholder="Company name"
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Address</label>
          <input
            type="text"
            name="address"
            onChange={handleOnChange}
            placeholder="Full address"
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleOnChange}
            placeholder="Password"
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPass"
            onChange={handleOnChange}
            placeholder="Confirm Password"
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="text-red-600 mb-3">
          {!passwordError.confirmPass && "Password doesn't match!"}
        </div>
        <ul className="mb-4">
          <li className={passwordError.isLenthy ? "text-green-600" : "text-red-600"}>
            Min 8 characters
          </li>
          <li className={passwordError.hasUpper ? "text-green-600" : "text-red-600"}>
            At least one upper case
          </li>
          <li className={passwordError.hasLower ? "text-green-600" : "text-red-600"}>
            At least one lower case
          </li>
          <li className={passwordError.hasNumber ? "text-green-600" : "text-red-600"}>
            At least one number
          </li>
          <li className={passwordError.hasSpclChr ? "text-green-600" : "text-red-600"}>
            At least one of the special characters i.e @ # $ % &
          </li>
        </ul>

        <button
          type="submit"
          disabled={Object.values(passwordError).includes(false)}
          className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 disabled:bg-gray-400"
        >
          Submit
        </button>
        {isLoading && (
          <div className="text-info mt-2">
            <div className="spinner-border" role="status"></div> {/* Placeholder for spinner */}
          </div>
        )}
      </form>
      <div className="py-4">
        Already have an account? <a href="/" className="text-blue-500">Login Now</a>
      </div>
    </div>
  );
};

export default RegistrationForm;
