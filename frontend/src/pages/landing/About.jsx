import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-[#f6f9f6] font-sans">
      {/* HEADER */}
      <header className="flex justify-between items-center px-10 py-6">
        <h1 className="text-xl font-bold text-green-700">EduLearn</h1>
        <nav className="flex gap-6 text-gray-700">
          <a href="/">Home</a>
          <a href="/about" className="font-semibold text-green-700">
            About
          </a>
          <a href="/contact">Contact</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </nav>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Join Now
        </button>
      </header>

      {/* HERO ABOUT */}
      <section className="mx-10 mt-6 bg-gradient-to-r from-green-200 to-green-100 rounded-3xl p-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900">About EduLearn</h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          EduLearn is a modern e-learning platform designed to connect students,
          teachers, and administrators through smart and interactive tools.
        </p>
      </section>

      {/* MISSION */}
      <section className="mx-10 mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
          <p className="mt-4 text-gray-600">
            Our mission is to make education accessible, engaging, and
            personalized for everyone. We combine technology, AI-powered
            insights, and expert educators to enhance the learning experience.
          </p>

          <ul className="mt-6 space-y-3">
            <li>🎯 Improve learning outcomes</li>
            <li>🤝 Connect students & teachers</li>
            <li>🚀 Use modern & smart technologies</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
            alt="Mission"
            className="w-full"
          />
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-10 mt-16">
        <h3 className="text-3xl font-bold text-center text-gray-900">
          Our Core Values
        </h3>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Innovation",
              desc: "We use modern tools and AI to improve education.",
            },
            {
              title: "Accessibility",
              desc: "Education for everyone, anytime, anywhere.",
            },
            {
              title: "Quality",
              desc: "High-quality courses with expert teachers.",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h4 className="text-lg font-semibold text-green-700">
                {value.title}
              </h4>
              <p className="mt-2 text-gray-600 text-sm">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 bg-green-800 text-white py-6 text-center">
        © 2026 EduLearn – Empowering digital education
      </footer>
    </div>
  );
};

export default About;
