import axios from 'axios';
import { Oval } from "react-loader-spinner";
import { useQuery } from "react-query";
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const Home = () => {
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist, removeProductFromWishlist, isInWishlist } = useContext(WishlistContext);
  const [sort, setSort] = useState("-ratingsAverage");
  const [page, setPage] = useState(1);

  async function getAllProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products", {
      params: {
        limit: 20,
        sort,
        page,
      }
    });
    
  }

  const { isLoading, data } = useQuery({
    queryKey: ["getAllProducts", sort, page],
    queryFn: getAllProducts,
  });

  async function addToCart(id) {
    const res = await addProductToCart(id);
    if (res.status == "success") {
      toast.success(res.message);
    } else {
      toast.error("Something went wrong, try again");
    }
  }

  function handleSort(e) {
    setSort(e.target.value);
  }

  function handlePage(info) {
    setPage(info.selected + 1);
  }

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
            <HomeSlider />
            <CategorySlider />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap mb-5">
              <h2 className="text-2xl font-bold mb-2">Shop Products</h2>
              <div className="flex items-center justify-center gap-3 ">
                <label htmlFor="productSelect" className="cursor-pointer">
                  <i className="fa-solid fa-filter text-green-500 text-lg"></i>
                </label>
                <select
                  id="productSelect"
                  onChange={handleSort}
                  defaultValue={sort}
                  className="w-[200px] px-2 py-1 border-2 border-green-500 rounded-lg shadow-lg focus:ring-green-500 "
                >
                  <option value="-price">Price: High To Low</option>
                  <option value="price">Price: Low To High</option>
                  <option value="-ratingsAverage">Top Rated</option>
                  <option value="title">Name A To Z</option>
                  <option value="-title">Name Z To A</option>
                </select>
              </div>
            </div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
              {data?.data.data.map(function (product, index) {
                const isFav = isInWishlist(product.id);
                return (
                  <>
                    <div key={index} className=" group">
                      <div className="inner p-4 border-2 border-green-500 rounded-lg transition-all ease duration-700 group-hover:shadow-2xl relative">
                        <button
                          onClick={() => {
                            isFav
                              ? removeProductFromWishlist(product.id) &&
                                toast("Product removed from Wishlist", {
                                  icon: (
                                    <i className="fa-heart fa-regular text-lg text-gray-800"></i>
                                  ),
                                })
                              : addProductToWishlist(product) &&
                                toast("Product added to Wishlist", {
                                  icon: (
                                    <i className="fa-heart fa-solid text-lg text-red-600"></i>
                                  ),
                                });
                          }}
                          className="cursor-pointer p-2 bg-white shadow-lg rounded-lg absolute right-4"
                        >
                          <i
                            className={`fa-heart text-lg ${
                              isFav
                                ? "fa-solid text-red-600"
                                : "fa-regular text-gray-800"
                            }`}
                          ></i>
                        </button>
                        <Link to={`FreshCart/productDetails/${product.id}`}>
                          <div className="image">
                            <img
                              className="w-full"
                              src={product.imageCover}
                              alt="Product Image"
                            />
                          </div>
                          <p className="text-green-500 mt-3">
                            {product.category.name}
                          </p>
                          <h2 className="my-3">
                            {product.title.split(" ").splice(0, 2).join(" ")}
                          </h2>
                          <div className="flex justify-between items-center">
                            <p>{product.price} EGP</p>
                            <span>
                              {product.ratingsAverage}{" "}
                              <i className="fa-solid fa-star rating-color"></i>
                            </span>
                          </div>
                        </Link>
                        <button
                          onClick={function () {
                            addToCart(product.id);
                          }}
                          className="w-full cursor-pointer mt-3 border-green-500 px-3 py-1 border-2 rounded-lg"
                        >
                          Add To Cart
                          <i className="fa-solid fa-cart-plus ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <ReactPaginate
              previousLabel={<i className="fa-solid fa-arrow-left"></i>}
              previousClassName=" text-green-500"
              nextLabel={<i className="fa-solid fa-arrow-right"></i>}
              nextClassName=" text-green-500"
              className="flex justify-center gap-5 mt-10 text-lg cursor-pointer"
              pageCount={data?.data.metadata.numberOfPages}
              pageLinkClassName="px-2 py-1 border-2 border-green-500 rounded-lg"
              activeClassName="text-green-500"
              onPageChange={handlePage}
              forcePage={page - 1}
            />
          </div>
        </section>
      )}
    </>
  );
}

export default Home
