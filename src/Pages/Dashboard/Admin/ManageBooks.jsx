import { Trash2, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageBooks = () => {

    const axiosSecure = useAxiosSecure();
    const { data: books = [], refetch } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await axiosSecure.get('/books/manage-books');
            return res.data;
        }
    });

    const handlePublished = (id, bookStatus) => {
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
            })
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
    }

    return (
        <div className="bg-base-200 min-h-screen p-4 lg:p-8 font-sans">
            <title>LibGo_Manage_Books</title>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className='text-center md:text-left'>
                    <h1 className="text-3xl font-bold text-primary">Manage Books</h1>
                    <p className="text-base-content/60 mt-1">
                        Admin dashboard for publishing and managing library inventory.
                    </p>
                </div>
                <div className="stats shadow bg-base-100 w-full md:w-auto border border-base-200">
                    <div className="stat px-4 py-3">
                        <div className="stat-figure text-primary">
                            <BookOpen size={32} />
                        </div>
                        <div className="stat-title">Total Books</div>
                        <div className="stat-value text-primary">{books.length}</div>
                        <div className="stat-desc">Added by librarians</div>
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-base-200/50 text-base-content/70 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="py-4 pl-6 w-[35%]">Book Details</th>
                                <th>Librarian</th>
                                <th>Price</th>
                                <th className='text-center'>Status</th>
                                <th></th>
                                <th className="text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-base-content/50">
                                        No books found.
                                    </td>
                                </tr>
                            ) : (
                                books.map((book) => (
                                    <tr key={book._id} className="hover:bg-base-200/30 transition-colors border-b border-base-200 last:border-none">
                                        <td className="pl-6">
                                            <div className="flex items-center gap-4">
                                                <div className="avatar shadow-sm rounded-md">
                                                    <div className="w-12 h-16 rounded overflow-hidden">
                                                        <img src={book.bookImage} alt={book.bookTitle} className="object-cover" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-lg text-base-content">{book.bookTitle}</div>
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
                                                    book.status === 'Unpublished' ? <button onClick={() => handlePublished(book._id, 'Published')} className='btn btn-primary btn-sm flex'>
                                                        <CheckCircle size={14} /><span> Published</span>
                                                    </button> : <button onClick={() => handlePublished(book._id, 'Unpublished')} className='btn btn-secondary btn-sm flex'>
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
        </div>
    );
};

export default ManageBooks;