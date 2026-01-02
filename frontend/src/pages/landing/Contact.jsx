import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#f6f9f6] font-sans">
      <header className="flex justify-between items-center px-10 py-6">
        <h1 className="text-xl font-bold text-green-700">EduLearn</h1>
        <nav className="flex gap-6 text-gray-700">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact" className="font-semibold text-green-700">
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
      <section className="mx-10 mt-6 bg-gradient-to-r from-green-200 to-green-100 rounded-3xl p-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Contact Us</h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Have questions or need help? Our team is here to support you in your
          learning journey.
        </p>
      </section>

      {/* CONTACT CONTENT */}
      <section className="mx-10 mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT INFO */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900">Let’s talk</h3>
          <p className="mt-4 text-gray-600">
            Whether you're a student, teacher, or administrator, feel free to
            reach out to us anytime.
          </p>

          <ul className="mt-6 space-y-4 text-gray-700">
            <li>📍 Address: Sfax, Tunisia</li>
            <li>📧 Email: support@edulearn.com</li>
            <li>📞 Phone: +216 00 000 000</li>
          </ul>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white p-8 rounded-2xl shadow">
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 bg-green-800 text-white py-6 text-center">
        © 2026 EduLearn – Contact & Support
      </footer>
    </div>
  );
};

export default Contact;
