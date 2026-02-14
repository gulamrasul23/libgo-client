import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleReset = (data) => {
    resetPassword(data.email)
      .then(() => {
        Swal.fire({
          title: "Success..!",
          text: "Please check your email inbox and spam",
          icon: "info",
        });
        navigate("/login")
      })
      .catch(error => {
        Swal.fire({
          title: "Something Went Wrong...!",
          text: `${error.message}`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      })
  }
  return (
    <div className="pt-19 bg-base-100 flex items-center justify-center p-4">
      <title>LibGo_Reset_Password</title>
      <div className="card lg:card-side bg-base-100 shadow-2xl max-w-md w-full overflow-hidden border border-base-200">
        <div className="card-body lg:w-1/2 justify-center px-8 lg:px-12 py-10">
          <h2 className="text-3xl font-bold text-center mb-2 text-primary"><h1 className='font-bold'><span className='text-[#0D9470] '>Lib</span><span className='text-[#f78d20]'>Go</span></h1></h2>
          <p className="text-center text-gray-500 mb-8">Reset your password.</p>
          <form onSubmit={handleSubmit(handleReset)} className="flex items-center justify-center">
            <fieldset className="fieldset rounded-box w-[280px] sm:w-xs ">
              <label className="label"><span className="label-text font-semibold">Email Address</span></label>
              <input
                type="email"
                defaultValue={location.state?.email}
                {...register('email', { required: true })}
                className="input border-primary/50"
                placeholder="Email"
              />{errors.email?.type === 'required' && <p className="text-red-500">Please enter your email.</p>}
              <div>
              </div>
              <button className="btn btn-primary mt-4">Reset</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;