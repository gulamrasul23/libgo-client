import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user: authUser } = useAuth();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users',],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    const handleRole = (id, userRole, userTypeInfo) => {
        axiosSecure.patch(`/users/${id}`, { role: userRole, userType: userTypeInfo })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success..!",
                        text: `Make ${userRole} Successfully`,
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

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8 font-sans">
            <title>LibGo_All_Users</title>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className='text-center md:text-left'>
                        <h1 className="text-3xl text-primary font-bold text-base-content">User Management</h1>
                        <p className="text-base-content/60 mt-1">Manage and track all users role customer, librarian and admin</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl overflow-hidden">
                    <div className="card-body p-0">
                        <div className="overflow-x-auto w-full">
                            <table className="table  w-full">
                                <thead className="bg-base-300 text-base-content uppercase text-xs">
                                    <tr>
                                        <th>User Name & Email</th>
                                        <th className='text-left'>Role</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {users.map(user => <tr key={user._id}>
                                        <td >
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="w-12 h-12 bg-base-300 rounded-2xl">
                                                        <img referrerPolicy="no-referrer"
                                                            src={user.photoURL}
                                                            onError={(e) => {
                                                                e.target.src = "/user-icon.png";
                                                            }}
                                                            alt={user.displayName}
                                                            className="h-full w-full object-cover" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-base-content">{user.displayName}</div>
                                                    <div className="text-sm opacity-50">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div className={`gap-2 capitalize font-medium`}>
                                                {user.role}
                                            </div>
                                        </td>

                                        <td>
                                            {
                                                user.role !== 'librarian' ?
                                                    <button onClick={() => handleRole(user._id, 'librarian', 'Merchant User')} className='btn btn-secondary btn-sm' disabled={user.email === authUser.email}>Make Librarian</button>
                                                    : user.role === 'librarian' ?
                                                        <button onClick={() => handleRole(user._id, 'customer', 'General User')} className='btn btn-secondary btn-sm' disabled={user.email === authUser.email}>Make Customer</button>
                                                        : <button className='btn btn-secondary btn-sm' disabled={user.email === authUser.email}>Make Customer</button>
                                            }
                                        </td>
                                        <td>
                                            {
                                                user.role !== 'admin' ? <button onClick={() => handleRole(user._id, 'admin', 'Administrator')} className='btn btn-primary btn-sm' disabled={user.email === authUser.email}>Make Admin</button> : (user.role === 'admin') ? <button onClick={() => handleRole(user._id, 'customer', 'General User')} className='btn btn-primary btn-sm' disabled={user.email === authUser.email}>Make Customer</button> : <button className='btn btn-primary btn-sm' disabled={user.email === authUser.email}>Make Customer</button>
                                            }
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;