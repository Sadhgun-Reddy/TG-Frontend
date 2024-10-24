import React from "react";
import { useDispatch } from "react-redux";
import { filterSerachTicket } from "../../pages/ticket-list/ticketsAction";

export const SearchForm = () => {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { value } = e.target;
    dispatch(filterSerachTicket(value));
  };

  return (
    <div className="flex items-center mb-4">
      <label className="mr-2 font-semibold" htmlFor="searchStr">
        Search:
      </label>
      <input
        type="text"
        name="searchStr"
        onChange={handleOnChange}
        placeholder="Search ..."
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
      />
    </div>
  );
};
