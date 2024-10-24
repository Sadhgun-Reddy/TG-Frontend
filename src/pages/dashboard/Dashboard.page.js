import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TicketTable } from "../../components/ticket-table/TicketTable.comp";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { Link } from "react-router-dom";

import { fetchAllTickets } from "../ticket-list/ticketsAction";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);

  useEffect(() => {
    if (!tickets.length) {
      dispatch(fetchAllTickets());
    }
  }, [tickets, dispatch]);

  const pendingTickets = tickets.filter((row) => row.status !== "Closed");
  const totalTickets = tickets.length;

  return (
    <div className="container mx-auto px-4">
      <div className="mb-4">
        <PageBreadcrumb page="Dashboard" />
      </div>
      <div className="text-center mt-5 mb-2">
        <Link to="/add-ticket">
          <button className="bg-blue-500 text-white text-2xl py-2 px-6 rounded hover:bg-blue-600 transition">
            Add New Ticket
          </button>
        </Link>
      </div>
      <div className="text-center mb-2">
        <div>Total tickets: {totalTickets}</div>
        <div>Pending tickets: {pendingTickets.length}</div>
      </div>
      <div className="mt-2">Recently Added tickets</div>
      <hr className="my-4" />

      <div className="recent-ticket">
        <TicketTable tickets={tickets} />
      </div>
    </div>
  );
};
