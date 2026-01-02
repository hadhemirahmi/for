import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/slices/authSlice";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  function handleLogin() {
    try {
      dispatch(loginUser({ email: email, password: password }));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f9f6] font-sans">
      <header className="flex justify-between items-center px-10 py-6">
        <h1 className="text-xl font-bold text-green-700">EduLearn</h1>
        <nav className="flex gap-6 text-gray-700">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact" >
            Contact
          </a>
          <a href="/login" className="font-semibold text-green-700">Login</a>
          <a href="/register">Register</a>
        </nav>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Get in Touch
        </button>
      </header>

      {/* HERO */}
      <section className="mx-10 mt-6 bg-gradient-to-r from-green-200 to-green-100 rounded-3xl p-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Login</h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Access your personalized learning dashboard and continue your
          educational journey with EduLearn.
        </p>
      </section>
    <div className="min-h-screen bg-[#f6f9f6] flex items-center justify-center font-sans">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-green-700">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Sign in to continue learning
        </p>

        {/* FORM */}
        <div className="mt-8 space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition font-medium"
          >
            Se connecter
          </button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Forgot your password?{" "}
            <a href="#" className="text-green-700 font-medium hover:underline">
              Reset
            </a>
          </p>
          <p className="mt-2">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-green-700 font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
    </div>);
}

export default Login;
