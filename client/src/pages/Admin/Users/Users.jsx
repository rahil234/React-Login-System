import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../../userSlice";

function AdminUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const userStatus = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const filteredUsers = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.phoneNo.toString().includes(searchValue)
      );
    });
    setSearchResult(filteredUsers);
  }, [searchValue,users]);

  useEffect(() => {
    if (userStatus === "idle") {
      const data = fetchUsers()
      console.log(data);
      dispatch(data);
    }
  }, [userStatus, dispatch]);

  if (userStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (userStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-[#070706] h-screen p-4 flex flex-col gap-4 text-white">
      <nav>
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => {
            if (e.target.value.trim().length > 0) {
              console.log(e.target.value);
              setSearchValue(e.target.value);
            } else {
              setSearchValue("");
            }
          }}
          className="rounded-lg pl-8 px-6 p-2 bg-[#1E1D2B] outline-none"
        />
      </nav>
      {!searchValue.length > 0 ? (
        <div className="bg-[#1E1D2B] h-[94%] rounded-lg p-4">
          <h1 className="text-3xl font-bold mb-4">Users</h1>

          <div className="flex px-4 p-2 bg-[#14101C] rounded-lg mb-4">
            <div className="flex-1">Name</div>
            <div className="flex-1 ml-2">Email</div>
            <div className="flex-1 ml-2">Phone No</div>
            <div className="flex-1 text-end mr-5">Actions</div>
          </div>

          <div className="hide-scrollbar flex flex-col overflow-auto h-[87.5%]">
            {users.map((user, index) => (
              <div
                key={index}
                className="flex justify-evenly items-center p-3 bg-[#14101C] rounded-lg mb-2"
              >
                <div className="flex-1">{user.name}</div>
                <div className="flex-1">{user.email}</div>
                <div className="flex-1">{user.phoneNo}</div>
                <div className="flex-1 flex justify-end gap-4">
                  <button className="border p-2 rounded-lg">Edit</button>
                  <button className="border p-2 rounded-lg bg-red-800">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-[#1E1D2B] h-[94%] rounded-lg p-4">
          <h1 className="text-xl mb-4">Search results for {searchValue}</h1>

          {searchResult.length > 0 ? (
            <>
              <div className="flex px-4 p-2 bg-[#14101C] rounded-lg mb-4">
                <div className="flex-1">Name</div>
                <div className="flex-1 ml-2">Email</div>
                <div className="flex-1 ml-2">Phone No</div>
                <div className="flex-1 text-end mr-5">Actions</div>
              </div>
              <div className="hide-scrollbar flex flex-col overflow-auto h-[87.5%]">
                {searchResult.map((user, index) => (
                  <div
                    key={index}
                    className="flex justify-evenly items-center p-3 bg-[#14101C] rounded-lg mb-2"
                  >
                    <div className="flex-1">{user.name}</div>
                    <div className="flex-1">{user.email}</div>
                    <div className="flex-1">{user.phoneNo}</div>
                    <div className="flex-1 flex justify-end gap-4">
                      <button className="border p-2 rounded-lg">Edit</button>
                      <button className="border p-2 rounded-lg bg-red-800">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full">
              <span className="text-xl">No Results Found</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
