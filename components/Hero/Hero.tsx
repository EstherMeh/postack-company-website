import React from 'react'

const Hero = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}>
        <div className="hero-overlay bg-opacity-80"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-4xl">
              <h1 className="mb-5 text-6xl font-bold">Powering Convenience, Innovation, and Growth</h1>
              <p className="mb-5 text-lg">
              Postack Solutions delivers innovative digital services, 
              including seamless grocery delivery through the Postack Delivery mobile app and 
              website, cutting-edge web and application development, and reliable server hosting 
              and management. We empower businesses and individuals with technology-driven solutions 
              designed for efficiency and growth.
              </p>
              <button className="px-4 py-2 btn btn-primary text-white hover:bg-blue-700 transition-all duration-300">Get started</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Hero