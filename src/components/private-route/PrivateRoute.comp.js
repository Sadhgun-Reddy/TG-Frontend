import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Navigate } from "react-router-dom"; // Change Redirect to Navigate
import { loginSuccess } from "../login/loginSlice";
import { getUserProfile } from "../../pages/dashboard/userAction";
import { fetchNewAccessJWT } from "../../api/userApi";
import { DefaultLayout } from "../../layout/DefaultLayout";

export const PrivateRoute = ({ children, ...rest }) => {
	const dispatch = useDispatch();
	const { isAuth } = useSelector((state) => state.login);
	const { user } = useSelector((state) => state.user);

	useEffect(() => {
		const updateAccessJWT = async () => {
			const result = await fetchNewAccessJWT();
			if (result) {
				dispatch(loginSuccess());
			}
		};

		if (!user._id) {
			dispatch(getUserProfile());
		}

		if (!sessionStorage.getItem("accessJWT") && localStorage.getItem("crmSite")) {
			updateAccessJWT();
		}

		if (!isAuth && sessionStorage.getItem("accessJWT")) {
			dispatch(loginSuccess());
		}
	}, [dispatch, isAuth, user._id]);

	return (
		<Route
			{...rest}
			element={
				isAuth ? (
					<DefaultLayout>{children}</DefaultLayout>
				) : (
					<Navigate to="/" replace /> // Use Navigate instead of Redirect
				)
			}
		/>
	);
};
