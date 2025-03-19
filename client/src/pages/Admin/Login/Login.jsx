import React from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "../../../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFail } from "../../../authSlice"; // Adjust the path as needed

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const errorMessage = useSelector((state) => state.auth.errorMessage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const response = await axios.post("/admin/login", data);
      
      if (response.status === 200) {
        const result = response.data;
        localStorage.setItem("token", response.data.token);
        console.log(result);
        dispatch(loginSuccess(result));
        navigate('/admin')
      } else {
        const errorResult = response.data;

        dispatch(
          loginFail(errorResult.message || "Login failed. Please try again.")
        );
      }
    } catch (error) {
      dispatch(loginFail("An error occurred. Please try again."));
    }
  };

  return (
    <div className="flex  justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Admin Login
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
              autoComplete="username"
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
          <div className="flex flex-col justify-between items-center">
            <span className="text-sm text-gray-500">
              Don't have an account?
              <a href="/signup" className="text-indigo-600 hover:underline">
                {" "}
                Sign up
              </a>
            </span>
            <a
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot Passwod?
            </a>
            <Link to="/../" className="text-sm text-indigo-600 hover:underline">
              User Login
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
