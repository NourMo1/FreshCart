import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';

const Brands = () => {
  
  async function getAllBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { isLoading, data } = useQuery("getAllBrands", getAllBrands);
  
  useEffect(function () {
    getAllBrands()
  }, [])
  
  if (isLoading) {
      return (
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
      );
    }

  return (
    <section className="pt-20 pb-2">
      <div className="container mx-auto p-4 xl:px-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {data?.data.data.map(function (brand, index) {
            return (
              <div
                key={index}
                className="group "
              >
                <Link>
                  <div className="inner p-4 border-2 border-green-500 rounded-lg transition-all ease duration-700 group-hover:shadow-2xl">
                    <img
                      className="w-full"
                      src={brand.image}
                      alt="Brand Image"
                    />
                    <h1 className="text-center text-green-600 text-2xl font-bold">
                      {brand.name}
                    </h1>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Brands