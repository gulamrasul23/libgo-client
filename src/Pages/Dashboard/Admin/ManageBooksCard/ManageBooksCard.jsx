import React, { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { CheckCircle, Trash2, XCircle } from 'lucide-react';

const ManageBooksCard = ({sortBooks,refetch}) => {

     const axiosSecure = useAxiosSecure(); 
     const [loading,setLoading] = useState(false);

    const handlePublished = (id, bookStatus) => {
        setLoading(true);
        axiosSecure.patch(`/books/manage-books/${id}`, { status: bookStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success..!",
                        text: `${bookStatus} Successfully`,
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
                
                return;
            }).finally(() => {
                setLoading(false);
            });

    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/books/manage-books/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            axiosSecure.delete(`/orders/book/${id}`)
                                .then(res => {
                                    if (res.data.deletedCount > 0) {
                                        Swal.fire({
                                            title: "Deleted!",
                                            text: "Your file has been deleted.",
                                            icon: "success"
                                        });
                                        refetch();
                                    }
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success"
                                    });
                                    refetch();
                                }).catch(error => {

                                    console.log(error)
                                    Swal.fire({
                                        title: "Something Went Wrong...!",
                                        text: `${error.message}`,
                                        icon: "error",
                                        confirmButtonText: "Try Again",
                                    });
                                })
                        }
                    }).catch(error => {
                        Swal.fire({
                            title: "Something Went Wrong...!",
                            text: `${error.message}`,
                            icon: "error",
                            confirmButtonText: "Try Again",
                        });
                    })
            }
        });
    };
    
    return (
        <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-base-200/50 text-base-content/70 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="py-4 pl-4 sm:pl-6 w-[35%]">Book Details</th>
                                <th>Librarian</th>
                                <th>Price</th>
                                <th className='text-center'>Status</th>
                                <th></th>
                                <th className="text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortBooks.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-base-content/50">
                                        No books found.
                                    </td>
                                </tr>
                            ) : (
                                sortBooks.map((book) => (
                                    <tr key={book._id} className="hover:bg-base-200/30 transition-colors border-b border-base-200 last:border-none">
                                        <td className="pl-4 sm:pl-6">
                                            <div className="flex items-center gap-4">
                                                <div className="avatar shadow-sm rounded-md">
                                                    <div className="w-12 h-16 rounded overflow-hidden">
                                                        <img src={book.bookImage} alt={book.bookTitle} className="object-cover" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-md md:text-lg text-base-content">{book.bookTitle}</div>
                                                    <div className="text-sm text-base-content/60">{book.author}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <div className="avatar">
                                                    <div className="bg-neutral text-neutral-content rounded-full w-8 h-8 flex items-center justify-center">
                                                        <img referrerPolicy="no-referrer"
                                                            src={book.librarianPhotoUrl ? book.librarianPhotoUrl : "/user-icon.png"}
                                                            onError={(e) => {
                                                                e.target.src = "/user-icon.png";
                                                            }}
                                                            alt={book.librarianName}
                                                            className="h-full w-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-sm text-base-content">{book.librarianName}</span>
                                                    <span className="text-xs text-base-content/50">{book.librarianEmail}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold text-base-content/80">
                                                ${book.price}
                                            </div>
                                        </td>
                                        <td className='text-center'>
                                            <span className={`px-2 py-1 font-medium rounded-xl ${book.status === "Unpublished"
                                                ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>{book.status}</span>
                                        </td>
                                        <td >
                                            <div className='flex justify-center'>
                                                {
                                                    book.status === 'Unpublished' ? <button onClick={() => handlePublished(book._id, 'Published')}
                                                    disabled={loading} className='btn btn-primary btn-sm flex'>
                                                        <CheckCircle size={14} /><span> Published</span>
                                                    </button> : <button onClick={() => handlePublished(book._id, 'Unpublished')} disabled={loading} className='btn btn-secondary btn-sm flex'>
                                                        <XCircle size={14} /><span> Unpublished</span>
                                                    </button>
                                                }
                                            </div>
                                        </td>
                                        <td className="text-right pr-6">
                                            <button
                                                onClick={() => handleDelete(book._id)}
                                                className="btn btn-ghost btn-sm text-error hover:bg-error/10 hover:text-error transition-colors tooltip tooltip-left"
                                                data-tip="Delete Book"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
    );
};

export default ManageBooksCard;