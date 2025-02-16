import { useContext } from 'react'
import { WishlistContext } from '../../Context/WishlistContext';
import { Oval } from 'react-loader-spinner';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';


const Wishlist = () => {

  const { loading, wishlist, removeProductFromWishlist } = useContext(WishlistContext)
  const { addProductToCart } = useContext(CartContext);
  

  async function addToCart(id) {
    try {
      const res = await addProductToCart(id);
      if (res.status == "success") {
        toast.success(res.message);
      } else {
        toast.error("Something went wrong, try again");
      }
    } catch (error) {
      
    }
  }


  if (loading) {
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
        <div className='bg-gray-200'>
          {wishlist?.length !== 0 ? (
            <>
              <h1 className="mb-5 font-bold text-2xl p-4">Wishlist:</h1>
              {wishlist?.map(function (product, index) {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-5 not-last:border-b-2 border-gray-300 p-4"
                  >
                    <div className="image col-span-12 sm:col-span-4 md:col-span-3 xl:col-span-2">
                      <img
                        className="w-full"
                        src={product.imageCover}
                        alt="Product Image"
                      />
                    </div>
                    <div className="info col-span-12 sm:col-span-8 md:col-span-9 xl:col-span-10 place-content-center">
                      <div className="flex justify-between items-center flex-wrap mb-3">
                        <h2 className="text-2xl me-2 mb-2 md:me-0 md:mb-0">
                          {product.title}
                        </h2>
                        <button
                          type="button"
                          onClick={() => addToCart(product._id)}
                          className="cursor-pointer font-medium text-white bg-green-500 px-4 py-2 rounded-lg"
                        >
                          <i className="fa-solid fa-cart-plus me-2"></i>
                          Add To Cart
                        </button>
                      </div>
                      <p className="mb-3">{product.price} EGP</p>
                      <button
                        type="button"
                        onClick={() => removeProductFromWishlist(product._id)}
                        className="cursor-pointer text-red-700 border-2 border-red-700 font-medium rounded-lg text-sm px-4 py-2"
                      >
                        <i className="fa-solid fa-trash-can me-2"></i> Remove
                      </button>
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
      </div>
    </section>
  );
}

export default Wishlist