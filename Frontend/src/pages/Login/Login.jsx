import React from "react";

function Login() {
  const handleSubmit=(e)=> {
    e.preventDefault();
    e.target.submit();
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
      method="POST"
        action="/login"
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-6 bg-slate-600 rounded-lg"
      >
        <label htmlFor="">Username or Email:</label>
        <input
          type="text"
          autoComplete="username"
          className="border p-1 px-2 w-[250px] rounded"
        />
        <label htmlFor="">Password:</label>
        <input
          type="password"
          autoComplete="current-password"
          className="border p-1 px-2 w-[250px] rounded"
        />
        <button type="submit" className="mx-auto px-2 rounded border bg-white">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
