import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiBook,
  FiCamera,
  FiLock,
  FiSave,
} from "react-icons/fi";
import { updateProfile } from "../../../redux/slices/authSlice";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    course: user?.course || "",
    oldPassword: "",
    newPassword: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    user?.user_img
      ? `http://localhost:8000${user.user_img}`
      : "https://via.placeholder.com/150"
  );

  // ---------- Handlers ----------
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value); // ignore empty fields
    });

    if (image) data.append("image", image);
    
    dispatch(updateProfile({ data: data, user_id: user._id }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        My Profile
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <label className="relative cursor-pointer">
            <img
              src={preview}
              alt="avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-green-600"
            />
            <div className="absolute bottom-2 right-2 bg-green-600 text-white p-2 rounded-full">
              <FiCamera />
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* FORM */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile info */}
          <div className="space-y-4">
            <Input
              icon={FiUser}
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <Input
              icon={FiMail}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              icon={FiBook}
              name="course"
              value={formData.course}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="space-y-4">
            <Input
              icon={FiLock}
              name="oldPassword"
              type="password"
              placeholder="Current password"
              onChange={handleChange}
            />
            <Input
              icon={FiLock}
              name="newPassword"
              type="password"
              placeholder="New password"
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-8 w-full flex items-center justify-center gap-2 bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition"
        >
          <FiSave /> Update Profile
        </button>
      </motion.div>
    </div>
  );
}

/* Reusable input */
function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-3 text-gray-400" />
      <input
        {...props}
        className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}

export default Profile;
