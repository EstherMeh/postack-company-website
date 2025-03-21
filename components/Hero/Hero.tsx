import React from 'react'

const Hero = () => {
  return (
    <div>
      <div
        className="hero min-h-screen bg-gradient-to-r from-gray-50 to-gray-400"
        >
        <div className="hero-overlay bg-opacity-0"></div>
          <div className="hero-content text-neutral-content text-left flex items-start justify-start w-full">
            <div className="max-w-3xl pl-8">
              <h1 className="mb-5 text-6xl font-bold text-blue-950">Powering Convenience, Innovation, and Growth</h1>
              <p className="mb-5 text-xl text-blue-900">
              Postack Solutions delivers innovative digital services, 
              including seamless grocery delivery through the Postack Delivery mobile app and 
              website, cutting-edge web and application development, and reliable server hosting 
              and management. We empower businesses and individuals with technology-driven solutions 
              designed for efficiency and growth.
              </p>
              <div className="flex space-x-4">
                <button className="px-4 py-2 btn btn-primary text-white hover:bg-blue-700 transition-all duration-300">Get started</button>
                <button className="px-4 py-2 btn btn-neutral text-white hover:bg-blue-700 transition-all duration-300">Learn more</button>
              </div>
            </div>
            <div className="ml-auto pr-8">
            <video
              src="/video/anim.mp4" // Replace with your video file path
              autoPlay
              loop
              muted
              className="w-96 h-96 rounded-full object-cover shadow-lg"
            ></video>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Hero