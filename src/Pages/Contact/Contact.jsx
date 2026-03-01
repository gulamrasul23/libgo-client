import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure"; 

const Contact = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      const res = await axiosSecure.post("/contact", data);
      
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          title: "Message Sent!",
          text: "Thank you for contacting Lib-Go. We will get back to you soon.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Oops...!",
        text:`${error.message}`,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 pt-22 py-8 px-4 sm:px-6 lg:px-8">
      <title>Contact Us - LibGo</title>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl font-extrabold text-base-content mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-base-content/60 max-w-2xl mx-auto text-md">
            Have questions about our library collection, memberships, or anything else? 
            We'd love to hear from you. Fill out the form below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-300">
          <div className="bg-primary text-primary-content p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <h2 className=" text-3xl font-bold mb-6">Contact Information</h2>
              <p className="text-primary-content/80 mb-8 leading-relaxed">
                Our librarians and support team are always ready to help you find the perfect book or resolve any issues.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-content/20 p-3 rounded-full shrink-0">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Location</h4>
                    <p className="text-primary-content/80 mt-1">123 Library Street, Bookworm City, BC 4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-content/20 p-3 rounded-full shrink-0">
                    <FaPhoneAlt className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Phone</h4>
                    <p className="text-primary-content/80 mt-1">+880 1234 567 890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-content/20 p-3 rounded-full shrink-0">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Email</h4>
                    <p className="text-primary-content/80 mt-1">support@libgo.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 relative h-32 hidden lg:block">
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-primary-content/10 rounded-full -mr-16 -mb-16 blur-xl"></div>
              <div className="absolute right-10 bottom-10 w-24 h-24 bg-primary-content/10 rounded-full blur-lg"></div>
            </div>
          </div>

          
          <div className="col-span-1 lg:col-span-2 p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-base-content mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content/80">Full Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    placeholder="John Doe"
                    className="input input-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-colors"
                  />
                  {errors.name && <span className="text-error text-sm mt-1">{errors.name.message}</span>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content/80">Email Address</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    placeholder="john@example.com"
                    className="input input-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-colors"
                  />
                  {errors.email && <span className="text-error text-sm mt-1">{errors.email.message}</span>}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content/80">Subject</span>
                </label>
                <input
                  type="text"
                  {...register("subject", { required: "Subject is required" })}
                  placeholder="How can we help you?"
                  className="input input-bordered w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-colors"
                />
                {errors.subject && <span className="text-error text-sm mt-1">{errors.subject.message}</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content/80">Message</span>
                </label>
                <textarea
                  {...register("message", { 
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters long"
                    }
                  })}
                  className="textarea textarea-bordered h-36 w-full bg-base-200 focus:bg-base-100 focus:border-primary transition-colors resize-none text-base"
                  placeholder="Write your message here..."
                ></textarea>
                {errors.message && <span className="text-error text-sm mt-1">{errors.message.message}</span>}
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-primary hover:btn-secondary w-full sm:w-auto px-10 shadow-lg shadow-primary/30"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;