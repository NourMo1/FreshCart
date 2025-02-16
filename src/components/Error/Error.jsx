import React from 'react'
import error from './../../assets/error.svg'

const Error = () => {
  return (
    <section className="pt-20 pb-2">
      <div className="container mx-auto p-4 xl:px-10 flex justify-center items-center">
        <div className="">
          <img src={error} className="w-full" alt="404: Page Not Found" />
        </div>
      </div>
    </section>
  );
}

export default Error