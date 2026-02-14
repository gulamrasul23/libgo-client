import { useRef, useState } from "react";
import Swal from "sweetalert2";
import "@smastrom/react-rating/style.css";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import NotFound from "../../Components/NotFound";

const BookDetails = () => {
  const axiosSecure = useAxiosSecure();
  const addressPromise = useLoaderData();
  const { user } = useAuth();
  const { id } = useParams();
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const { data: book = [], isError, isLoading } = useQuery({
    queryKey: ["book-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/book-details/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const region = watch("region");

  const districtByRegion = (region) => {
    const filteredDistricts = addressPromise.filter((c) => c.region === region);
    const districts = filteredDistricts.map((d) => d.district);
    return districts;
  };
  const duplicateRegion = addressPromise.map((r) => r.region);
  const regions = [...new Set(duplicateRegion)];
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => setIsOpen(true);
  const handleModalClose = () => {
    setIsOpen(false);
    reset();
  };

  const handleWishlist = () => {
    const wishlistData = {
      wishlistId: book._id,
      bookTitle: book.bookTitle,
      bookImage: book.bookImage,
      category: book.category,
      price: book.price,
      customerEmail: user.email,
      createdAt: new Date(),
    }
    axiosSecure.post(`/wishlists`, wishlistData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success..!",
            text: "Add wishlist successfully!",
            icon: "success",
          });
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          Swal.fire({
            title: "Alert..!",
            text: "Already added to the wishlist!",
            icon: "info",
          });
        } else {
          Swal.fire({
            title: "Something Went Wrong...!",
            text: `${error.message}`,
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }

      });
  }

  const handleBuy = (data) => {
    const address = [data.region, data.district, data.address].join(", ");
    const orderData = {
      bookId: book._id,
      bookTitle: book.bookTitle,
      price: book.price,
      librarianEmail: book.librarianEmail,
      customerName: user.displayName,
      customerEmail: user.email,
      phone: data.number,
      address: address,
      status: "Pending",
      payment: "Unpaid",
    };

    Swal.fire({
      title: "Are you sure?",
      text: `You will be charged ${book.price} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/orders", orderData)
          .then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                title: "Success..!",
                text: "Already added to the wishlist!",
                icon: "success",
              });
              navigate("/dashboard/my-order");
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
    return <div className=" min-h-[calc(100vh-285px)] flex items-center justify-center">
      <span className="loading loading-bars loading-xl"></span>
    </div>
  }

  if (isError || !book) {
    return <NotFound />;
  }

  return (
    <div className="bg-base-100 py-19 max-w-7xl mx-auto px-6 md:px-12">
      <title>LibGo_Book_Details</title>
      <div className="pb-6 flex md:flex-row flex-col ">
        <figure className="md:w-2/3 h-[500px] sm:h-[700px] md:h-[500px] lg:h-[600px] rounded-l-xl overflow-hidden shadow-md relative">
          <img
            src={book.bookImage}
            alt={book.bookTitle}
            className="w-full h-full object-cover  hover:scale-105 transition-transform duration-700 ease-in-out"
          />

          <div className="absolute inset-0 to-transparent pointer-events-none"></div>
        </figure>
        <div className=" bg-base-100 shadow-sm border w-full border-base-200 rounded-r-xl overflow-hidden">
          <div className=" p-6 sm:py-4">
            <h1 className="text-3xl md:text-5xl font-extrabold sm:mb-2 sm:leading-tight">
              {book.bookTitle}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-base-content/60 font-medium sm:text-lg">
              <span className="flex items-center gap-1 cursor-pointer hover:text-primary">
                Author: {book.author}
              </span>
              <span className="hidden md:inline text-gray-300">|</span>
              <div>
                <div className="badge badge-secondary badge-outline p-3 font-bold">
                  {book.category}
                </div>
              </div>
              <br />
            </div>
            <p className="text-sm text-gray-400">
              Posted: {new Date(book.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className=" flex flex-col h-[calc(100%-128px)] p-6">
            <div className="flex flex-col-reverse lg:flex-row  gap-2 lg:justify-between lg:items-end ">
              <div>
                <p className="text-base-content/60 font-medium">Book Price</p>
                <h2 className="text-3xl font-extrabold text-primary mb2 sm:mb-4">
                  $ {book.price}
                </h2>
                <div>
                  <button
                    onClick={handleModal}
                    className="btn btn-primary  w-full shadow-lg shadow-primary/30 mb-3"
                  >
                    Buy Now
                  </button>
                  <button onClick={handleWishlist} className="btn btn-outline w-full text-base-content hover:bg-secondary">
                    Add to Wishlist
                  </button>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar online">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-primary ring-offset-2">
                      {book?.librarianPhotoUrl ? (
                        <img
                          src={book?.librarianPhotoUrl}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.target.src = "/user-icon.png";
                          }}
                          className=" h-12 w-12 object-cover rounded-full"
                        ></img>
                      ) : (
                        <img
                          src="/user-icon.png"
                          className=" object-cover rounded-full  "
                        ></img>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{book.librarianName}</h3>
                    <div className="badge badge-accent badge-outline text-xs">
                      Verified Librarian
                    </div>
                  </div>
                </div>
                <div className="bg-base-100  rounded-lg text-sm text-base-content/60 break-all border border-base-200">
                  ✉️ {book.librarianEmail}
                </div>
              </div>
            </div>
            <div className="divider my-2 lg:my-4 "></div>
            <div className=" lg:block hidden">
              <h3 className="text-2xl font-bold mb-4 border-b pb-2 inline-block">
                About this Book
              </h3>
              <p className="text-base-content/60 text-lg leading-8 text-justify">
                {book.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" block lg:hidden">
        <h3 className="text-2xl font-bold mb-4 border-b pb-2 inline-block">
          About this Book
        </h3>
        <p className="text-base-content/60 text-lg leading-8 text-justify">
          {book.description}
        </p>
      </div>
      {isOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm sm:p-4 overflow-y-auto"
        >
          <div className="bg-base-100 w-[300px] sm:w-full sm:max-w-xl rounded-2xl shadow-2xl relative  overflow-hidden max-h-[90vh] md:max-h-auto ">
            <button
              onClick={handleModalClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-20 bg-base-100/50 hover:bg-red-500 hover:text-white"
            >
              ✕
            </button>
            <div className="w-full p-8 overflow-y-auto max-h-[85vh]">
              <h2 className="text-2xl font-bold mb-1">Place Order form</h2>
              <p className="text-sm text-gray-500 mb-6">
                Please enter your details for order.
              </p>
              <form
                onSubmit={handleSubmit(handleBuy)}
                className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 "
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content/60 font-bold">
                      Name
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    value={user.displayName}
                    className="input w-full bg-base-200"
                    required
                    readOnly
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content/60 font-bold">
                      Email
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("email")}
                    value={user.email}
                    className="input  w-full bg-base-200"
                    readOnly
                  />
                </div>
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text text-base-content/60 font-bold">
                      Phone Number
                    </span>
                  </label>
                  <input
                    type="number"
                    {...register("number", {
                      required: true,
                      pattern: /^[0-9]{11}$/,
                    })}
                    placeholder="Your Phone Number"
                    className="input input-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-all"
                  />
                  {errors.number?.type === "required" && (
                    <p className="text-red-500">
                      Please enter your phone number.
                    </p>
                  )}
                  {errors.number?.type === "pattern" && (
                    <p className="text-red-500">
                      Please enter valid phone number.
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content/60 font-bold">
                      Region
                    </span>
                  </label>
                  <select
                    {...register("region", { required: true })}
                    defaultValue=""
                    className="select select-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-all"
                  >
                    {" "}
                    <option value="" disabled={true}>
                      Pick a Region
                    </option>
                    {regions.map((region, index) => (
                      <option key={index} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  {errors.region?.type === "required" && (
                    <p className="text-red-500">Please select a Region.</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content/60 font-bold">
                      District
                    </span>
                  </label>
                  <select
                    {...register("district", { required: true })}
                    defaultValue=""
                    placeholder="Pick a District"
                    className="select select-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-all"
                  >
                    <option value="" disabled={true}>
                      Pick a District
                    </option>
                    {districtByRegion(region).map((region, index) => (
                      <option key={index} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  {errors.district?.type === "required" && (
                    <p className="text-red-500">Please select a District.</p>
                  )}
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text text-base-content/60 font-bold">
                      Address
                    </span>
                  </label>
                  <textarea
                    {...register("address", { required: true })}
                    className="textarea textarea-bordered h-25 w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-all sm:text-base leading-relaxed"
                    placeholder="Write your address here..."
                  ></textarea>
                  {errors.address?.type === "required" && (
                    <p className="text-red-500">Please enter your email.</p>
                  )}
                </div>
                <div className="form-control md:col-span-2 mt-4">
                  <div className=" sm:modal-action mt-2">
                    <button
                      type="button"
                      onClick={handleModalClose}
                      className="btn btn-ghost"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary sm:px-8 text-md sm:text-lg hover:shadow-primary/40 transition-transform transform hover:-translate-y-1"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
