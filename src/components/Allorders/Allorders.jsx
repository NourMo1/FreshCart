import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { useQuery } from 'react-query';
import { Oval } from 'react-loader-spinner';

const Allorders = () => {
  
    const { id } = jwtDecode(localStorage.getItem("token"))
    
    const { isLoading, data } = useQuery("getUserOrders", getUserOrders);
    
    async function getUserOrders() {
      return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    }
    
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
          {data?.data.length !== 0 ? (
            <>
              {data?.data.map(function (order, index) {
                return (
                  <div key={index} className="mb-5 border-b-2 border-gray-200">
                    <div className="info mb-3">
                      <h1 className="mb-5 font-bold text-2xl">
                        Order Informations:
                      </h1>
                      <p className="mb-2">
                        Date: {order.createdAt.slice(0, 10)}
                      </p>
                      <p className="mb-2">
                        Order Price: {order.totalOrderPrice} EGP
                      </p>
                      <p>Payment Method: {order.paymentMethodType}</p>
                    </div>
                    <div className="items flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-3 items-center">
                      {order.cartItems?.map(function (item, index) {
                        return (
                          <>
                            <div key={index} className="image mb-3">
                              <img
                                className="w-[200px]"
                                src={item.product.imageCover}
                                alt="Product Image"
                              />
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div className="h-[50vh] flex justify-center items-center flex-wrap flex-col gap-10 text-center">
                <i className="fa-solid fa-circle-exclamation fa-2x text-red-700"></i>
                <h1 className="text-2xl font-bold text-red-700">
                  Sorry, No Data To Display
                </h1>
              </div>
            </>
          )}
        </div>
      </section>
    );
}



export default Allorders

