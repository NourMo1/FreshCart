import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Register = () => {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function signup(values) {
    setLoading(true)
    try {
      const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      toast.success(data.message, { duration: 3000 });
      setLoading(false);
      navigate("/login");
    }
    catch(e) {
      toast.error(e.response.data.message, { duration: 3000 });
      setLoading(false);
    }
  }

  const validateYup = Yup.object().shape({
    name: Yup.string()
      .required("Please enter your name")
      .min(3, "Name must be at least 3 chars")
      .max(15, "Name must be at most 15 chars"),
    email: Yup.string()
      .required("Please enter your email")
      .email("Please enter valid email"),
    password: Yup.string()
      .required("Please enter your password")
      .matches(
        /^[A-Z][a-z0-9]{6,}$/,
        "Password must start with capital letter"
      ),
    rePassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Password doesn't match"),
    phone: Yup.string()
      .required("Please enter your phone")
      .matches(/^01[0125][0-9]{8}$/, "Please enter valid phone"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: signup,
    validationSchema: validateYup
  });

  return (
    <section className="pt-20 pb-2 w-[80%] md:w-[65%] mx-auto">
      <div className="container mx-auto p-4 xl:px-10">
        <h2 className="text-3xl font-bold mb-5">Register Now:</h2>
        <form onSubmit={formik.handleSubmit} className="w-full mx-auto">
          <div className="mb-3">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}
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
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
          <div className="mb-3">
            <label
              htmlFor="rePassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Re-Password
            </label>
            <input
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              id="rePassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}
          <div className="mb-3">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Phone
            </label>
            <input
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="tell"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
          <button
            type="submit"
            className="cursor-pointer text-white bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? (
              <i className="fa-solid fa-circle-notch fa-spin text-white"></i>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register