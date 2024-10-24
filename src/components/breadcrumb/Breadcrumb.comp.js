import React from "react";
import { Link } from "react-router-dom";

export const PageBreadcrumb = ({ page }) => {
	return (
		<nav className="flex items-center space-x-2">
			<Link to="/" className="text-blue-600 hover:underline">
				Home
			</Link>
			<span className="text-gray-500">/</span>
			<span className="text-gray-700 font-semibold">{page}</span>
		</nav>
	);
};
