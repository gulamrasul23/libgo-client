import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaSave,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import imageCompression from "browser-image-compression";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigate } from "react-router";
import useRole from "../../hooks/useRole";
import { useEffect, useState } from "react";
const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const { data: thisUser = {}, refetch } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (thisUser) {
      reset({ name: thisUser.displayName })
    }
  }, [thisUser, reset])

  const handleUpdate = async (data) => {
    setLoading(true);
    const profileImg = data.photo[0];
    let profileImgUrl = thisUser?.photoURL;

    if (profileImg) {
      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 400,
        useWebWorker: true,
      };
      let compressedFile;
      try {
        compressedFile = await imageCompression(profileImg, options);
      } catch (error) {
        Swal.fire({
          title: "Something Went Wrong...!",
          text: `${error.message}`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
        return;
      }
      const formData = new FormData();
      formData.append("image", compressedFile);
      const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`;
      try {
        const res = await axios.post(image_api_url, formData);
        profileImgUrl = res.data.data.url;
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
    const userProfile = {
      displayName: data.name,
      photoURL: profileImgUrl,
    };

    updateUser(userProfile)
      .then(() => {
        axiosSecure
          .patch(`/users?email=${user.email}`, userProfile)
          .then((res) => {
            if (res.data.modifiedCount > 0) {

              if (role === 'librarian') {
                axiosSecure.patch(`/books/manage-books?email=${user.email}`, { librarianPhotoUrl: profileImgUrl })
                  .then((res) => {
                    if (res.data.modifiedCount > 0) {
                      reset();
                      Swal.fire({
                        title: "Success..!",
                        text: "Updated Profile Successfully!",
                        icon: "success",
                      });
                      refetch();
                    }
                  }).catch((error) => {
                    Swal.fire({
                      title: "Something Went Wrong...!",
                      text: `${error.message}`,
                      icon: "error",
                      confirmButtonText: "Try Again",
                    });
                  });
              } else {
                reset();
                Swal.fire({
                  title: "Success..!",
                  text: "Updated Profile Successfully!",
                  icon: "success",
                });
                refetch();
              }

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
      })
      .catch((error) => {
        Swal.fire({
          title: "Something Went Wrong...!",
          text: `${error.message}`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
    setLoading(false);

  };
  if (role === 'admin') {
    return <Navigate to="/dashboard/admin-profile" replace></Navigate>
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans text-base-content">
      <title>LibGo_My_Profile</title>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 lg:basis-2/3 bg-base-100 shadow-md border border-base-200 rounded-xl p-6 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative group shrink-0">
              <div className="w-40 h-40 rounded-full border-4 border-base-100 shadow-xl overflow-hidden ring ring-primary ring-offset-primary ring-offset-2">
                <img
                  referrerPolicy="no-referrer"
                  src={thisUser.photoURL}
                  onError={(e) => {
                    e.target.src = "/user-icon.png";
                  }}
                  alt={thisUser.displayName}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left space-y-4 w-full">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-base-content">
                  {thisUser.displayName}
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                  <span className="badge badge-primary badge-lg">
                    {thisUser.userType}
                  </span>
                  <span className="text-xs text-base-content/50 font-mono bg-base-200 px-2 py-1 rounded">
                    {thisUser.role}
                  </span>
                </div>
              </div>
              <div className="divider my-2"></div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm">
                <div className="p-3 bg-base-200/50 rounded-lg flex items-center gap-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-full">
                    <FaEnvelope />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-base-content/50 font-bold uppercase">
                      Email
                    </p>
                    <p className="font-medium truncate">{thisUser.email}</p>
                  </div>
                </div>
                <div className="p-3 bg-base-200/50 rounded-lg flex items-center gap-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-full">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/50 font-bold uppercase">
                      Joined
                    </p>
                    <p className="font-medium">
                      {new Date(thisUser.createdAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:basis-1/3 bg-base-100 shadow-sm border border-base-200 rounded-xl p-6 h-fit">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FaUser className="text-primary" /> Update Profile
          </h3>
          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="flex flex-col gap-4"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Display Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter name"
                className="input input-bordered w-full focus:outline-none focus:border-primary transition-all"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Please enter your name.</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Profile Photo</span>
              </label>
              <input
                type="file"
                {...register("photo")}
                accept="image/*"
                className="file-input file-input-bordered file-input-primary w-full file-input-sm"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/50">
                  Email (Read Only)
                </span>
              </label>
              <input
                type="text"
                value={thisUser?.email || ''}
                readOnly
                className="input input-bordered w-full bg-base-200 text-base-content/50 cursor-not-allowed h-10 text-sm"
              />
            </div>
            <div className="mt-2">
              <button
                type="submit"
                className="btn btn-primary hover:btn-secondary w-full shadow-lg shadow-primary/20"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <><FaSave />Save Changes</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
