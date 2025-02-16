import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Slider from 'react-slick';

const ProductDetails = () => {
    
    const { id } = useParams()
    const [loading, setloading] = useState(false)

    async function getProductDetails() {
      return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
  
    const { data, isLoading } = useQuery(`productDetails${id}`, getProductDetails);
    const { addProductToCart } = useContext(CartContext)
    const navigate = useNavigate()
  
  async function addToCart() {
      setloading(true)
      const res = await addProductToCart(id);
      if (res.status == "success") {
        toast.success(res.message);
        navigate("/cart")
        setloading(false)
      } else {
        toast.error("Something went wrong, try again")
        setloading(false);
      }
    }
    
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
    };
  
    return (
      <>
        {isLoading ? (
          <div className="h-screen pt-20 pb-2 bg-green-500 flex justify-center items-center">
            <Oval
              visible={true}
              height="50"
              width="50"
              color="#fff"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <section className="pt-20 pb-2">
            <div className="container mx-auto p-4 xl:px-10">
              <div className="grid grid-cols-12 gap-5 not-last:border-b-2 border-gray-300 p-4">
                <div className="col-span-12 sm:col-span-5 md:col-span-4 xl:col-span-3">
                  <Slider {...settings}>
                    {data.data.data.images.map(function (src, index) {
                      return (
                        <div key={index}>
                          <img
                            className="w-full"
                            src={src}
                            alt="Product Image"
                          />
                        </div>
                      );
                    })}
                  </Slider>
                </div>
                <div className="col-span-12 sm:col-span-7 md:col-span-8 xl:col-span-9 place-content-center">
                  <h2 className="mb-3">{data.data.data.title}</h2>
                  <p className="text-gray-500 mb-3">
                    {data.data.data.description}
                  </p>
                  <p className="mb-3">{data.data.data.category.name}</p>
                  <div className="mb-3 flex justify-between items-center">
                    <p>{data.data.data.price} EGP</p>
                    <span>
                      {data.data.data.ratingsAverage}{" "}
                      <i className="fa-solid fa-star rating-color"></i>
                    </span>
                  </div>
                  <button
                    onClick={addToCart}
                    className="mt-3 w-full cursor-pointer rounded-lg bg-green-500 text-white px-2 py-3"
                  >
                    {loading ? (
                      <i className="fa-solid fa-circle-notch fa-spin text-white"></i>
                    ) : (
                      "Add To Cart"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
    );
}

export default ProductDetails


