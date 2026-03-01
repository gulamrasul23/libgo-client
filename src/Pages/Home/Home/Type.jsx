import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Type = ({ types }) => {
  return (
    <div className="py-8 pb-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary">Curated Collections</h2>
        <p className="text-base-content/70 mt-2 text-base md:text-lg">
          Explore our handpicked categories for every mood
        </p>
      </div>
      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        speed={1000}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50",
          depth: 120,
          modifier: 1,
          scale: 0.85,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {types.map((item, ind) => (
          <SwiperSlide key={ind}>
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src={item.image}
                alt={item.genre}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/20 to-transparent flex flex-col justify-end p-6">
                <div className="transform transition-transform duration-300 translate-y-0">
                  <h3 className="text-white text-2xl font-bold tracking-wide mb-2 group-hover:text-yellow-400 transition-colors">
                    {item.genre}
                  </h3>
                  <p className="text-gray-200 text-sm font-medium line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Type;
