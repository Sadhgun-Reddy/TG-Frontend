import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllTickets } from "./ticketsAction";

import { Link } from "react-router-dom";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { SearchForm } from "../../components/search-form/SearchForm.comp";
import { TicketTable } from "../../components/ticket-table/TicketTable.comp";

export const TicketLists = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <PageBreadcrumb page="Ticket Lists" />
      </div>

      <div className="flex justify-between items-center mt-4">
        <Link to="/add-ticket">
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Add New Ticket
          </button>
        </Link>
        <SearchForm />
      </div>

      <hr className="my-6" />

      <div className="mt-4">
        <TicketTable />
      </div>
    </div>
  );
};
