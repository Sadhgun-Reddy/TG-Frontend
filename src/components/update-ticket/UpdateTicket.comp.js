import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import { replyOnTicket } from "../../pages/ticket-list/ticketsAction";

export const UpdateTicket = ({ _id }) => {
  const dispatch = useDispatch();
  const {
    user: { name },
  } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const msgObj = {
      message,
      sender: name,
    };

    dispatch(replyOnTicket(_id, msgObj));
    setMessage("");
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-md">
      <form onSubmit={handleOnSubmit}>
        <label className="block text-lg font-semibold mb-2">Reply</label>
        <p className="text-gray-600 mb-4">
          Please reply to your message here or update the ticket.
        </p>
        <textarea
          value={message}
          onChange={handleOnChange}
          rows="5"
          name="detail"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Type your message here..."
        />
        <div className="text-right mt-3">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Reply
          </button>
        </div>
      </form>
    </div>
  );
};

UpdateTicket.propTypes = {
  _id: PropTypes.string.isRequired,
};
