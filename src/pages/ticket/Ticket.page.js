import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { MessageHistory } from "../../components/message-history/MessageHistory.comp";
import { UpdateTicket } from "../../components/update-ticket/UpdateTicket.comp";

import { fetchSingleTicket, closeTicket } from "../ticket-list/ticketsAction";
import { resetResponseMsg } from "../ticket-list/ticketsSlice";

export const Ticket = () => {
  const { tId } = useParams();
  const dispatch = useDispatch();
  const {
    isLoading,
    error,
    selectedTicket,
    replyMsg,
    replyTicketError,
  } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(fetchSingleTicket(tId));

    return () => {
      (replyMsg || replyTicketError) && dispatch(resetResponseMsg());
    };
  }, [tId, dispatch, replyMsg, replyTicketError]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <PageBreadcrumb page="Ticket" />
      </div>

      <div className="mb-6">
        {isLoading && (
          <div className="flex justify-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-500"
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
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded">
            {error}
          </div>
        )}
        {replyTicketError && (
          <div className="bg-red-100 text-red-800 p-4 rounded">
            {replyTicketError}
          </div>
        )}
        {replyMsg && (
          <div className="bg-green-100 text-green-800 p-4 rounded">
            {replyMsg}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-700 font-semibold">
          <div>Subject: {selectedTicket.subject}</div>
          <div>
            Ticket Opened:{" "}
            {selectedTicket.openAt &&
              new Date(selectedTicket.openAt).toLocaleString()}
          </div>
          <div>Status: {selectedTicket.status}</div>
        </div>
        <button
          className={`py-2 px-4 border rounded ${
            selectedTicket.status === "Closed"
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          onClick={() => dispatch(closeTicket(tId))}
          disabled={selectedTicket.status === "Closed"}
        >
          Close Ticket
        </button>
      </div>

      <div className="mt-6">
        {selectedTicket.conversations && (
          <MessageHistory msg={selectedTicket.conversations} />
        )}
      </div>

      <hr className="my-6" />

      <div className="mt-6">
        <UpdateTicket _id={tId} />
      </div>
    </div>
  );
};
