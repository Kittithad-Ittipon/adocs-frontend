"use client";
import { UserCheck, UserX } from "lucide-react";
import React, { useState } from "react";
export default function Forgot() {
  const [isopen, setisopen] = useState(false);
  const [alert, setalert] = useState(false);
  const [msg, setmsg] = useState("");
  const [username, setusername] = useState("");
  const check_username = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const allowed = "abcdefghijklmnopqrstuvwxyz0123456789.@";

    if (value.includes(" ")) {
      setalert(false);
      setisopen(true);
      setmsg("Username : Space  not allowed");
      return;
    }
    if (value !== value.toLowerCase()) {
      setalert(false);
      setisopen(true);
      setmsg("Username : UpperCase  not allowed");
      return;
    }
    for (const ch of value) {
      if (!allowed.includes(ch)) {
        setalert(false);
        setisopen(true);
        setmsg("Username : Special characters not allowed");
        return;
      }
    }
    setusername(value);
  };
  const forgot_username = async (e: React.FormEvent) => {
    e.preventDefault();
    setmsg("Loading...");
    setisopen(true);
    try {
      const res = await fetch("/api/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok) {
        setalert(false);
        setisopen(true);
        setmsg(data.error);
        return;
      }
      setalert(true);
      setmsg(data.message);
      setTimeout(() => {
        setmsg("Loading...");
        setisopen(false);
        setalert(false);
        window.location.href = "/forgot_repassword"
      }, 1000);
    } catch (error) {
      setmsg("Server Error");
    }
  };
  return (
    <form
      action="#"
      className="w-[80%] h-[70%] flex flex-col justify-evenly items-center"
      id="forgot"
      onSubmit={forgot_username}
    >
      <div className="w-full flex flex-col gap-2">
        <label className="text-lg">Username or Email</label>
        <input
          type="text"
          className="border p-3 w-full rounded-2xl outline-none focus:border-gray-500 transition"
          required
          onChange={check_username}
          value={username}
        />
      </div>
      {/* <div className="w-full flex flex-col gap-2 hidden">
        <label className="text-lg">OTP</label>
        <input
          type="text"
          className="border p-3 w-full rounded-2xl outline-none focus:border-gray-500 transition"
        />
      </div>
      <div className="w-full flex flex-col gap-2 hidden">
        <label className="text-lg">New Password</label>
        <input
          type="password"
          className="border p-3 w-full rounded-2xl outline-none focus:border-gray-500 transition"
        />
      </div> */}
      <button
        type="submit"
        className="w-full p-3 rounded-full bg-gray-800 text-white hover:bg-gray-100 hover:text-gray-800 transition font-medium text-lg cursor-pointer"
      >
        Send
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
            {alert == true && msg != "Loading..." && (
              <div className="flex justify-center items-center w-full h-[90%] flex-col gap-4">
                <UserCheck className="text-green-600" size={40} />
                <p className="text-md">{msg}</p>
              </div>
            )}
            {alert == false && msg != "Loading..." && (
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
