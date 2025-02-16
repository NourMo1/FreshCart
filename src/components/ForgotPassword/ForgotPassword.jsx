import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useState } from 'react';

const ForgotPassword = () => {
  
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    async function getVerifyCode(values) {
      try {
        setLoading(true)
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          values
        );
          toast.success(data.message);
          setLoading(false)
          navigate("FreshCart/verifyCode");
      } catch (error) {
        
      }
    }
  
  const validateYup = Yup.object().shape({
      email: Yup.string()
        .required("Please enter your email")
        .email("Please enter valid email"),
    });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: getVerifyCode,
    validationSchema: validateYup,
  });
  
    return (
      <section className="pt-20 pb-2 w-[80%] md:w-[65%] mx-auto">
        <div className="container mx-auto p-4 xl:px-10">
          <h2 className="text-3xl font-bold mb-5">Please enter your email:</h2>
          <form onSubmit={formik.handleSubmit} className="w-full mx-auto">
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            {formik.errors.email && formik.touched.email ? (
              <div
                className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="cursor-pointer text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? (
                <i className="fa-solid fa-circle-notch fa-spin text-white"></i>
              ) : (
                "Get Verify Code"
              )}
            </button>
          </form>
        </div>
      </section>
    );
}
export default ForgotPassword