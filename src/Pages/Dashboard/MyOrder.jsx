import React, { useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useSearchParams } from "react-router";

const MyOrder = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: myOrders = [], refetch } = useQuery({
    queryKey: ["my-order", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?customerEmail=${user.email}`);
      return res.data;
    },
  });

  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  

  useEffect(() => {
        if(sessionId){
            axiosSecure.patch(`/dashboard/my-order?session_id=${sessionId}`)
            .then((res) => {
                if(res.data.success){
                    refetch();
                }
            })
        }
  },[sessionId,axiosSecure,refetch])
  

  const handlePayment = async (order) => {
    const paymentInfo = {
            price: order.price,
            bookTitle: order.bookTitle,
            customerEmail: order.customerEmail,
            paymentId: order._id,
    }
    const res = await axiosSecure.post('/create-checkout-session',paymentInfo);
    window.location.assign(res.data.url);
  }

  const handleCancel = (id) => {
    axiosSecure
      .patch(`/orders/${id}`, {
        status: "canceled",
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#.</th>
              <th>Book Title</th>
              <th>Order date</th>
              <th className="text-center">Status</th>
              <th className="text-center">Payment</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((order, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{order.bookTitle}</td>
                <td>
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-xl ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "canceled"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="text-center">{order.payment}</td>

                <td>
                  {order.status === "pending" && order.payment === "unpaid" && (
                    <button onClick={() => handlePayment(order)} className="btn btn-sm btn-primary">Pay Now</button>
                  )}
                </td>
                <td>
                  {order.status === "pending" && order.payment === "unpaid" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-sm btn-warning"
                    >
                      Cancel
                    </button>
                  )}
                </td>
                
              
              </tr>
            ))}
            
          </tbody>
        </table>
        {myOrders.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No invoices found.
            </div>
          )}
      </div>
      
    </div>
  );
};

export default MyOrder;
