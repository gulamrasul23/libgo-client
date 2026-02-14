import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router";
import imageCompression from "browser-image-compression";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { registerUser, updateUser, loginGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const handleRegister = async (data) => {
    const profileImg = data.photo[0];
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

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", compressedFile);
        const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`;
        axios.post(image_api_url, formData).then((res) => {

          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          const profileInfo = {
            displayName: data.name,
            photoURL: res.data.data.url,
            email: data.email,
            role: "customer",
            userType: "General User",
            createdAt: new Date(),
          };
          updateUser(userProfile)
            .then(() => {
              axiosSecure
                .post("/users", profileInfo)
                .then((res) => {
                  if (res.data.insertedId) {
                    reset();
                    Swal.fire({
                      title: "Success..!",
                      text: "Registered successfully!",
                      icon: "success",
                    });
                    navigate(location?.state || "/");
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
  };

  const handleGoogleIn = () => {
    loginGoogle()
      .then((result) => {
        const user = result.user;

        const profileInfo = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "customer",
          userType: "General User",
          createdAt: new Date(),
        };

        axiosSecure
          .post("/users", profileInfo)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Success..!",
                text: "Registered successfully!",
                icon: "success",
              });
              navigate(location?.state || "/");
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
        Swal.fire({
          title: "Success..!",
          text: "Login successfully!",
          icon: "success",
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        Swal.fire({
          title: "Something Went Wrong...!",
          text: `${error.message}`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  const [eye, setEye] = useState(false);

  const handleToggleShow = (e) => {
    e.preventDefault();
    setEye(!eye);
  };
  return (
    <div className="pt-19 bg-base-100 flex items-center justify-center p-4">
      <title>LibGo_Register</title>
      <div className="card lg:card-side bg-base-100 shadow-2xl max-w-md w-full overflow-hidden border border-base-200">
        <div className="card-body lg:w-1/2 justify-center px-8 lg:px-12 py-10">
          <h2 className="text-3xl font-bold text-center mb-2 text-primary">
            <h1 className="font-bold">
              <span className="text-[#0D9470] ">Lib</span>
              <span className="text-[#f78d20]">Go</span>
            </h1>
          </h2>
          <p className="text-center text-gray-500 mb-5">
            Welcome to LibGo.! Register now to get started.
          </p>

          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex items-center justify-center"
          >
            <fieldset className="fieldset rounded-box w-[280px] sm:w-xs ">
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input border-primary/50"
                placeholder="Your name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Please enter your name.</p>
              )}

              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input border-primary/50"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Please enter your email.</p>
              )}

              <label className="label">
                <span className="label-text font-semibold">Your Photo</span>
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("photo", { required: true })}
                className="file-input file-input-primary"
              />

              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="relative">
                <input
                  type={eye ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  })}
                  className="input font-sans border-primary/50"
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Please enter your password.</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500">
                    Invalid password! It must contain: At least 6 characters,
                    One uppercase letter, One lowercase letter.
                  </p>
                )}

                <button
                  onClick={handleToggleShow}
                  className=" cursor-pointer absolute right-4 top-3 border-none bg-transparent"
                >
                  {eye ? (
                    <Eye className="text-primary" size={18} />
                  ) : (
                    <EyeOff className="text-primary" size={18} />
                  )}
                </button>
              </div>
              <div></div>
              <button className="btn btn-primary mt-4">Sign Up</button>
            </fieldset>
          </form>
          <div className="divider text-gray-400 text-sm">OR LOGIN WITH</div>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleGoogleIn}
              className="btn bg-white text-black border-primary/50"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link
              state={location.state}
              to="/login"
              className="link link-primary font-bold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
