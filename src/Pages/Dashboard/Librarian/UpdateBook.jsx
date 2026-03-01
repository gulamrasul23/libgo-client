import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import imageCompression from "browser-image-compression";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AddBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const { data: updateBook, isLoading } = useQuery({
    queryKey: ["update-book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/update-book/${id}`);
      return res.data;
    },
  });

  const {
    register: bookInfoUpdate,
    handleSubmit: handleBookInfoUpdate,
    formState: { errors },
    reset: bookReset,
  } = useForm();
  const {
    register: bookStatusUpdate,
    handleSubmit: handleBookStatusUpdate,
    reset: statusReset,
  } = useForm();

  useEffect(() => {
    if (updateBook) {
      statusReset({
        status: updateBook.status,
      });
      bookReset({
        bookTitle: updateBook.bookTitle || "",
        author: updateBook.author || "",
        price: updateBook.price || "",
        category: updateBook.category || "",
        description: updateBook.description || "",
      });
    }
  }, [updateBook, statusReset, bookReset]);

  const handleStatus = async (data) => {
    setLoading(true);
    try {
      const res = await axiosSecure.patch(`/books/update-book/${id}`, {
        status: data.status,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success..!",
          text: "Book Status updated successfully.",
          icon: "success",
        });
        navigate("/dashboard/my-book");
      }
    } catch (error) {
      Swal.fire({
        title: "Something Went Wrong...!",
        text: `${error.message}`,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
    setLoading(false);
  };

  const handleUpdateBook = async (data) => {
    setLoading(true);
    const files =
      data.photo && data.photo.length > 0 ? Array.from(data.photo) : null;
    let bookImageUrl = updateBook?.bookImage;
    let galleryImageUrls = updateBook?.galleryImages || [];

    if (files) {
      const options = {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
      };
      const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`;
      try {
        const uploadPromises = files.map(async (file) => {
          const compressedFile = await imageCompression(file, options);
          const formData = new FormData();
          formData.append("image", compressedFile);
          const res = await axios.post(image_api_url, formData);
          return res.data.data.url;
        });

        const uploadedImageUrls = await Promise.all(uploadPromises);
        bookImageUrl = uploadedImageUrls[0];
        galleryImageUrls = uploadedImageUrls;
      } catch (error) {
        Swal.fire({
          title: "Something Went Wrong...!",
          text: `${error.message}`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
        setLoading(false);
        return;
      }
    }

    const bookInfo = {
      bookImage: bookImageUrl,
      galleryImages: galleryImageUrls,
      bookTitle: data.bookTitle,
      author: data.author,
      status: data.status,
      price: data.price,
      description: data.description,
      category: data.category,
    };

    try {
      const res = await axiosSecure.patch(`/books/update-book/${id}`, bookInfo);
      if (res.data.modifiedCount > 0) {
        bookReset();
        Swal.fire({
          title: "Success..!",
          text: "Book information updated successfully.",
          icon: "success",
        });
        navigate("/dashboard/my-book");
      }
    } catch (error) {
      Swal.fire({
        title: "Something Went Wrong...!",
        text: `${error.message}`,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
    setLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-285px)] flex items-center justify-center bg-base-100">
        <span className="loading loading-bars loading-xl "></span>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-base-300/50 flex items-center p-2 justify-center ">
      <title>LibGo_Update_Book</title>
      <div className="w-full max-w-4xl bg-base-100 rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-secondary px-4 py-3 mb-4 gap-4 sm:gap-1 flex flex-col sm:flex-row items-center rounded-xl  justify-between ">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white">
              Update Book Status
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              Toggle radio for Published / Unpublished status.
            </p>
          </div>
          <form
            onSubmit={handleBookStatusUpdate(handleStatus)}
            className="flex gap-1 items-center"
          >
            <div className="">
              <label className="pr-2 flex items-center text-white font-medium">
                <input
                  type="radio"
                  {...bookStatusUpdate("status")}
                  value="Published"
                  className="radio radio-primary mr-1"
                />
                Published
              </label>
            </div>
            <div>
              <label className="pr-2 flex items-center text-white font-medium">
                <input
                  type="radio"
                  {...bookStatusUpdate("status")}
                  value="Unpublished"
                  className="radio radio-primary mr-1"
                />
                Unpublished
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary shadow-lg shadow-primary/20`}
            >
              <FaSave /> Save
            </button>
          </form>
        </div>
        <div className="bg-primary px-4 py-3 flex items-center justify-center rounded-t-2xl ">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Edit Book Details</h2>
            <p className="text-blue-100 text-sm mt-1">
              Fill in the details to update a book to the inventory
            </p>
          </div>
        </div>
        <form
          onSubmit={handleBookInfoUpdate(handleUpdateBook)}
          className="p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Book Title
              </label>
              <input
                type="text"
                {...bookInfoUpdate("bookTitle", { required: true })}
                placeholder="e.g. The Great Gatsby"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              {errors.bookTitle?.type === "required" && (
                <p className="text-red-500">Please enter book title.</p>
              )}
            </div>
            <div className="form-control">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Author Name
              </label>
              <input
                type="text"
                {...bookInfoUpdate("author", { required: true })}
                placeholder="e.g. F. Scott Fitzgerald"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              {errors.author?.type === "required" && (
                <p className="text-red-500">Please enter book author.</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Chose Photo
              </label>
              <input
                type="file"
                multiple
                {...bookInfoUpdate("photo")}
                accept="image/*"
                className="file-input file-input-bordered file-input-primary w-full  file-input-md"
              />
            </div>
            <div className="form-control">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                {...bookInfoUpdate("category", { required: true })}
                placeholder="e.g. F. Scott Fitzgerald"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              {errors.category?.type === "required" && (
                <p className="text-red-500">Please enter book category.</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                {...bookInfoUpdate("price", {
                  valueAsNumber: true,
                  required: true,
                })}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              {errors.rice?.type === "required" && (
                <p className="text-red-500">Please enter book price.</p>
              )}
              {errors.rice?.type === "valueAsNumber" && (
                <p className="text-red-500">Please enter book price.</p>
              )}
            </div>
            <div className="form-control">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                {...bookInfoUpdate("status", { required: true })}
                className="select select-bordered w-full bg-base-100 focus:bg-base-200  outline-primary transition-all cursor-pointer"
              >
                {" "}
                <option value="" disabled={true}>
                  Select
                </option>
                <option value="Published">Published</option>
                <option value="Published">Unpublished</option>
              </select>
              {errors.status?.type === "required" && (
                <p className="text-red-500">Please chose a status.</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                *Unpublished books will not be visible to users.
              </p>
            </div>
          </div>
          <div className="form-control">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...bookInfoUpdate("description", {
                required: true,
                minLength: 20,
              })}
              rows="4"
              placeholder="Write a short summary of the book..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            ></textarea>
            {errors.description?.type === "required" && (
              <p className="text-red-500">Please chose a status.</p>
            )}
            {errors.description?.type === "minLength" && (
              <p className="text-red-500">
                Description require minimum 20 characters
              </p>
            )}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
              Librarian Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  name="librarianName"
                  value={user.displayName}
                  readOnly
                  className="w-full bg-transparent font-medium text-gray-700 outline-none cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="librarianEmail"
                  value={user.email}
                  readOnly
                  className="w-full bg-transparent font-medium text-gray-700 outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full cursor-pointer bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${loading ? "bg-primary/50 cursor-not-allowed hover:bg-secondary/50" : ""}`}
            >
              {loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Update Book Details"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
