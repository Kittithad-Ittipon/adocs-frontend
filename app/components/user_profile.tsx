"use client";
import { div } from "framer-motion/client";
import { TriangleAlert, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Profile() {
  const [default_data, setUserData] = useState({
    username: "Loading...",
    email: "Loading...",
    database: "Loading...",
  });
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg_profile, set_profilemsg] = useState("");
  const [profile_alert, setprofile_alert] = useState("hidden");
  const [del_msg, setdel_msg] = useState("Delete Account");
  const [btn_change, setbtn_change] = useState(true);

  const username = default_data.username;
  const email = default_data.email;
  const database = default_data.database;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        let db = "";
        if (data.database) {
          db = "Connected";
        } else {
          db = "Not Connected";
        }
        setUserData({
          username: data.username || "No Username",
          email: data.email || "No Email",
          database: db || "No DB",
        });
      } else {
        setUserData({
          username: "Error Fetching Data",
          email: "Error Fetching Data",
          database: "Error Fetching Data",
        });
      }
    };

    fetchData();
  }, []);

  const re_password = async (e: React.FormEvent) => {
    e.preventDefault();
    set_profilemsg("Loading...");
    setprofile_alert("");
    const res = await fetch("/api/re_password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, newPassword }),
    });
    const data = await res.json();
    // console.log(data.error);
    if (!res.ok) {
      set_profilemsg(data.error);
      return;
    }
    set_profilemsg(data.message);
    setPassword("");
    setNewPassword("");
  };

  const check_connected = async (e: React.MouseEvent) => {
    try {
      const req_db = true;
      const res = await fetch("/api/req_db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ req_db }),
      });
      const data = await res.json();
      if (!res.ok) {
        set_profilemsg(data.error);
        setprofile_alert("");
        setTimeout(() => {
          set_profilemsg("");
          setprofile_alert("hidden");
        }, 2000);
        return;
      }
      set_profilemsg(data.message);
      setprofile_alert("hidden");
      setTimeout(() => {
        set_profilemsg("");
        setprofile_alert("hidden");
      }, 2000);
    } catch (error) {
      set_profilemsg("Server Error");
      setprofile_alert("");
    }
  };
  const check_del_account = async (e: React.MouseEvent) => {
    setdel_msg("Confirm");
    setbtn_change(false);
    set_profilemsg("Delete account and all associated data ?");
    setprofile_alert("");
    if (del_msg === "Confirm") {
      try {
        const res = await fetch("/api/deluser", {
          method: "POST",
          headers: { "Conten-Type": "application/json" },
          body: JSON.stringify({ user_del: username }),
        });
        if (!res.ok) {
          set_profilemsg("Delete Error");
          setprofile_alert("");
          setTimeout(() => {
            set_profilemsg("");
            setprofile_alert("hidden");
          }, 2000);
          return;
        }
        set_profilemsg("Delete Success");
        const des_session = await fetch("/api/logout", { method: "POST" });
        window.location.href = "/";
        console.log("LOGOUT" + des_session);
      } catch (error) {
        set_profilemsg("Server Error");
        setprofile_alert("");
      }
    }
  };
  const check_del_cancel = (e: React.MouseEvent) => {
    setdel_msg("Delete Account");
    setbtn_change(true);
    set_profilemsg("");
    setprofile_alert("hidden");
  };
  return (
    <main className="flex flex-12 h-full justify-center items-center relative">
      <div className="flex w-[90%] h-[90%] justify-center items-center border rounded-3xl flex flex-col justify-between items-center overflow-hidden">
        <div className="flex-1 w-full flex flex-col justify-center items-center gap-3">
          <User size={60} />
          <h1 className="text-2xl font-bold">{username}</h1>
        </div>
        <div className="flex-4 w-full flex flex-col justify-start items-center gap-7">
          <div className="w-full h-[10%] flex justify-center items-center">
            <div className="w-[80%] h-full flex justify-center items-center ">
              <p className="w-full h-full justify-center items-center flex gap-3 text-gray-500">
                <TriangleAlert className={profile_alert} />
                <span>{msg_profile}</span>
              </p>
            </div>
          </div>
          <form
            className="w-full h-[70%] flex flex-col justify-start items-center gap-7"
            onSubmit={re_password}
            id="re_password"
          >
            <div className="w-[80%] flex items-center justify-center border rounded-2xl overflow-hidden">
              <p className="w-[20%] text-center border-r h-full flex justify-center items-center">
                Username
              </p>
              <input
                type="text"
                readOnly
                value={username}
                className="w-[80%] h-[50px] outline-none px-3 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="w-[80%] flex items-center justify-center border rounded-2xl overflow-hidden">
              <p className="w-[20%] text-center border-r h-full flex justify-center items-center">
                Email
              </p>
              <input
                type="text"
                readOnly
                value={email}
                className="w-[80%] h-[50px] outline-none px-3 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="w-[80%] flex items-center justify-center border rounded-2xl overflow-hidden">
              <p className="w-[20%] text-center border-r h-full flex justify-center items-center">
                Database
              </p>
              <input
                type="text"
                className={
                  database == "Connected"
                    ? "w-[80%] h-[50px] outline-none px-3 bg-gray-100 cursor-not-allowed text-green-600"
                    : "w-[80%] h-[50px] outline-none px-3 bg-gray-100 cursor-not-allowed"
                }
                value={database}
                readOnly
              />
            </div>
            <div className="w-[80%] flex items-center justify-center border rounded-2xl overflow-hidden">
              <p className="w-[20%] text-center border-r h-full flex justify-center items-center">
                Password
              </p>
              <input
                type="password"
                className="w-[80%] h-[50px] outline-none px-3"
                placeholder="Passoword"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
            <div className="w-[80%] flex items-center justify-center border rounded-2xl overflow-hidden">
              <p className="w-[20%] text-center border-r h-full flex justify-center items-center">
                New Password
              </p>
              <input
                type="password"
                className="w-[80%] h-[50px] outline-none px-3"
                placeholder="New Passoword"
                required
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                value={newPassword}
              />
            </div>
          </form>
          <div className="w-[80%] flex items-start justify-center  rounded-2xl overflow-hidden gap-4 h-[20%]">
            {btn_change && (
              <button
                className="bg-blue-500 w-[25%] h-[55px] rounded-full text-white text-md cursor-pointer transition duration-200 hover:bg-blue-700"
                type="submit"
                form="re_password"
              >
                Change Password
              </button>
            )}
            {btn_change && (
              <button
                className="bg-gray-500 w-[25%] h-[55px] rounded-full text-white text-md cursor-pointer transition duration-200 hover:bg-gray-700"
                onClick={check_connected}
              >
                Request Database Account
              </button>
            )}
            <button
              className="bg-red-500 w-[25%] h-[55px] rounded-full text-white text-md cursor-pointer transition duration-200 hover:bg-red-700"
              onClick={check_del_account}
            >
              {del_msg}
            </button>
            {!btn_change && (
              <button
                className="bg-gray-500 w-[25%] h-[55px] rounded-full text-white text-md cursor-pointer transition duration-200 hover:bg-gray-700"
                onClick={check_del_cancel}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
