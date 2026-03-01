import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const MyBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/my-book?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-285px)] flex items-center justify-center bg-base-100">
        <span className="loading loading-bars loading-xl "></span>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-base-200/60 py-5 md:py-10 px-4 md:px-8">
      <title>LibGo_My_Book</title>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className=" text-center md:text-left">
            <h1 className="text-3xl font-bold text-primary">My Books</h1>
            <p className="text-gray-500 mt-1">
              Manage your library inventory here.{" "}
              <span>You have total ( {books.length} ) books.</span>
            </p>
          </div>
          <Link
            to="/dashboard/add-book"
            className="mt-4 md:mt-0 bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all"
          >
            + Add New Book
          </Link>
        </div>
        <div className="bg-base-100 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-base-300 border-b border-gray-200 text-xs uppercase font-bold tracking-wider">
                  <th className="p-5 text-center w-24">Image</th>
                  <th className="p-8 text-center">Book Title</th>
                  <th className="p-5 text-center">Status</th>
                  <th className="p-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {books.map((book) => (
                  <tr key={book._id} className=" ">
                    <td className="p-4 text-center">
                      <div className="w-12 h-16 mx-auto bg-gray-200 rounded overflow-hidden shadow-sm">
                        <img
                          src={book.bookImage}
                          alt={book.bookTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-1 sm:p-4 font-semibold max-w-[20%] text-center ">
                      {book.bookTitle}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full 
                          ${
                            book.status === "Published"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {book.status === "Published"
                          ? "Published"
                          : "Unpublished"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Link
                        to={`/dashboard/update-book/${book._id}`}
                        className="bg-primary hover:bg-secondary text-white text-sm font-medium py-2 px-4 rounded-lg transition-all shadow hover:shadow-md"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {books.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              You haven't added any books yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooks;
