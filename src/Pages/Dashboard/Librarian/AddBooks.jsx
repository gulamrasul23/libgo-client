import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import imageCompression from "browser-image-compression";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import Swal from "sweetalert2";

const AddBook = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAddBook = async (data) => {
    setLoading(true);
    const files = Array.from(data.photo);
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

      const bookInfo = {
        bookImage: uploadedImageUrls[0],
        galleryImages: uploadedImageUrls,
        bookTitle: data.bookTitle,
        author: data.author,
        status: data.status,
        price: data.price,
        description: data.description,
        category: data.category,
        librarianName: user.displayName,
        librarianEmail: user.email,
        librarianPhotoUrl: user.photoURL,
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/books/add-book", bookInfo);

      if (res.data.insertedId) {
        reset();
        Swal.fire({
          title: "Success..!",
          text: "Added a book successfully",
          icon: "success",
        });
        navigate("/books");
      }
    } catch (error) {
      Swal.fire({
        title: "Something Went Wrong...!",
        text: `${error.message}`,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-base-300/50 flex items-center justify-center ">
      <title>LibGo_Add_Book</title>
      <div className="w-full max-w-4xl bg-base-100 rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-primary px-8 py-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Add New Book
          </h2>
          <p className="text-blue-100 text-center text-sm mt-1">
            Fill in the details to add a book to the inventory
          </p>
        </div>
        <form onSubmit={handleSubmit(handleAddBook)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Book Title
              </label>
              <input
                type="text"
                {...register("bookTitle", { required: true })}
                placeholder="e.g. The Great Gatsby"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
                {...register("author", { required: true })}
                placeholder="e.g. F. Scott Fitzgerald"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
                {...register("photo", { required: true })}
                className="file-input file-input-bordered file-input-primary w-full  file-input-md"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500">Please chose a photo.</p>
              )}
            </div>
            <div className="form-control">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                {...register("category", { required: true })}
                placeholder="e.g. F. Scott Fitzgerald"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
                {...register("price", { required: true })}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              {errors.category?.type === "required" && (
                <p className="text-red-500">Please enter book category.</p>
              )}
            </div>
            <div className="form-control">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                {...register("status", { required: true })}
                defaultValue=""
                className="select select-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-all"
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
              {...register("description", { required: true, minLength: 20 })}
              rows="4"
              placeholder="Write a short summary of the book..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
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
              className="w-full cursor-pointer bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Add Book"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
