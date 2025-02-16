import React from 'react'
import Slider from "react-slick"
import sliderImage1 from "./../../assets/slider-image-1.jpeg"
import sliderImage2 from "./../../assets/slider-image-2.jpeg"
import sliderImage3 from "./../../assets/slider-image-3.jpeg"
import staticImage1 from "./../../assets/slider-1.jpeg"
import staticImage2 from "./../../assets/slider-2.jpeg"

const HomeSlider = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
    };

    return (
        <section className="mb-5">
            <div className="flex justify-center items-center">
                <div className="w-full md:w-2/3">
                    <Slider {...settings}>
                        <div>
                            <img className="w-full h-[200px] md:h-[400px] object-cover" src={sliderImage1} alt="Slider Image" />
                        </div>
                        <div>
                            <img className="w-full h-[200px] md:h-[400px] object-cover" src={sliderImage2} alt="Slider Image" />
                        </div>
                        <div>
                            <img className="w-full h-[200px] md:h-[400px] object-cover" src={sliderImage3} alt="Slider Image" />
                        </div>
                    </Slider>
                </div>
                <div className="hidden md:block md:w-1/3">
                    <img className="w-full h-[200px] object-cover" src={staticImage1} alt="Slider Image" />
                    <img className="w-full h-[200px] object-cover" src={staticImage2} alt="Slider Image" />
                </div>
            </div>
        </section>
  );
}

export default HomeSlider