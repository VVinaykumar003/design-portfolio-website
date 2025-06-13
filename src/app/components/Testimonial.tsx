import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Quote, Star, Briefcase } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import axios from "axios";

type Testimonial = {
  id: number;
  userName: string;
  profilePictureURL: string;
  designation: string;
  headline: string;
  description: string;
  // Add other fields if needed
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const fetchTestimonials =async()=>{
    const response = await axios.get("/api/testimonial")
    // console.log(response.data.response)
    setTestimonials(response.data.response)
  }
  useEffect(()=>{
    fetchTestimonials();
  },[])

  // const testimonials = [
  //   {
  //     id: 1,
  //     quote: "Absolutely loved the branding work!",
  //     description:
  //       "The visual identity created by this designer perfectly reflects our brand values. Clients instantly connect with our look now.",
  //     name: "Emily Harper",
  //     company: "Harper & Co. Interiors",
  //     rating: 5,
  //     image: "https://randomuser.me/api/portraits/women/65.jpg",
  //   },
  //   {
  //     id: 2,
  //     quote: "Our website never looked this stunning.",
  //     description:
  //       "He redesigned our e-commerce platform with a fresh, modern UI. The bounce rate dropped and engagement skyrocketed.",
  //     name: "Jonathan Reed",
  //     company: "Reed Apparel",
  //     rating: 5,
  //     image: "https://randomuser.me/api/portraits/men/43.jpg",
  //   },
  //   {
  //     id: 3,
  //     quote: "Exceptional creativity and attention to detail.",
  //     description:
  //       "From logo design to social media templates, every piece was professional, polished, and on-brand.",
  //     name: "Sara Lim",
  //     company: "Lime Digital Agency",
  //     rating: 5,
  //     image: "https://randomuser.me/api/portraits/women/32.jpg",
  //   },
  //   {
  //     id: 4,
  //     quote: "Turned our vision into a powerful visual story.",
  //     description:
  //       "We hired him for a product launch campaign, and the designs helped us stand out in a saturated market.",
  //     name: "Michael Torres",
  //     company: "VibeTech Innovations",
  //     rating: 5,
  //     image: "https://randomuser.me/api/portraits/men/24.jpg",
  //   },
  //   {
  //     id: 5,
  //     quote: "A game-changer for our brand identity.",
  //     description:
  //       "He redefined our brand guidelines and delivered consistent, elegant assets across all platforms. Couldn't be happier.",
  //     name: "Isabella Rossi",
  //     company: "Rosso Café",
  //     rating: 5,
  //     image: "https://randomuser.me/api/portraits/women/44.jpg",
  //   },
  // ];

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={`${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-white/30"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-black py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="relative text-center mb-16">
          <h2 className="text-4xl font-bold text-white relative z-10">
            Client <span className="text-yellow-400">Testimonials</span>
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="w-16 h-1 bg-yellow-400"></div>
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-white/70">
            &quot;Hear what my clients say about transforming their brand through design.&quot;
          </p>
        </div>

        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={600}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1.5,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Autoplay]}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} style={{ width: "70%", maxWidth: "800px" }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-yellow-400/20">
                <div className="flex flex-col md:flex-row">
                  {/* Left Side */}
                  <div className="md:w-2/5 bg-yellow-400/10 p-6 flex flex-col items-center justify-center text-center">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-yellow-400/40 shadow-lg mb-4">
                      <img
                        src={testimonial.profilePictureURL}
                        alt={testimonial.userName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-yellow-400 text-lg font-bold mb-1">{testimonial.userName}</h3>
                    <div className="flex items-center justify-center gap-2 text-white/70 mb-2">
                      <Briefcase size={14} className="opacity-70" />
                      <p className="text-sm">{testimonial.designation}</p>
                    </div>
                    {/* <StarRating rating={testimonial.rating} /> */}
                    <StarRating rating={5} />
                  </div>

                  {/* Right Side */}
                  <div className="md:w-3/5 p-6 flex flex-col justify-center">
                    <Quote size={32} className="text-yellow-400 mb-4 opacity-50" />
                    <p className="text-xl font-semibold mb-4 text-white leading-relaxed">
                      &quot;{testimonial.headline}&quot;
                    </p>
                    <p className="text-sm text-white/70 mb-6 leading-relaxed">
                      {testimonial.description}
                    </p>
                    <div className="h-1 w-16 bg-yellow-400 rounded-full opacity-30"></div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
