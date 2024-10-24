import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordResetOtp } from "./passwordAction";

export const ResetPassword = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");

	const { isLoading, status, message } = useSelector(state => state.password);

	const handleOnResetSubmit = e => {
		e.preventDefault();
		dispatch(sendPasswordResetOtp(email));
	};

	const handleOnChange = e => {
		const { value } = e.target;
		setEmail(value);
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
			<h1 className="text-2xl font-semibold text-blue-600 text-center">Reset Password</h1>
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
				<div className="flex justify-center mb-4">
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

			<form autoComplete="off" onSubmit={handleOnResetSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">Email Address</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={handleOnChange}
						placeholder="Enter Email"
						required
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Reset Password
				</button>
			</form>

			<hr className="my-4" />
		</div>
	);
};
