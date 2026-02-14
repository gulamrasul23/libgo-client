import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Filter, BookOpen, Star, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Books = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: books = [] } = useQuery({
    queryKey: ['books', searchTerm, 'Published'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books?searchText=${searchTerm}`);
      return res.data;
    }
  })
  const navigate = useNavigate();

  const handleDetails = (id) => {
    navigate(`/book-details/${id}`)
  }

  return (
    <div className="min-h-screen bg-base-200 font-sans pt-16">
      <title>LibGo_Books</title>
      <div className="bg-base-200 border-b border-gray-200 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                <BookOpen className="text-blue-600" />
                Library Collection
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Showing {books.length} books curated by librarians
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search books..."
                  className="pl-10 pr-4 py-2.5 w-64 bg-base-100 border-transparent rounded-xl text-sm focus:bg-base-100 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                <Filter size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book) => (
            <div key={book._id}
              onClick={() => handleDetails(book._id)}
              className="group relative bg-base-300 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-base-100"
            >
              <div className="relative h-85 sm:h-70 md:h-64 overflow-hidden">
                <img
                  src={book.bookImage}
                  alt={book.bookTitle}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                    {book.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold text-base-content ">
                      {book?.rating || "0"}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-secondary transition-colors">
                  {book.bookTitle}
                </h3>
                <p className="text-gray-500 text-sm mb-4">by {book.author}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400 font-medium">
                    View Details
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center text-black justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Books;
