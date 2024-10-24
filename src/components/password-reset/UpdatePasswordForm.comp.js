import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "./passwordAction";

const initialState = {
	pin: "",
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

const UpdatePasswordForm = () => {
	const dispatch = useDispatch();

	const [newPassword, setNewPassword] = useState(initialState);
	const [passwordError, setPasswordError] = useState(passVerificationError);

	const { isLoading, status, message, email } = useSelector(
		(state) => state.password
	);

	const handleOnChange = (e) => {
		const { name, value } = e.target;

		setNewPassword({ ...newPassword, [name]: value });

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
				confirmPass: newPassword.password === value,
			});
		}
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const { pin, password } = newPassword;

		const newPassObj = {
			pin,
			newPassword: password,
			email,
		};
		dispatch(updatePassword(newPassObj));
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
			<h1 className="text-2xl font-semibold text-blue-600">Update Password</h1>
			<hr className="my-4" />
			{message && (
				<div
					className={`p-4 mb-4 text-sm rounded-lg ${
						status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
					}`}
					role="alert"
				>
					{message}
				</div>
			)}
			{isLoading && (
				<div className="flex justify-center">
					<svg
						className="animate-spin h-5 w-5 text-blue-600"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							fill="none"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8v5a3 3 0 00-3 3H4z"
						/>
					</svg>
				</div>
			)}

			<form onSubmit={handleOnSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">OTP</label>
					<input
						type="number"
						name="pin"
						value={newPassword.pin}
						onChange={handleOnChange}
						placeholder="OTP"
						required
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">Password</label>
					<input
						type="password"
						name="password"
						value={newPassword.password}
						onChange={handleOnChange}
						placeholder="Password"
						required
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">Confirm Password</label>
					<input
						type="password"
						name="confirmPass"
						value={newPassword.confirmPass}
						onChange={handleOnChange}
						placeholder="Confirm Password"
						required
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				{!passwordError.confirmPass && (
					<div className="text-red-600 mb-3">Password doesn't match!</div>
				)}

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
					className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default UpdatePasswordForm;
