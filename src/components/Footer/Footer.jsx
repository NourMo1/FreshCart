import React from 'react'
import image1 from './../../assets/card.png'
import image2 from './../../assets/paypal.png'
import image3 from './../../assets/visa.png'
import image4 from './../../assets/apple-pay.png'
import image5 from './../../assets/stores-button.png'

const Footer = () => {
  return (
    <footer className="bg-gray-200">
      <div className="container mx-auto p-4 xl:px-10">
        <div>
          <h3>Get the FrechCart app</h3>
          <p>
            We will send you a link, open it on your phone to download the app.
          </p>
        </div>
        <div className="grid grid-cols-12 gap-5 py-4">
          <input
            type="email"
            className="col-span-6 sm:col-span-7 xl:col-span-8 rounded bg-white border-gray-300 border-2 px-2"
            placeholder="Email .."
          />
          <button className="col-span-6 sm:col-span-5 xl:col-span-4 cursor-pointer text-white bg-green-500 px-1 md:px-2 md:py-1 rounded">
            Share App Link
          </button>
        </div>
        <hr className="text-gray-300" />
        <div className="flex justify-between flex-col md:flex-row flex-wrap py-3">
          <div className="payment flex items-center">
            <p className="me-3">Payment Partners</p>
            <img
              className="w-[30px] me-2"
              src={image3}
              alt="Payment Parteners"
            />
            <img
              className="w-[30px] me-2"
              src={image1}
              alt="Payment Parteners"
            />
            <img
              className="w-[30px] me-2"
              src={image4}
              alt="Payment Parteners"
            />
            <img className="w-[30px]" src={image2} alt="Payment Parteners" />
          </div>
          <div className="stores flex items-center">
            <h3 className="me-3">Get deliveries with FreshCart</h3>
            <img className="w-[150px]" src={image5} alt="Stores Button" />
          </div>
        </div>
        <hr className="text-gray-300" />
      </div>
    </footer>
  );
}

export default Footer