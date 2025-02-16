import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Brands from './components/Brands/Brands'
import Categories from './components/Categories/Categories'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login';
import Register from './components/Register/Register'
import Error from './components/Error/Error'
import 'flowbite'
import { Toaster } from 'react-hot-toast'
import AuthContextProvider from './Context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext'
import Payment from './components/Payment/Payment'
import Allorders from './components/Allorders/Allorders'
import Wishlist from './components/Wishlist/Wishlist'
import WishlistContextProvider from './Context/WishlistContext'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import VerifyCode from './components/VerifyCode/VerifyCode'
import ResetPassword from './components/ResetPassword/ResetPassword'

function App() {
  
  const Query = new QueryClient()
  
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "FreshCart/",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "FreshCart/home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "FreshCart/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "FreshCart/productDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "FreshCart/categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "FreshCart/brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "FreshCart/payment",
          element: (
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          ),
        },
        {
          path: "FreshCart/wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "FreshCart/allorders",
          element: (
            <ProtectedRoute>
              <Allorders />
            </ProtectedRoute>
          ),
        },
        { path: "FreshCart/login", element: <Login /> },
        { path: "FreshCart/forgotPassword", element: <ForgotPassword /> },
        { path: "FreshCart/verifyCode", element: <VerifyCode /> },
        { path: "FreshCart/resetPassword", element: <ResetPassword /> },
        { path: "FreshCart/register", element: <Register /> },
        { path: "*", element: <Error /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={Query}>
      <AuthContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <Toaster />
            <RouterProvider router={router} />
          </WishlistContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App
