import { useFormik } from 'formik';
import React, { useContext } from 'react'
import * as Yup from "yup";
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Payment = () => {
  
  const navigate = useNavigate()
  
  const { cartId, setProducts, setNumOfItems, setTotalCartPrice } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const validateYup = Yup.object().shape({
    details: Yup.string()
      .required("Please write some details")
      .min(5, "Details must be at least 5 chars"),
    city: Yup.string().required("Please enter your city"),
    phone: Yup.string()
      .required("Please enter your phone")
      .matches(/^01[0125][0-9]{8}$/, "Please enter valid phone"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    
    validationSchema: validateYup,
  });

  async function cashOrder() {
    const x = {
      shippingAddress: {
        details: formik.values.details,
        phone: formik.values.phone,
        city: formik.values.city,
      },
    };
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        x,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (formik.values.details && formik.values.phone && formik.values.city) {
        setNumOfItems(0);
        setTotalCartPrice(0);
        setProducts([]);
        setLoading(false);
        navigate("FreshCart/allorders");
      } else {
        setLoading(false);
        toast.error("Please fill the form")
      }
    } catch (error) {}
  }

  async function onlineOrder() {
    const x = {
      shippingAddress: {
        details: formik.values.details,
        phone: formik.values.phone,
        city: formik.values.city,
      },
    };
    try {
      setLoader(true);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        x,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            url: "http://localhost:5173",
          },
        }
      );
      if (formik.values.details && formik.values.phone && formik.values.city) {
        window.open(data.session.url);
        setLoader(false);
      } else {
        setLoader(false);
        toast.error("Please fill the form");
      }
    } catch (error) {}
  }

  return (
    <section className="pt-20 pb-2">
      <div className="container mx-auto p-4 xl:px-40">
        <h1 className="mb-10 font-bold text-2xl">Payment:</h1>
        <form onSubmit={formik.handleSubmit} className="mb-5">
          <div className="mb-3">
            <label
              htmlFor="details"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Details
            </label>
            <textarea
              id="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          {formik.errors.details && formik.touched.details ? (
            <div
              className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.details}
            </div>
          ) : (
            ""
          )}
          <div className="mb-3">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              type="tell"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}
          <div className="mb-3">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          {formik.errors.city && formik.touched.city ? (
            <div
              className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.city}
            </div>
          ) : (
            ""
          )}
        </form>
        <div className="buttons flex flex-col gap-5 md:flex-row md:gap-0">
          <button
            type="button"
            onClick={cashOrder}
            className="cursor-pointer md:me-2 text-green-500 border-2 border-green-500 font-medium rounded-lg text-sm px-4 py-2"
          >
            {loading ? (
              <i className="fa-solid fa-circle-notch fa-spin text-green-500"></i>
            ) : (
              "Cach Payment"
            )}
          </button>
          <button
            type="button"
            onClick={onlineOrder}
            className="cursor-pointer bg-green-500 text-white font-medium rounded-lg text-sm px-4 py-2"
          >
            {loader ? (
              <i className="fa-solid fa-circle-notch fa-spin text-white"></i>
            ) : (
              "Online Payment"
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Payment