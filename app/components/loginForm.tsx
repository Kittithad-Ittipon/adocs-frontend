"use client";

import { UserCheck, UserX } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
  const [show, setShow] = useState(false);
  const [msg, setmsg] = useState("");
  const [alert, setalert] = useState(false);
  const [isopen, setisopen] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setmsg("Loading...");
    setisopen(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setalert(false);
        setmsg(data.error);
        return;
      }
      setalert(true);
      setmsg(data.message);
      setTimeout(() => {
        data.role === "admin" ? window.location.href = "/dashboard" : window.location.href = "/users/dashboard";
      }, 300);
    } catch (err) {
      setalert(false);
      setmsg("Server Error");
    }
  };

  return (
    <form
      action="#"
      className="w-[80%] h-[70%] flex flex-col justify-evenly items-center"
      onSubmit={login}
    >
      <div className="w-full flex flex-col gap-2">
        <label className="text-lg">Username or Email</label>
        <input
          type="text"
          className="border p-3 w-full rounded-2xl outline-none focus:border-gray-500 transition"
          required
          value={username}
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label className="text-lg">Password</label>
        <div className="relative w-full">
          <input
            type={show ? "text" : "password"}
            className="border p-3 w-full rounded-2xl outline-none focus:border-gray-500 transition"
            required
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <i
            className={`bx ${show ? "bx-hide" : "bx-show"} absolute right-4 top-4 text-xl cursor-pointer`}
            onClick={() => setShow(!show)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full p-3 rounded-full bg-gray-800 text-white hover:bg-gray-100 hover:text-gray-800 transition font-medium text-lg cursor-pointer"
      >
        Sign In
      </button>
      {isopen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition duration-200">
          <div className="h-[30%] w-[22%] bg-white rounded-3xl flex flex-col justify-center items-center p-2">
            {alert != true && msg == "Loading..." && (
              <div className="flex justify-center items-center w-full h-[90%] flex-col gap-4">
                <i className="bx bx-loader-alt bx-spin text-5xl"></i>
                <p className="text-md">{msg}</p>
              </div>
            )}
            {alert == true && msg !== "Loading..." &&(
              <div className="flex justify-center items-center w-full h-[90%] flex-col gap-4">
                <UserCheck className="text-green-600" size={40} />
                <p className="text-md">{msg}</p>
              </div>
            )}
            {alert == false && msg !== "Loading..." &&(
              <div className="flex justify-center items-center w-full h-[90%] flex-col gap-4">
                <UserX className="text-red-600" size={40} />
                <p className="text-md">{msg}</p>
              </div>
            )}
            <div className="bg-gray-800 w-[70%] h-[50px] text-white flex justify-center items-center rounded-full overflow-hidden">
              <button
                onClick={() => setisopen(false)}
                className="w-full h-full cursor-pointer hover:bg-sky-600 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
