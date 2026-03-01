import React from "react";
import { FaBookOpen, FaUsers, FaGlobe, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="min-h-screen bg-base-100 font-sans">
      <title>About Us - LibGo</title>

      <section className="bg-base-200 pb-8 pt-22 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-base-content mb-4 ">
            Welcome to <span className="text-primary">Lib-Go</span>
          </h1>
          <p className=" text-md sm:text-lg text-base-content/70 max-w-3xl mx-auto leading-relaxed">
            Your ultimate destination for discovering, borrowing, and buying
            books. We are revolutionizing the way you interact with libraries
            and reading communities.
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 relative pr-4 sm:pr-0">
            <div className="absolute inset-0 bg-primary/20 rounded-xl transform sm:translate-x-4 translate-y-4"></div>
            <img
              src="https://i.ibb.co.com/N6wwXmnK/photo-1507842217343-583bb7270b66.avif"
              alt="Library interior"
              className="relative z-10 w-full h-auto rounded-xl shadow-xl object-cover aspect-video sm:aspect-[4/3]"
            />
          </div>

         
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-base-content border-b-4 border-primary pb-2 inline-block">
              Our Mission
            </h2>
            <p className="text-md sm:text-lg text-base-content/70 leading-relaxed text-justify">
              At Lib-Go, we believe that knowledge should be accessible to
              everyone, everywhere. Our mission is to build a bridge between
              passionate readers and verified librarians. Whether you are
              looking for a rare historical manuscript, the latest sci-fi
              thriller, or academic resources, we make the process seamless,
              secure, and enjoyable.
            </p>
            <p className="text-lg text-base-content/70 leading-relaxed text-justify">
              By combining modern technology with the traditional love for
              reading, we aim to create a global community where books are
              easily shared, reviewed, and cherished.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-base-content">
              Why Choose Lib-Go?
            </h2>
            <p className="text-base-content/60 mt-4 max-w-2xl mx-auto">
              We provide a premium experience for both readers and librarians
              through our dedicated features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-base-100 p-8 rounded-xl shadow-sm border border-base-300 hover:-translate-y-2 transition-transform duration-300 text-center group">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-content transition-colors">
                <FaBookOpen size={28} />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-3">
                Vast Collection
              </h3>
              <p className="text-base-content/60">
                Access thousands of books across multiple genres curated by
                expert librarians.
              </p>
            </div>

            <div className="bg-base-100 p-8 rounded-xl shadow-sm border border-base-300 hover:-translate-y-2 transition-transform duration-300 text-center group">
              <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary group-hover:text-secondary-content transition-colors">
                <FaUsers size={28} />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-3">
                Community Driven
              </h3>
              <p className="text-base-content/60">
                Join a thriving community of book lovers. Share reviews,
                ratings, and recommendations.
              </p>
            </div>

            <div className="bg-base-100 p-8 rounded-xl shadow-sm border border-base-300 hover:-translate-y-2 transition-transform duration-300 text-center group">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:text-accent-content transition-colors">
                <FaShieldAlt size={28} />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-3">
                Secure & Verified
              </h3>
              <p className="text-base-content/60">
                All our librarians are verified, ensuring a safe and reliable
                borrowing or purchasing experience.
              </p>
            </div>

            <div className="bg-base-100 p-8 rounded-xl shadow-sm border border-base-300 hover:-translate-y-2 transition-transform duration-300 text-center group">
              <div className="w-16 h-16 bg-info/10 text-info rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-info group-hover:text-info-content transition-colors">
                <FaGlobe size={28} />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-3">
                Anywhere Access
              </h3>
              <p className="text-base-content/60">
                Order books from the comfort of your home. We connect you with
                libraries across all regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-6">
          Ready to dive into a new world?
        </h2>
        <p className="text-lg text-base-content/70 mb-8">
          Start exploring our huge collection of books today. Your next great
          read is just a click away.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/books"
            className="btn btn-primary hover:btn-secondary btn-lg px-10 shadow-lg shadow-primary/30 w-full sm:w-auto"
          >
            Explore Books
          </Link>
          <Link
            to="/contact"
            className="btn btn-outline hover:btn-secondary btn-lg px-10 w-full sm:w-auto"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
