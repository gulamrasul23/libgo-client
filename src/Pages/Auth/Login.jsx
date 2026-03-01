import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { loginGoogle, loginUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = useWatch({
    control,
    name: "email",
  });

  const handleGoogleIn = () => {
    if (loading) return;
    setLoading(true);
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

        return axiosSecure.post("/users", profileInfo);
      })
      .then(() => {
        Swal.fire({
          title: "Success..!",
          text: "Login successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogin = (data) => {
    if (loading) return;
    setLoading(true);
    loginUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          title: "Success..!",
          text: "Sign In successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(location.state || "/");
        reset();
      })
      .catch((error) => {
        Swal.fire({
          title: "Something Went Wrong...!",
          text: `${error.message}`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [eye, setEye] = useState(false);

  const handleToggleShow = (e) => {
    e.preventDefault();
    setEye(!eye);
  };

  return (
    <div className="pt-19 bg-base-100 flex items-center justify-center p-4">
      <title>LibGo_Login</title>
      <div className="card lg:card-side bg-base-100 shadow-2xl max-w-md w-full overflow-hidden border border-base-200">
        <div className="card-body lg:w-1/2 justify-center px-8 lg:px-12 py-10">
          <h1 className="text-3xl font-bold text-center mb-2 text-primary">
            <p className="font-bold">
              <span className="text-[#0D9470] ">Lib</span>
              <span className="text-[#f78d20]">Go</span>
            </p>
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Welcome back! Please login to your account.
          </p>

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex items-center justify-center"
          >
            <fieldset className="fieldset rounded-box w-[280px] sm:w-xs ">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input border-primary/50 outline-primary "
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Please enter your email.</p>
              )}

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
                  className="input font-sans border-primary/50 outline-primary "
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
                  type="button"
                  onClick={handleToggleShow}
                  className=" cursor-pointer absolute right-4 top-3 border-none bg-transparent"
                >
                  {eye ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              <div>
                <Link
                  to="/reset"
                  state={{ email }}
                  className="label-text-alt link link-hover text-primary text-[14px]"
                >
                  Forgot password?
                </Link>
              </div>
              
              <button type="submit" disabled ={loading} className="btn btn-primary mt-4">{loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
              </button>
            </fieldset>
          </form>
          <div className="divider text-gray-400 text-sm">OR LOGIN WITH</div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleGoogleIn}
              disabled={loading}
              className={`btn bg-white text-black border-primary/50  ${loading ? "opacity-30 cursor-not-allowed" : ""}`}
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
            Don't have an account?{" "}
            <Link
              state={location.state}
              to="/register"
              className="link link-primary font-bold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
