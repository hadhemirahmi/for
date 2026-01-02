import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f6f9f6] font-sans">
      <header className="flex justify-between items-center px-10 py-6">
        <h1 className="text-xl font-bold text-green-700">EduLearn</h1>
        <nav className="flex gap-6 text-gray-700">
          <a href="/" className="font-semibold text-green-700">Home</a>
          <a href="/about">About</a>
          <a href="/contact" >
            Contact
          </a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </nav>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Get in Touch
        </button>
      </header>

      {/* HERO */}
      <section className="mx-10 mt-6 bg-gradient-to-r from-green-200 to-green-100 rounded-3xl p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            Elevating learning <br /> experience for all
          </h2>

          <p className="mt-4 text-gray-700 max-w-md">
            Discover personalized online courses with professional teachers,
            interactive content and smart dashboards.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <button className="bg-green-700 text-white px-6 py-3 rounded-xl">
              Get Started
            </button>
            <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              75k+ satisfied users
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Teacher"
            className="w-72"
          />
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-10 mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          "Student Courses",
          "Teacher Dashboard",
          "Live Classes",
          "Admin Management",
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">{item}</h3>
            <p className="text-sm text-gray-600 mt-2">
              Interactive tools and modern learning experience.
            </p>
            <button className="mt-4 text-green-600 font-medium">
              Learn more →
            </button>
          </div>
        ))}
      </section>

      {/* INFO SECTION */}
      <section className="mx-10 mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold">
            We care for your learning journey
          </h2>
          <p className="mt-4 text-gray-600">
            Our platform connects students and teachers with smart tools,
            analytics, and AI-powered recommendations.
          </p>

          <ul className="mt-6 space-y-3">
            <li>✅ Affordable online courses</li>
            <li>✅ Simple and secure access</li>
            <li>✅ Personalized dashboards</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="Student"
            className="w-full"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 bg-green-800 text-white py-6 text-center">
        © 2026 EduLearn – All rights reserved
      </footer>
    </div>
  );
};

export default Home;
