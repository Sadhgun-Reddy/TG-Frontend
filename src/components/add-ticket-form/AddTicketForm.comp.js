import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openNewTicket } from "./addTicketAction";
import { shortText } from "../../utils/validation";
import { restSuccessMSg } from "./addTicketSlicer";
import "./add-ticket-form.style.css";

const initialFrmDt = {
  subject: "",
  issueDate: "",
  message: "",
};
const initialFrmError = {
  subject: false,
  issueDate: false,
  message: false,
};

export const AddTicketForm = () => {
  const dispatch = useDispatch();

  const {
    user: { name },
  } = useSelector((state) => state.user);

  const { isLoading, error, successMsg } = useSelector(
    (state) => state.openTicket
  );

  const [frmData, setFrmData] = useState(initialFrmDt);
  const [frmDataErro, setFrmDataErro] = useState(initialFrmError);

  useEffect(() => {
    return () => {
      successMsg && dispatch(restSuccessMSg());
    };
  }, [dispatch, frmData, frmDataErro]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFrmData({
      ...frmData,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setFrmDataErro(initialFrmError);

    const isSubjectValid = await shortText(frmData.subject);

    setFrmDataErro({
      ...initialFrmError,
      subject: !isSubjectValid,
    });

    dispatch(openNewTicket({ ...frmData, sender: name }));
  };

  return (
    <div className="mt-8 mx-auto p-8 bg-gray-100 rounded shadow-lg max-w-lg">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Add New Ticket</h1>
      <hr className="mb-6" />
      <div>
        {error && <div className="bg-red-100 text-red-800 p-2 rounded mb-4">{error}</div>}
        {successMsg && <div className="bg-blue-100 text-blue-800 p-2 rounded mb-4">{successMsg}</div>}
        {isLoading && (
          <div className="flex justify-center mb-4">
            <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
        )}
      </div>
      <form autoComplete="off" onSubmit={handleOnSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={frmData.subject}
            onChange={handleOnChange}
            maxLength="100"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Subject"
            required
          />
          {frmDataErro.subject && (
            <p className="text-red-500 text-sm mt-1">Subject is required!</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Issue Found</label>
          <input
            type="date"
            name="issueDate"
            value={frmData.issueDate}
            onChange={handleOnChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Message</label>
          <textarea
            name="message"
            rows="5"
            value={frmData.message}
            onChange={handleOnChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Open Ticket
        </button>
      </form>
    </div>
  );
};
