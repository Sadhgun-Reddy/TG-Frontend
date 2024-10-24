import React from "react";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { AddTicketForm } from "../../components/add-ticket-form/AddTicketForm.comp";

export const AddTicket = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-4">
        <PageBreadcrumb page="New Ticket" />
      </div>

      <div>
        <AddTicketForm />
      </div>
    </div>
  );
};
