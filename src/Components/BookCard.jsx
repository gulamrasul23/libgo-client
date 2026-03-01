import { Link, useNavigate } from 'react-router';
import { Star, ArrowRight } from "lucide-react";

const BookCard = ({ books,isLoading }) => {
  const navigate = useNavigate();

  const handleDetails = (id) => {
    navigate(`/book-details/${id}`);
  };
  if(isLoading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col bg-base-200 rounded-xl overflow-hidden border border-base-300 h-full animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="relative aspect-5/6 sm:aspect-3/4 bg-base-300 w-full"></div>

          {/* Content Skeleton */}
          <div className="p-2 flex flex-col grow">
            {/* Category & Rating Skeleton */}
            <div className="flex items-center justify-between mb-2">
              <div className="h-6 w-20 bg-base-300 rounded-full"></div>
              <div className="h-4 w-12 bg-base-300 rounded"></div>
            </div>

            {/* Title Skeleton */}
            <div className="h-6 w-3/4 bg-base-300 rounded mb-2"></div>
            <div className="h-6 w-1/2 bg-base-300 rounded mb-4"></div>

            {/* Author Skeleton */}
            <div className="h-4 w-1/3 bg-base-300 rounded mb-6"></div>

            {/* Footer Skeleton */}
            <div className="mt-auto pt-4 border-t border-base-300 flex items-center justify-between">
              <div className="h-4 w-24 bg-base-300 rounded"></div>
              <div className="w-8 h-8 rounded-full bg-base-300"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              onClick={() => handleDetails(book._id)}
              className="group flex flex-col bg-base-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1.5 border border-base-300 h-full"
            >
             
              <div className="relative aspect-5/6 sm:aspect-3/4 overflow-hidden bg-base-300">
                <img
                  src={book.bookImage}
                  alt={book.bookTitle}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              
              <div className="p-4 flex flex-col grow">
        
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] sm:text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {book.category}
                  </span>
                  <div className="flex items-center gap-1">
                    {/* <Star size={14} className="text-secondary fill-secondary" /> */}

                    <span className="text-sm font-bold text-base-content">
                      $ {book?.price || "0.0"}
                    </span>
                  </div>
                </div>

                
                <h3 className="text-lg sm:text-xl font-bold text-base-content mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {book.bookTitle}
                </h3>
                <p className="text-base-content/60 text-sm font-medium mb-4">
                  by {book.author}
                </p>

                
                <div className="mt-auto pt-4 border-t border-base-300 flex items-center justify-between">
                  <span className="text-sm font-semibold text-base-content/70 group-hover:text-primary transition-colors">
                    View Details
                  </span>
                  <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center text-base-content group-hover:bg-primary group-hover:text-base-100 transition-all duration-300">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
  );
};

export default BookCard;