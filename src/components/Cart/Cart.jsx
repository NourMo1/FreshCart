import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext';
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const Cart = () => {
  
  const { products, numOfItems, totalCartPrice, loading, updateCount, deleteCartItem, deleteUserCart } = useContext(CartContext);
  
  if (loading) {
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
        <div className="bg-gray-100">
          {products?.length !== 0 ? (
            <>
              <div className="pt-4 px-4 flex justify-between items-center flex-wrap">
                <h2 className="text-2xl font-bold mb-3 md:mb-0">Shop Cart:</h2>
                <button
                  type="button"
                  onClick={deleteUserCart}
                  className="cursor-pointer text-white bg-red-600 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Clear Cart <i className="fa-solid fa-broom ms-2"></i>
                </button>
              </div>
              <div className="p-4 mb-3 flex justify-between items-center flex-wrap">
                <p className="me-3">Total Price: {totalCartPrice} EGP</p>
                <p>Items: {numOfItems}</p>
              </div>
              <div className="parent ">
                {products?.map(function (item, index) {
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-5 not-last:border-b-2 border-gray-300 p-4"
                    >
                      <div className="image col-span-12 sm:col-span-4 md:col-span-3 xl:col-span-2">
                        <img
                          className="w-full"
                          src={item.product.imageCover}
                          alt="Product Image"
                        />
                      </div>
                      <div className="content col-span-12 sm:col-span-8 md:col-span-9 xl:col-span-10 place-content-center">
                        <div className="flex justify-between flex-wrap items-center mb-3">
                          <h2 className="text-2xl mb-2 md:mb-0">
                            {item.product.title}
                          </h2>
                          <div className="buttons flex justify-between items-center">
                            <button
                              onClick={() =>
                                updateCount(item.product._id, item.count + 1)
                              }
                              className="cursor-pointer border-green-500 text-green-500 px-2 border-2 rounded-lg me-2"
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                            <p className="count">{item.count}</p>
                            <button
                              onClick={() =>
                                updateCount(item.product._id, item.count - 1)
                              }
                              className="cursor-pointer border-green-500 text-green-500 px-2 border-2 rounded-lg ms-2"
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                          </div>
                        </div>
                        <p className="mb-3">{item.price} EGP</p>
                        <button
                          type="button"
                          onClick={() => deleteCartItem(item.product._id)}
                          className="cursor-pointer text-red-700 border-2 border-red-700 font-medium rounded-lg text-sm px-4 py-2"
                        >
                          <i className="fa-solid fa-trash-can me-2"></i> Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="checkout">
                  <Link
                    to={"FreshCart/payment"}
                    className="block text-center mt-3 w-full rounded-lg text-white bg-green-500 px-2 py-3"
                  >
                    Checkout <i className="fa-solid fa-money-bill ms-2"></i>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="h-[50vh] flex justify-center items-center flex-wrap flex-col gap-10 text-center">
              <i className="fa-solid fa-circle-exclamation fa-2x text-red-600"></i>
              <h1 className="text-2xl font-bold text-red-600">
                Sorry, No Data To Display
              </h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart