"use client";
import { UserCheck, UserX } from "lucide-react";
import React, { useState } from "react";
export default function Forgot_repassword() {
  const [isopen, setisopen] = useState(false);
  const [alert, setalert] = useState(false);
  const [msg, setmsg] = useState("");
  const [otp, setotp] = useState("");
  const [password, setpassword] = useState("");
  const check_otp = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const allowed = "0123456789";

    if (value.includes(" ")) {
      setalert(false);
      setisopen(true);
      setmsg("OTP : Space  not allowed");
      return;
    }
    if (value.length > 6) {
      setalert(false);
      setisopen(true);
      setmsg("OTP : Maximun 6");
      return;
    }
    if (value !== value.toLowerCase()) {
      setalert(false);
      setisopen(true);
      setmsg("OTP : UpperCase  not allowed");
      return;
    }
    for (const ch of value) {
      if (!allowed.includes(ch)) {
        setalert(false);
        setisopen(true);
        setmsg("OTP : Special characters not allowed");
        return;
      }
    }
    setotp(value);
  };
  const forgot_repassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setmsg("Loading...");
    setisopen(true);
    try {
      const res = await fetch("/api/forgot_repassword", {
        method: "POST",
        headers: { "Contant-Type": "appication/json" },
        body: JSON.stringify({ otp, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error == "OTP Session Time Out") {
          setalert(false);
          setisopen(true);
          setmsg(data.error);
          setTimeout(() => {window.location.href = "/"} ,500)
          return;
        }
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
        window.location.href = "/login";
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
      onSubmit={forgot_repassword}
    >
      {/* <div className="w-full flex flex-col gap-2">
        <label className="text-lg">Username</label>
        <input
          type="text"
          className="border p-3 w-full rounded-2xl outline-none focus:border-gray-500 transition"
          required
          onChange={check_username}
          value={username}
        />
      </div> */}
      <div className="w-full flex flex-col gap-2">
        <label className="text-lg">OTP</label>
        <input
          type="text"
          className="border p-3 w-full rounded-2xl outline-none focus:border-gray-500 transition"
          required
          onChange={check_otp}
          value={otp}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label className="text-lg">New Password</label>
        <input
          type="password"
          className="border p-3 w-full rounded-2xl outline-none focus:border-gray-500 transition"
          required
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          value={password}
        />
      </div>
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
