import React, { use } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // CSS import is mandatory
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";

const slidesPromise = fetch('/slide.json').then(res => res.json());


const Banner = () => {
    const slides = use(slidesPromise);
  return (
    <div className="text-white pt-16 text-[20px] w-full max-w-7xl mx-auto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={3000}
        stopOnHover={false}
        showArrows={true}
        
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] "
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover "
            />

            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-black/30 flex justify-center items-center  pl-10 md:pl-10">
              <div className=" text-center max-w-3xl space-y-5 animate-fade-in-up">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white drop-shadow-lg leading-tight">
                  {slide.title}
                </h2>
                <p className="text-gray-200 text-base md:text-xl font-light drop-shadow-md">
                  {slide.description}
                </p>

                <div className="pt-4">
                  
                  <Link
                   to="/books"
                    className="btn btn-primary border-none text-white px-8 text-lg hover:bg-secondary transition-all duration-300"
                  >
                    Browse All Books
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
