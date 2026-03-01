import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { IoFilterSharp } from "react-icons/io5";
import { Search, Filter } from "lucide-react";
import ManageBooksCard from "./ManageBooksCard/ManageBooksCard";

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedPriceFilters, setAppliedPriceFilters] = useState([]);
  const [appliedDateFilters, setAppliedDateFilters] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const {
    data: { books = [], totalBooks = 0 } = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "books",
      searchTerm,
      appliedPriceFilters,
      appliedDateFilters,
      currentPage,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("page", currentPage);
      params.append("limit", itemsPerPage);

      if (searchTerm) {
        params.append("searchText", searchTerm);
      }
      appliedPriceFilters.forEach((price) =>
        params.append("priceFilters", price),
      );
      appliedDateFilters.forEach((date) => params.append("dateFilters", date));

      const res = await axiosSecure.get(`/books/manage-books`, { params });
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleApplyFilter = () => {
    setCurrentPage(1);
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  const sortBooks = (() => {
    if (sortOrder === "price-low") {
      return [...books].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-high") {
      return [...books].sort((a, b) => b.price - a.price);
    } else {
      return books;
    }
  })();

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setCurrentPage(1);
    setAppliedPriceFilters((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setCurrentPage(1);
    setAppliedDateFilters((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [books]);

  const totalPages = Math.ceil(totalBooks / itemsPerPage);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-285px)] flex items-center justify-center bg-base-100">
        <span className="loading loading-bars loading-xl "></span>
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-screen pt-0 sm:pt-4 p-4 lg:p-8 font-sans">
      <title>LibGo_Manage_Books</title>
      <div className="flex flex-col md:flex-row justify-between lg:items-start md:items-center mb-6 gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-primary">Manage Books</h1>
          <p className="text-base-content/60 mt-1">
            Admin dashboard for publishing and managing library inventory.
          </p>
        </div>
        <div className="flex sm:flex-row sm:items-center justify-between gap-4">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 border-2 border-primary/50 bg-base-100"
            >
              <IoFilterSharp />
              Filter
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-42 p-2 shadow-sm"
            >
              <li>
                <label className="font-bold">Price :</label>
                <label className="label text-base-content">
                  1. $10-$200{" "}
                  <input
                    type="checkbox"
                    value={"10-200"}
                    onChange={handlePriceChange}
                    className="checkbox checkbox-sm checkbox-success"
                  />
                </label>
                <label className="label text-base-content">
                  2. $201-$400{" "}
                  <input
                    type="checkbox"
                    value={"201-400"}
                    onChange={handlePriceChange}
                    className="checkbox checkbox-sm checkbox-success"
                  />
                </label>
                <label className="label text-base-content">
                  3. $401-$1000{" "}
                  <input
                    type="checkbox"
                    value={"401-1000"}
                    onChange={handlePriceChange}
                    className="checkbox checkbox-sm checkbox-success"
                  />
                </label>
              </li>
              <li>
                <label className="font-bold">Date :</label>
                <label className="label text-base-content">
                  1. Last 7 days
                  <input
                    type="checkbox"
                    value={"7"}
                    onChange={handleDateChange}
                    className="checkbox checkbox-sm checkbox-success"
                  />
                </label>
                <label className="label text-base-content">
                  2. Last 30 days{" "}
                  <input
                    type="checkbox"
                    value={"30"}
                    onChange={handleDateChange}
                    className="checkbox checkbox-sm checkbox-success"
                  />
                </label>
                <label className="label text-base-content">
                  2. Last 90 days{" "}
                  <input
                    type="checkbox"
                    value={"90"}
                    onChange={handleDateChange}
                    className="checkbox checkbox-sm checkbox-success"
                  />
                </label>
              </li>
              <li className="p-2">
                <button
                  onClick={handleApplyFilter}
                  className="btn btn-primary hover:btn-secondary "
                >
                  Apply
                </button>
              </li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row items-end sm:items-center pt-1 sm:pt-0  gap-2 ">
            <div className="relative group ">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search books.."
                className="pl-10 py-2.5 max-w-64 border-transparent rounded-xl text-sm  focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none bg-base-100"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="select w-[145px] border-2 border-primary/50 font-medium cursor-pointer outline-none"
              >
                <option value="none" disabled={true}>
                  Sort By Price
                </option>
                <option value="price-low">Low-High</option>
                <option value="price-high">High-Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <ManageBooksCard
        sortBooks={sortBooks}
        isLoading={isLoading}
        refetch={refetch}
      ></ManageBooksCard>
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center mt-12 mb-8">
          <div className="join border border-base-300 shadow-sm rounded-xl">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="join-item btn btn-md bg-base-100 hover:bg-primary hover:text-white border-none disabled:opacity-50"
            >
              «
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`join-item btn btn-md border-none ${
                    currentPage === pageNum
                      ? "bg-primary text-white"
                      : "bg-base-100 hover:bg-base-200"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="join-item btn btn-md bg-base-100 hover:bg-primary hover:text-white border-none disabled:opacity-50"
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
