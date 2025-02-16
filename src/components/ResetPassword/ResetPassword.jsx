import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import * as Yup from "yup";
import { useFormik } from 'formik';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  

  async function resetPassword(values) {
    try {
      setLoading(true);
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      
    if (data.token) {
        toast.success("Your password updated successfully");
        navigate("/login");
    } else {
        toast.error("Something went wrong, please try again")
    }
    setLoading(false);
    } catch (e) {
        toast.error(e.response.data.message);
        setLoading(false);
    }
  }

  const validateYup = Yup.object().shape({
    email: Yup.string()
      .required("Please enter your email")
      .email("Please enter valid email"),
    newPassword: Yup.string()
      .required("Please enter your new password")
      .matches(/^[A-Z][a-z0-9]{6,}$/,"Password must start with capital letter"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: resetPassword,
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
          <div className="mb-3">
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              New Password
            </label>
            <input
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              id="newPassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div
              className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.newPassword}
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
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ResetPassword