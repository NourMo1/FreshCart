import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContext";


const Login = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  async function signin(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      localStorage.setItem("token", data.token);
      setToken(data.token);
      toast.success(data.message, { duration: 3000 });
      setLoading(false);
      navigate("/home");
    } catch (e) {
      toast.error(e.response.data.message, { duration: 3000 });
      setLoading(false);
    }
  }

  const validateYup = Yup.object().shape({
    email: Yup.string()
      .required("Please enter your email")
      .email("Please enter valid email"),
    password: Yup.string()
      .required("Please enter your password")
      .matches(
        /^[A-Z][a-z0-9]{6,}$/,
        "Password must start with capital letter"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: signin,
    validationSchema: validateYup,
  });

  return (
    <section className="pt-20 pb-2 w-[80%] md:w-[65%] mx-auto">
      <div className="container mx-auto p-4 xl:px-10">
        <h2 className="text-3xl font-bold mb-5">Login Now:</h2>
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
          <Link to={"/forgotPassword"} className="block mb-3">
            Forgot your password ?
          </Link>
          <button
            type="submit"
            className="cursor-pointer text-white bg-green-500  focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? (
              <i className="fa-solid fa-circle-notch fa-spin text-white"></i>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
