import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const Categories = () => {
  
  const [subCategory, setSubCategory] = useState([])
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState(false);

  async function getAllCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { isLoading, data } = useQuery("getAllCategories", getAllCategories);

  async function getSpecificCategory(id) {
      try {
        setLoading(true)
        setHeader(false)
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
        );
          console.log(data.data);
        setSubCategory(data.data)
        setHeader(true)
        setLoading(false)
      } catch (error) {}
    }
  
  useEffect(function () {
    getAllCategories();
  },[])
  
  
  if (isLoading) {
    return (
      <div className="h-screen bg-green-500 flex justify-center items-center">
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
          {data?.data.data.map(function (category, index) {
            return (
              <div key={index} className="group">
                <Link onClick={() => getSpecificCategory(category._id)}>
                  <div className="inner rounded-lg overflow-hidden transition-all ease duration-700 group-hover:shadow-2xl">
                    <img
                      className="w-full h-[300px]"
                      src={category.image}
                      alt="Category Image"
                    />
                    <h1 className="text-center text-green-600 text-2xl font-bold py-2">
                      {category.name}
                    </h1>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="h-[100px] flex justify-center items-center">
          <Oval
            visible={true}
            height="50"
            width="50"
            color="#0E9F6E"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="p-4">
          {header ? (
            <h1 className="my-5 text-center text-green-600 text-2xl font-bold">
               Sub Categories
            </h1>
          ) : (
            ""
          )}

          <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:justify-center pb-2">
            {subCategory?.map(function (item, index) {
              return (
                <div
                  key={index}
                  className="bg-green-500 p-4 rounded-lg text-center"
                >
                  <h2 className="text-white">{item.name}</h2>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export default Categories