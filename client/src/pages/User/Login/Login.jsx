import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFail } from "../../../authSlice"; // Adjust the path as needed
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth.errorMessage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post("/login", data);
      if (response.status === 200) {
        const result = response.data;
        localStorage.setItem("token", response.data.token);
        dispatch(loginSuccess(result));
        navigate("/");
      } else {
        dispatch(
          loginFail(response.data.message || "Login failed. Please try again.")
        );
      }
    } catch (error) {
      if (error.response) {
        dispatch(
          loginFail(
            error.response.data.message || "Login failed. Please try again."
          )
        );
      } else {
        dispatch(loginFail("An error occurred. Please try again."));
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {errorMessage && (
            <div className="text-red-500 bg-red-100 p-3 rounded-md text-sm">
              {errorMessage}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email:
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
              autoComplete="current-password"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col gap-2 justify-between items-center">
            <span className="text-sm text-gray-500">
              Don't have an account? &nbsp;
              <a href="/signup" className="text-indigo-600 hover:underline">
                Sign up
              </a>
            </span>

            <a
              href="/forgotpassword"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot Password?
            </a>
            <Link to="/admin/login">
              <span className="text-sm text-indigo-600 hover:underline">
                admin login
              </span>
            </Link>
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

export default Login;
