import { Link } from 'react-router';

const BookCard = ({ books }) => {
  return (
    <div>
      <section className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10 border-b border-base-300 pb-4">
            <div>
              <h2 className="text-3xl font-bold text-primary">Latest Books</h2>
              <p className="text-sm md:text-base text-gray-500 mt-1">Freshly added to our library</p>
            </div>
            <Link to="/books" className="btn btn-sm btn-outline btn-primary">View All</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {books.map((book) => (
              <div key={book._id} className="card bg-base-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-base-300">
                <figure className="px-0 pt-0 relative group">
                  <img
                    src={book.bookImage}
                    alt="Book Cover"
                    className="rounded-t-lg h-110 sm:h-80 w-full object-cover transition-transform duration-1000 ease-in-out hover:scale-110"
                  />

                </figure>
                <div className="card-body px-3 pb-4">
                  <h3 className=" font-bold text-[20px] truncate">{book.bookTitle}</h3>
                  <p className="text-[14px] text-gray-500 uppercase tracking-wide">{book.author}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xl font-bold text-primary">$ {book.price}</span>
                    <Link to={`/book-details/${book._id}`} className="btn btn-md btn-primary text-white">See Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default BookCard;