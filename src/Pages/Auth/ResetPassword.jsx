import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useState } from 'react';

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  
   const [loading, setLoading] = useState(false);
  const handleReset = (data) => {
    if (loading) return;
    setLoading(true);
    resetPassword(data.email)
      .then(() => {
        
        Swal.fire({
          title: "Success..!",
          text: "Please check your email inbox and spam folder",
          icon: "info",
          confirmButtonText: "Okay"
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {         
            navigate(-1);
          }
        });
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
  return (
    <div className="pt-19 bg-base-100 flex items-center justify-center p-4">
      <title>LibGo_Reset_Password</title>
      <div className="card lg:card-side bg-base-100 shadow-2xl max-w-md w-full overflow-hidden border border-base-200">
        <div className="card-body lg:w-1/2 justify-center px-8 lg:px-12 py-10">
          <div className="text-3xl font-bold text-center mb-2 text-primary"><h2 className='font-bold'><span className='text-[#0D9470] '>Lib</span><span className='text-[#f78d20]'>Go</span></h2></div>
          <p className="text-center text-gray-500 mb-8">Reset your password.</p>
          <form onSubmit={handleSubmit(handleReset)} className="flex items-center justify-center">
            <fieldset className="fieldset rounded-box w-[280px] sm:w-xs ">
              <label className="label"><span className="label-text font-semibold">Email Address</span></label>
              <input
                type="email"
                defaultValue={email}
                {...register('email', { required: true })}
                className="input border-primary/50 outline-primary"
                placeholder="Email"
              />{errors.email?.type === 'required' && <p className="text-red-500">Please enter your email.</p>}
              <div>
              </div>
              <button type='submit' className="btn btn-primary mt-4">{loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Reset Password"
              )}</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;