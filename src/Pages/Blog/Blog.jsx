import React from 'react';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router'; 

const blogPosts = [
  {
    id: 1,
    title: "The Future of Digital Libraries in 2026",
    excerpt: "Explore how AI and digital platforms are reshaping the way we read, borrow, and interact with books in the modern era.",
    image: "https://i.ibb.co.com/s9cVGx5z/photo-1524995997946-a1c2e315a42f.avif",
    category: "Technology",
    date: "March 01, 2026",
    author: "Gulam Rasul",
    authorImg: "https://i.ibb.co.com/9HL8FnBB/150-1.jpg"
  },
  {
    id: 2,
    title: "Top 10 Must-Read Fiction Books This Year",
    excerpt: "Looking for your next great read? Check out our curated list of the top 10 fiction books that are taking the literary world by storm.",
    image: "https://i.ibb.co.com/VYX9PLV1/blob.png",
    category: "Recommendations",
    date: "Feb 25, 2026",
    author: "Sarah Jenkins",
    authorImg: "https://i.ibb.co.com/ycBzC9LM/150.jpg"
  },
  {
    id: 3,
    title: "How to Build a Reading Habit",
    excerpt: "Struggling to find time to read? Here are 5 proven strategies to help you build a consistent and enjoyable reading habit.",
    image: "https://i.ibb.co.com/hxksJvdV/blob.png",
    category: "Lifestyle",
    date: "Feb 18, 2026",
    author: "David Lee",
    authorImg: "https://i.ibb.co.com/wZcFWkxS/150-3.jpg"
  },
  {
    id: 4,
    title: "Understanding Rare Manuscripts",
    excerpt: "Take a deep dive into the world of historical manuscripts and learn how librarians preserve these priceless pieces of history.",
    image: "https://i.ibb.co.com/BHnnKc32/photo-1456513080510-7bf3a84b82f8.avif",
    category: "History",
    date: "Feb 10, 2026",
    author: "Elena Rossi",
    authorImg: "https://i.ibb.co.com/ds1mT6C5/150-2.jpg"
  }
];

const Blog = () => {
  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-base-200 pt-22 pb-8 px-4 sm:px-6 lg:px-8 font-sans">
      <title>Blog - LibGo</title>

      <div className="max-w-7xl mx-auto">
        
        
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-base-content mb-4 tracking-tight">
            Lib-Go <span className="text-primary">Journal</span>
          </h1>
          <p className="text-md sm:text-lg text-base-content/60 max-w-2xl mx-auto">
            Discover the latest news, reading tips, book recommendations, and insights from our community of librarians and book lovers.
          </p>
        </div>

        {featuredPost && (
          <div className="mb-8">
            <div className="card lg:card-side bg-base-100 shadow-xl border border-base-300 overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <figure className="lg:w-1/2 relative overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover aspect-video lg:aspect-auto group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge badge-primary badge-lg border-none shadow-md font-bold uppercase tracking-wider text-xs">
                    {featuredPost.category}
                  </span>
                </div>
              </figure>
              <div className="card-body lg:w-1/2 justify-center p-8 lg:p-12">
                <div className="flex items-center gap-4 text-sm text-base-content/60 font-medium mb-3">
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt className="text-primary" /> {featuredPost.date}
                  </span>
                </div>
                <h2 className="card-title text-3xl lg:text-4xl font-bold text-base-content mb-4 group-hover:text-primary transition-colors leading-tight">
                  <Link>{featuredPost.title}</Link>
                </h2>
                <p className="text-base-content/70 text-lg mb-6 flex-grow-0">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-base-200">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={featuredPost.authorImg} alt={featuredPost.author} />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-base-content">{featuredPost.author}</p>
                      <p className="text-xs text-base-content/50">Author</p>
                    </div>
                  </div>
                  <Link  className="btn btn-primary hover:btn-secondary btn-sm px-6">
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-2xl font-bold text-base-content mb-8 border-b-2 border-base-300 pb-2 inline-block">
            Latest Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <div key={post.id} className="card bg-base-100 shadow-md border border-base-300 group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <figure className="relative overflow-hidden aspect-video">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-secondary badge-sm font-bold uppercase tracking-wider text-[10px] px-2 py-3 shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </figure>
                <div className="card-body p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs text-base-content/50 font-medium mb-2">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt /> {post.date}
                    </span>
                  </div>
                  <h2 className="card-title text-xl font-bold text-base-content mb-2 group-hover:text-primary transition-colors line-clamp-2">
                     {post.title}
                  </h2>
                  <p className="text-base-content/70 text-sm mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-base-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={post.authorImg} alt={post.author} className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-xs font-bold text-base-content">{post.author}</span>
                    </div>
                    <Link  className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                      Read <FaArrowRight className="text-[10px]" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <button disabled className="btn btn-outline btn-wide hover:bg-primary hover:border-primary">
            Load More Articles
          </button>
        </div>

      </div>
    </div>
  );
};

export default Blog;