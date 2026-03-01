import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyWishlist = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: wishlists = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlists/my-wishlist`);
      return res.data;
    },
  });

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/wishlists/my-wishlist?wishlistId=${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Something Went Wrong...!",
              text: `${error.message}`,
              icon: "error",
              confirmButtonText: "Try Again",
            });
          });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-285px)] flex items-center justify-center bg-base-100">
        <span className="loading loading-bars loading-xl "></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 px-4 py-4 md:py-10">
      <title>LibGo_My_Wishlist</title>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 md:mb-10 text-primary">
          My Wishlist ({wishlists.length})
        </h2>

        {wishlists.length === 0 ? (
          <div className="text-center mt-20">
            <h3 className="text-2xl font-bold text-gray-500">
              Your wishlist is empty!
            </h3>
            <Link to="/books" className="btn btn-primary mt-5">
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlists.map((book) => (
              <div
                key={book._id}
                className="card bg-base-200 shadow-xl transition hover:scale-105 duration-300"
              >
                <figure className="px-2 pt-2">
                  <img
                    src={book.bookImage}
                    alt={book.bookTitle}
                    className="rounded-xl h-60 object-contain w-full"
                  />
                </figure>
                <div className="card-body items-center text-center  w-full">
                  <div className="flex justify-between items-center gap-1 w-full">
                    <div>
                      <h2 className="card-title text-xl">{book.bookTitle}</h2>
                      <p className="font-bold text-lg text-secondary">
                        ${book.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm opacity-70">
                        Category: {book.category}
                      </p>
                      <p className="text-sm opacity-70">
                        Added:{" "}
                        {new Date(book.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="card-actions mt-4 w-full flex justify-between">
                    <button
                      onClick={() => handleRemove(book.wishlistId)}
                      className="btn btn-error btn-sm text-white"
                    >
                      Remove
                    </button>
                    <Link
                      to={`/book-details/${book.wishlistId}`}
                      className="btn btn-primary btn-sm"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishlist;
