import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { PrivateRoute } from "./components/private-route/PrivateRoute.comp";
import { Entry } from "./pages/entry/Entry.page";
import { Registration } from "./pages/registration/Registration.page";
import { PasswordOtpForm } from "./pages/password-reset/PasswordOtpForm.page";
import { UserVerification } from "./pages/user-verification/UserVerification.page";
import { Dashboard } from "./pages/dashboard/Dashboard.page";
import { AddTicket } from "./pages/new-ticket/AddTicket.page";
import { TicketLists } from "./pages/ticket-list/TicketLists.page";
import { Ticket } from "./pages/ticket/Ticket.page";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Entry />} />
					<Route path="/registration" element={<Registration />} />
					<Route path="/password-reset" element={<PasswordOtpForm />} />
					<Route path="/verification/:_id/:email" element={<UserVerification />} />

					<Route element={<PrivateRoute />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/add-ticket" element={<AddTicket />} />
						<Route path="/ticket/:tId" element={<Ticket />} />
						<Route path="/tickets" element={<TicketLists />} />
					</Route>

					<Route path="*" element={<h1>404 Page not found</h1>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
