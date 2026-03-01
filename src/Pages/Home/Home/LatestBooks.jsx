import { Link } from "react-router";
import BookCard from "../../../Components/BookCard";

const LatestBooks = ({ books }) => {
  return (
    <section className="py-8 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10 border-b border-base-300 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-primary">Latest Books</h2>
            <p className="text-base md:text-lg text-base-content/70 mt-2">
              Freshly added to our library
            </p>
          </div>
          <Link to="/books" className="btn btn-sm btn-outline btn-primary">
            View All
          </Link>
        </div>
        <BookCard books={books}></BookCard>
      </div>
    </section>
  );
};

export default LatestBooks;
