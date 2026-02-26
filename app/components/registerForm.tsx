"use client";

import { UserCheck, UserX } from "lucide-react";
import { useState } from "react";

export default function RegisterForm() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [db, setdb] = useState(false);
  const [msg, setmsg] = useState("");
  const [alert, setalert] = useState(false);
  const [isopen, setisopen] = useState(false);
  const [show, setShow] = useState(false);

  const check_username = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const allowed = "abcdefghijklmnopqrstuvwxyz0123456789";

    if (value.includes(" ")) {
      setalert(false);
      setisopen(true);
      setmsg("Username : Space Not Allowed");
      return;
    }
    if (value !== value.toLowerCase()) {
      setalert(false);
      setisopen(true);
      setmsg("Username : UpperCase  not allowed");
      return;
    }
    if (value.length > 25) {
      setalert(false);
      setisopen(true);
      setmsg("Username : Maximum length is 25 characters");
      return;
    }
    for (const ch of value) {
      console.log(ch);
      console.log(value);
      if (!allowed.includes(ch)) {
        setalert(false);
        setisopen(true);
        setmsg("Username : Special characters not allowed");
        return;
      }
    }
    setusername(value);
  };
  const chack_email = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const allowed = "abcdefghijklmnopqrstuvwxyz0123456789@.";
    if (value !== value.toLowerCase()) {
      setalert(false);
      setisopen(true);
      setmsg("Email : UpperCase  not allowed");
      return;
    }
    for (const ch of value) {
      console.log(ch);
      console.log(value);
      if (!allowed.includes(ch)) {
        setalert(false);
        setisopen(true);
        setmsg("Email : Special characters not allowed");
        return;
      }
    }
    setemail(value);
  };
  const check_mail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      setalert(false);
      setisopen(true);
      setmsg("Email : Space not allowed");
    }
  };
  const check_password = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.includes(" ")) {
      setalert(false);
      setisopen(true);
      setmsg("Password : Space not allowed");
      return;
    }
    setpassword(value);
  };
  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setmsg("Loading...");
    setisopen(true);
    try {
      const res = await fetch("/api/regis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          create_db: db,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setalert(false);
        setmsg(data.error);
        return;
      }
      setalert(true);
      setmsg("Register success");
      setTimeout(() => {
        setalert(false);
        setisopen(false);
        setmsg("Loading...");
        setusername("");
        setemail("");
        setpassword("");
      }, 800);
    window.location.href = "/login";
    } catch (err) {
      setalert(false);
      setmsg("Server error");
    }
  };
  return (
    <form
      action="#"
      className="w-[80%] h-[70%] flex flex-col justify-around items-center"
      onSubmit={register}
    >
      <div className="w-full flex flex-col gap-2">
        <label className="text-lg">Username</label>
        <input
          type="text"
          className="border p-3 w-full rounded-2xl outline-none focus:border-gray-500 transition"
          required
          value={username}
          onChange={check_username}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label className="text-lg">Email</label>
        <div className="relative w-full">
          <input
            type="email"
            className="border p-3 w-full rounded-2xl outline-none focus:border-gray-500 transition"
            required
            value={email}
            onChange={chack_email}
            onKeyDown={check_mail}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <label className="text-lg">Password</label>
        <div className="relative w-full">
          <input
            type={show ? "text" : "password"}
            className="border p-3 w-full rounded-2xl outline-none focus:border-gray-500 transition"
            required
            value={password}
            onChange={check_password}
          />
          <i
            className={`bx ${
              show ? "bx-hide" : "bx-show"
            } absolute right-4 top-4 text-xl cursor-pointer`}
            onClick={() => setShow(!show)}
          />
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="relative w-full flex justify-between items-center">
          {/* <div className="flex flex-1 justify-start items-center gap-2 ">
            <input
              type="checkbox"
              className="outline-none w-[18px] h-[18px] accent-gray-800 cursor-pointer"
              name="create_log_monitor"
            />
            <p>Create Log Monitor</p>
            <div className="relative group">
              <i className="bx bx-question-mark p-0.5 bg-gray-800 rounded-full text-white cursor-pointer"></i>
              <div className="absolute bg-gray-800 w-60 text-white text-xs rounded-lg p-2 -top-18 -left-25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none text-left">
                สร้าง Account สำหรับใช้เข้าสู่ระบบ Dozzle โดยใช้ Username/Password (หากใช้ Log Monitor)
              </div>
            </div>
          </div> */}
          <div className="flex flex-1 justify-start items-center gap-2 ">
            <input
              type="checkbox"
              className="outline-none w-[18px] h-[18px] accent-gray-800 cursor-pointer"
              name="create_db"
              onChange={(e) => setdb(e.target.checked)}
            />
            <p>Create Database</p>
            <div className="relative group">
              <i className="bx bx-question-mark p-0.5 bg-gray-800 rounded-full text-white cursor-pointer"></i>
              <div className="absolute bg-gray-800 w-60 text-white text-xs rounded-lg p-2 -top-18 -left-25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none text-left">
                สร้าง Account สำหรับเชื่อมต่อ Database โดยใช้ Username/Password
                และจัดการโดย phpmyadmin (หากใช้ Database)
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full p-3 rounded-full bg-gray-800 text-white hover:bg-gray-100 hover:text-gray-800 transition font-medium text-lg cursor-pointer"
      >
        Register
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
            {alert == true && msg !== "Loading..." && (
              <div className="flex justify-center items-center w-full h-[90%] flex-col gap-4">
                <UserCheck className="text-green-600" size={40} />
                <p className="text-md">{msg}</p>
              </div>
            )}
            {alert == false && msg !== "Loading..." && (
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
