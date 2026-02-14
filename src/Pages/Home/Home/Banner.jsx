import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";

const Banner = () => {
  const slides = [
    {
      "id": 1,
      "image": "/images/slide2.png",
      "title": "The Classics Collection",
      "description": "Revisit the timeless tales that shaped the world. From Austen to Orwell, discover our premium hardcover sets."
    },
    {
      "id": 2,
      "image": "/images/slide1.png",
      "title": "New Arrivals: Sci-Fi",
      "description": "Explore new worlds and future technologies. The latest science fiction hits are now in stock and ready to ship."
    },
    {
      "id": 3,
      "image": "/images/slide3.png",
      "title": "Academic & Research",
      "description": "Find the best resources for your studies. Comprehensive collections for students and researchers."
    }
  ]
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
            className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] "
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover "
            />
            <div className="absolute inset-0 bg-black/30 flex justify-center items-center px-6">
              <div className=" text-center max-w-3xl space-y-5 animate-fade-in-up">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white drop-shadow-lg leading-tight">
                  {slide.title}
                </h2>
                <p className="text-gray-200 text-base md:text-xl font-light drop-shadow-md">
                  {slide.description}
                </p>
                <div className="pt-2 sm:pt-4">
                  <Link
                    to="/books"
                    className="btn btn-primary border-none text-white px-5 sm:px-8 text-lg hover:bg-secondary transition-all duration-300"
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
