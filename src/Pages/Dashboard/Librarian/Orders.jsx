import { Trash2, BookOpen } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const LibrarianOrders = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: orders = [], refetch,isLoading } = useQuery({
        queryKey: ["orderCustomers", user.email, "paid"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/orders?email=${user.email}&payment=paid`,
            );
            return res.data;
        },
    });

    const handleStatus = (id, orderStatus) => {
        axiosSecure.patch(`/orders/${id}`, { status: orderStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success..!",
                        text: `${orderStatus} Successfully`,
                        icon: "success",
                    });
                    refetch();
                }
            }).catch(error => {
                Swal.fire({
                    title: "Something Went Wrong...!",
                    text: `${error.message}`,
                    icon: "error",
                    confirmButtonText: "Try Again",
                });
            })
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Canceled': return 'bg-red-100 text-red-800';
            case 'Pickup': return 'bg-blue-100 text-blue-800';
            case 'Accepted': return 'bg-blue-100 text-blue-800';
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            default: return 'badge-ghost';
        }
    };

    if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-285px)] flex items-center justify-center bg-base-100">
        <span className="loading loading-bars loading-xl "></span>
      </div>
    );
  };

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8 font-sans">
            <title>LibGo_Orders</title>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className='text-center md:text-left'>
                        <h1 className="text-3xl text-primary font-bold text-base-content">Order Management</h1>
                        <p className="text-base-content/60 mt-1">Manage and track all library book orders</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl overflow-hidden">
                    <div className="card-body p-0">
                        <div className="overflow-x-auto w-full">
                            <table className="table  w-full">
                                <thead className="bg-base-300 text-base-content uppercase text-xs">
                                    <tr>
                                        <th className=''>Book Details</th>
                                        <th>Customer</th>
                                        <th>Date & Price</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover">
                                            <td className=''>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-10 h-10 bg-base-300">

                                                            <BookOpen className="w-5 h-5 m-auto mt-3 text-base-content/50" />
                                                        </div>
                                                    </div>
                                                    <div className='w-25'>
                                                        <div className="font-bold text-base-content">{order.bookTitle}</div>
                                                        <div className="text-sm opacity-50">{order.author}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-base-content">{order.customerName}</span>
                                                    <span className="text-xs opacity-50">{order.customerEmail}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex flex-col gap-1">
                                                    <span className='text-xs'>
                                                        {new Date(order.createdAt).toLocaleDateString(
                                                            "en-GB",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            },
                                                        )}
                                                    </span>
                                                    <span className="font-bold text-sm text-base-content/70">$ {order.price}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={`badge ${getStatusColor(order.status)} gap-2 capitalize font-medium`}>
                                                    {order.status}
                                                </div>
                                            </td>

                                            {
                                                <>

                                                    {
                                                        order.status === 'Pending' ? <td>
                                                            <button onClick={() => handleStatus(order._id, 'Accepted')} className='btn btn-warning'>Accept</button>
                                                        </td> : order.status === 'Accepted' ? <td>
                                                            <button onClick={() => handleStatus(order._id, 'Pickup')} className='btn btn-info'>Pickup</button>
                                                        </td> : order.status === 'Pickup' ? <td>
                                                            <button onClick={() => handleStatus(order._id, 'Shipped')} className='btn btn-info'>Shipped</button>
                                                        </td> : order.status === 'Shipped' ? <td>
                                                            <button onClick={() => handleStatus(order._id, 'Delivered')} className='btn btn-success'>Delivered</button>
                                                        </td> : order.status === 'Delivered' ? <td>
                                                            <button className='btn btn-success' disabled>Delivered</button>
                                                        </td> : <td> <button className='btn btn-success' disabled>Canceled</button> </td>
                                                    }

                                                    {
                                                        order.status === 'Pending' && <th>
                                                            <button
                                                                onClick={() => handleStatus(order._id, 'Canceled')}
                                                                className="btn btn-ghost btn-xs text-error hover:bg-error/10 tooltip"
                                                                data-tip="Cancel Order"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </th>
                                                    }

                                                </>
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {orders.length === 0 && (
                                <div className="flex flex-col items-center justify-center p-10 text-base-content/50">
                                    <BookOpen size={48} className="mb-2 opacity-20" />
                                    <p>No active orders found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibrarianOrders;