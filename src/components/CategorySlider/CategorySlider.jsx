import React from 'react'
import Slider from "react-slick";
import { useQuery } from 'react-query';
import axios from 'axios';

const CategorySlider = () => {

    async function getAllCategories() {
      return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    const {data} = useQuery("getAllCategories", getAllCategories);

    const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
          },
        },
      ],
    };

    return (
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-2">Shop Popular Categories</h2>
        <div className="slider-container2">
          <Slider {...settings}>
            {data?.data.data.map(function (category, index) {
              return (
                <div key={index}>
                  <img
                    className="w-full h-[200px] object-fit"
                    src={category.image}
                    alt="Category Slider Image"
                  />
                  <h2 className="my-2">{category.name}</h2>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    );
}

export default CategorySlider