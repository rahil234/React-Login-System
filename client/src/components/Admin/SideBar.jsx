import { Link,useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-64 h-screen bg-[#14101C] text-white p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4">Admin</h2>
        <ul className="flex flex-col">
          <li>
            <Link
              to="/admin"
              className="p-2 rounded hover:bg-gray-700 flex gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                id="dashboard"
              >
                <path fill="transparent" d="M0 0h24v24H0V0z"></path>
                <path
                  fill="#fff"
                  d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z"
                ></path>
              </svg>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="p-2 rounded hover:bg-gray-700 flex gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                width="24"
                height="24"
              >
                <rect width="256" height="256" fill="none"></rect>
                <circle
                  cx="128"
                  cy="96"
                  r="64"
                  fill="none"
                  stroke="#fff"
                  strokeMiterlimit="10"
                  strokeWidth="16"
                ></circle>
                <path
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                  d="M30.989,215.99064a112.03731,112.03731,0,0,1,194.02311.002"
                ></path>
              </svg>
              <span>Users</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex flex-col">
          <div className="h-[1px] w-full bg-[#7F89A6] mb-5"></div>
          <li>
            <span
              to="/logout"
              className="p-2 rounded hover:bg-gray-700 flex gap-2"
              onClick={()=>{
                localStorage.removeItem('token');
                navigate('/admin/login');
              }}
            >
              <svg
                fill="#fff"
                height="24"
                width="24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384.971 384.971"
              >
                <path
                  d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
			C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
			C192.485,366.299,187.095,360.91,180.455,360.91z"
                />
                <path
                  d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
			c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
			c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"
                />
              </svg>
              <span>Logout</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
