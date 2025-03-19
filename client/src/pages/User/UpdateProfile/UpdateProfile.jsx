import React, { useState } from "react";
import axios from "../../../axiosInstance";
import { useSelector } from "react-redux";

function UpdateProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const {user} = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phoneNo: user.phoneNo,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("phoneNo", formData.phoneNo);
    submitData.append("password", formData.password);

    if (profileImage) {
      submitData.append("profileImage", profileImage);
    }

    try {
      const response = await axios.patch("/update-profile", submitData);
      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      setErrorMessage("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Update Your Profile</h2>
      
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-2 rounded mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-2 rounded mb-4">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="username"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            autoComplete="mobile email"
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div>
          <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
            Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full"
          />
        </div>

        {preview && (
          <div className="mt-4">
            <h4 className="text-sm font-medium">Image Preview:</h4>
            <img
              src={preview}
              alt="Profile Preview"
              className="mt-2 w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;