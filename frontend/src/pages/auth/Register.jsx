import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/slices/authSlice";

function Register() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    course: "",
    password: "",
    role: "student",
  });

  const [userImg, setUserImg] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUserImg(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRegister = () => {
    if (!userImg) {
      alert("Please upload a profile photo");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("image", userImg);

    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen bg-[#f6f9f6] font-sans">
      {/* HEADER */}
      <header className="flex justify-between items-center px-10 py-6">
        <h1 className="text-xl font-bold text-green-700">EduLearn</h1>
        <nav className="flex gap-6 text-gray-700">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/login">Login</a>
          <a href="/register" className="font-semibold text-green-700">
            Register
          </a>
        </nav>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Get in Touch
        </button>
      </header>

      {/* HERO */}
      <section className="mx-10 mt-6 bg-gradient-to-r from-green-200 to-green-100 rounded-3xl p-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Create Account</h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Create your EduLearn account and start your learning journey today.
        </p>
      </section>

      {/* CARD */}
      <div className="min-h-screen bg-[#f6f9f6] flex items-center justify-center font-sans">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-green-700">
            Create Account
          </h2>
          <p className="text-center text-gray-600 mt-2">Join EduLearn today</p>

          {/* FORM */}
          <div className="mt-8 space-y-4">
            {/* AVATAR */}
            <div className="flex flex-col items-center">
              <label className="relative cursor-pointer">
                <img
                  src={preview || "https://via.placeholder.com/100"}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-600"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              <span className="text-sm text-gray-500 mt-1">
                Upload profile photo
              </span>
            </div>

            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="text"
              name="course"
              placeholder="Course"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <select
              name="role"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>

            <button
              onClick={handleRegister}
              className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition font-medium"
            >
              Register
            </button>
          </div>

          {/* EXTRA */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <a
                href="/login"
                className="text-green-700 font-medium hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
