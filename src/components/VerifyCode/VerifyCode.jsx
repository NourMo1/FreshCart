import React from 'react'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from "yup";
import toast from 'react-hot-toast';
import axios from 'axios';

const VerifyCode = () => {
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function verifyCode(values) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      setLoading(false);
      navigate("/resetPassword");
    } catch (e) {
      toast.error(e.response.data.message);
      setLoading(false);
    }
  }

  const validateYup = Yup.object().shape({
    resetCode: Yup.string()
      .required("Please enter your code")
      .matches(/^[0-9]{6}$/, "Please enter valid code"),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: verifyCode,
    validationSchema: validateYup,
  });
  
    return (
      <section className="pt-20 pb-2w-[80%] md:w-[65%] mx-auto">
        <div className="container mx-auto p-4 xl:px-10">
          <h2 className="text-3xl font-bold mb-5">Please enter your code:</h2>
          <form onSubmit={formik.handleSubmit} className="w-full mx-auto">
            <div className="mb-3">
              <label
                htmlFor="resetCode"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Code
              </label>
              <input
                value={formik.values.resetCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                id="resetCode"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            {formik.errors.resetCode && formik.touched.resetCode ? (
              <div
                className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.resetCode}
              </div>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="cursor-pointer text-white bg-green-500  focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? (
                <i className="fa-solid fa-circle-notch fa-spin text-white"></i>
              ) : (
                "Verify Code"
              )}
            </button>
          </form>
        </div>
      </section>
    );
}

export default VerifyCode