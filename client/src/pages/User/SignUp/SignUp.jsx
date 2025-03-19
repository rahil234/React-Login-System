import axios from "axios";
import React, { useState } from "react";

function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData(e.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post("/signup", data);

      console.log(response);

      // Axios will only reach this point if the status is in the 2xx range
      if (response.status === 200 || response.status === 201) {
        console.log("Signup successful!", response.data);
        localStorage.setItem('token',response.data.user.token)
        // Handle success (e.g., redirect or show success message)
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
    } catch (error) {
      // Check if the error has a response from the server
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Signup failed.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {errorMessage && (
            <div className="text-red-500 bg-red-100 p-3 rounded-md text-sm">
              {errorMessage}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email or Username:
            </label>
            <input
              type="text"
              name="email"
              autoComplete="email"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Confirm password:
            </label>
            <input
              type="password"
              name="cpassword"
              autoComplete="new-password"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col gap-2 justify-between items-center">
            <span className="text-sm text-gray-500">
              Don't have an account? &nbsp;
              <a href="/login" className="text-indigo-600 hover:underline">
                Login
              </a>
            </span>

            <a
              href="/forgotpassword"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
