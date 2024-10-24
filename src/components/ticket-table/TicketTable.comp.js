import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const TicketTable = () => {
  const { searchTicketList, isLoading, error } = useSelector(
    (state) => state.tickets
  );

  if (isLoading) return <h3>Loading ...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjects</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opened Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {searchTicketList.length ? (
            searchTicketList.map((row) => (
              <tr key={row._id}>
                <td className="px-6 py-4 whitespace-nowrap">{row._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/ticket/${row._id}`} className="text-blue-600 hover:text-blue-800">
                    {row.subject}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{row.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {row.openAt && new Date(row.openAt).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center px-6 py-4">
                No ticket show
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
