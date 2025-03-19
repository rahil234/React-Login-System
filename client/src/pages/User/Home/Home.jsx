import React from "react";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Platform</h1>
          <p className="text-lg mb-8">
            Your one-stop solution for all your needs. Discover the endless
            possibilities!
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-200 transition duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Feature One</h3>
              <p className="text-gray-600">
                Description of the first feature that makes your app special.
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Feature Two</h3>
              <p className="text-gray-600">
                Another great feature to attract your audience.
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Feature Three</h3>
              <p className="text-gray-600">
                More reasons why users should love your app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to dive in?</h2>
          <p className="text-lg mb-8">Join us today and start exploring.</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-200 transition duration-300">
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
