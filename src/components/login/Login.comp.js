import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { loginPending, loginSuccess, loginFail } from "./loginSlice";
import { userLogin } from "../../api/userApi";
import { getUserProfile } from "../../pages/dashboard/userAction";

export const LoginForm = ({ formSwitcher }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate(); // Use useNavigate instead of useHistory
	let location = useLocation();

	const { isLoading, isAuth, error } = useSelector(state => state.login);
	let { from } = location.state || { from: { pathname: "/" } };

	useEffect(() => {
		if (sessionStorage.getItem("accessJWT")) {
			navigate(from, { replace: true }); // Use navigate instead of history.replace
		}
	}, [navigate, from, isAuth]);

	const [email, setEmail] = useState("e2@e.com");
	const [password, setPassword] = useState("password#1F");

	const handleOnChange = e => {
		const { name, value } = e.target;

		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};

	const handleOnSubmit = async e => {
		e.preventDefault();

		if (!email || !password) {
			return alert("Fill up all the form!");
		}

		dispatch(loginPending());

		try {
			const isAuth = await userLogin({ email, password });

			if (isAuth.status === "error") {
				return dispatch(loginFail(isAuth.message));
			}

			dispatch(loginSuccess());
			dispatch(getUserProfile());
			navigate("/dashboard"); // Use navigate instead of history.push
		} catch (error) {
			dispatch(loginFail(error.message));
		}
	};

	return (
		<div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
			<h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Client Login</h1>
			<hr className="mb-6" />
			{error && <div className="bg-red-100 text-red-800 p-2 rounded mb-4">{error}</div>}
			<form autoComplete="off" onSubmit={handleOnSubmit}>
				<div className="mb-4">
					<label className="block text-gray-700 font-semibold mb-2">Email Address</label>
					<input
						type="email"
						name="email"
						onChange={handleOnChange}
						placeholder="Enter Email"
						required
						className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-semibold mb-2">Password</label>
					<input
						type="password"
						name="password"
						onChange={handleOnChange}
						placeholder="Password"
						required
						className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
				>
					Login
				</button>
				{isLoading && (
					<div className="flex justify-center mt-4">
						<svg
							className="animate-spin h-5 w-5 text-blue-600"
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
			</form>
			<hr className="my-6" />
			<div className="text-center">
				<a href="/password-reset" className="text-blue-600 hover:underline">Forget Password?</a>
			</div>
			<div className="text-center py-4">
				<p>
					Are you new here?{" "}
					<a href="/registration" className="text-blue-600 hover:underline">Register Now</a>
				</p>
			</div>
		</div>
	);
};

LoginForm.propTypes = {
	formSwitcher: PropTypes.func.isRequired,
};
