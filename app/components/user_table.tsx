"use client";
import { Pencil, User, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function UserTable() {
  const users = [
    {
      username: "admin",
      email: "admin@ct.com",
      role: "User",
      container: 1,
      max_containers: 5,
      db: true,
    },
    {
      username: "student01",
      email: "student01@stu.com",
      role: "User",
      container: 3,
      max_containers: 5,
      db: true,
    },
    {
      username: "student02",
      email: "student02@stu.com",
      role: "User",
      container: 1,
      max_containers: 5,
      db: false,
    },
  ];
  const [data, setData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [icon, setIcon] = useState(false);
  const [container, setContainers] = useState("5");
  const [usersTable, setUserstable] = useState<any[]>([]);
  const [msg, setmsg] = useState("");
  const [username, setusername] = useState("");
  const [user_del, setdel_username] = useState("");
  const [refresh, setrefresh] = useState(0);
  const [task_id, setTaskID]  = useState("");

  function userData(params: any) {
    if (params) {
      setData(params);
      setIsOpen(true);
      setIcon(params.db);
      setContainers(params.max_containers);
      setusername(params.username);
    } else {
      setIsOpen(false);
      setData(null);
    }
  }
  const container_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const allowed = "0123456789";
    const num_value = parseInt(value);

    if (value.includes(" ")) {
      return;
    }
    if (num_value > 10 || num_value < 1) {
      return;
    }
    for (const ch of value) {
      if (!allowed.includes(ch)) {
        return;
      }
    }
    setContainers(value);
  };
  const change_icon = (e: React.MouseEvent<HTMLElement>) => {
    setIcon(!icon);
  };

  useEffect(() => {
    if (!task_id) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/task", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task_id: task_id }),
        });
        
        const data = await res.json();
        if (res.status === 200) {
          setrefresh(Date.now()); 
          setTaskID("");        
          setmsg(data.message); 
          setTimeout(() => {
            setIsOpen(false);   
            setmsg("");         
          }, 500);
        } 
        else if (res.status >= 400) {
          setmsg(data.error);
          setTaskID("");       
        }

      } catch (error) {
        console.error(error);
        setTaskID("");
      }
    }, 500);

    return () => clearInterval(interval);

  }, [task_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (!res.ok) {
          setUserstable(users);
          // console.log(username);
          return;
        }
        // console.log(data);
        setUserstable(data);
      } catch (error) {
        console.log(error);
        setUserstable(users);
      }
    };
    fetchData();
  }, [refresh]);
  const change_max_container = async (e: React.FormEvent) => {
    e.preventDefault();
    let max_containers = container;
    let db_mode = icon;
    let user = username;
    // console.log(username);
    const res = await fetch("/api/maxcontainer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, max_containers, db_mode }),
    });
    const data = await res.json();
    if (!res.ok) {
      setmsg(data.error);
      setTimeout(() => {
        setmsg("");
      }, 2000);
      return;
    }
    setmsg(data.message);
    setrefresh(Date.now());
    setTimeout(() => {
      setmsg("");
    }, 2000);
  };
  const del_user = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/deluser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_del }),
    });
    const data = await res.json();
    if (!res.ok) {
      setmsg(data.error);
      setTimeout(() => {
        setmsg("");
      }, 2000);
      return;
    }

    if (data.task_id) {
      setTaskID(data.task_id);
      setIsOpen(false);
      setmsg("Deleting user...");
      setrefresh(Date.now());
      return;
    }
  };
  return (
    <main className="flex flex-12 h-full justify-center items-center relative">
      <div className="flex w-[90%] h-[90%] justify-center items-center">
        <div className="w-full h-full flex justify-center items-start overflow-y-auto custom-scroll border rounded-3xl relative">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-800 sticky top-0 z-10">
              <tr className="h-[70px] text-lg text-center text-white">
                <th className="w-[10%]">No.</th>
                <th className="w-[20%]">Username</th>
                <th className="w-[20%]">Email</th>
                <th className="w-[10%]">Role</th>
                <th className="w-[15%]">Containers</th>
                <th className="w-[15%]">Database</th>
                <th className="w-[10%]">Edit</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {usersTable.map((user, index) => (
                <tr
                  key={index}
                  className="h-[60px] border-b hover:bg-gray-100 transition-all"
                >
                  <td>{index + 1}</td>
                  <td className="max-w-[80px] truncate">{user.username} {user.status == null ?  "": <span className="text-red-500">  (Deleting)</span>}</td>
                  <td className="max-w-[80px] truncate">{user.email}</td>
                  <td className="max-w-[80px] truncate align-middle">
                    {user.role}
                  </td>
                  <td>
                    {user.container} / {user.max_containers}
                  </td>
                  <td>{user.db ? "Connected" : user.req_db ? "Request DB" : "Not Connected"}</td>
                  <td>
                    <div className="flex justify-center items-center w-full h-full">
                      <button
                        onClick={() => userData(user)}
                        className="p-3 rounded-full hover:bg-gray-200 h-full flex justify-center items-center cursor-pointer transition-colors"
                      >
                        <Pencil size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && data && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition duration-200">
          <div className="flex flex-col items-center justify-start w-[25%] h-[50%] bg-white rounded-3xl p-2">
            <div className="w-full h-[15%] flex justify-center items-center text-2xl font-[600] flex-col gap-1">
              <span className="h-[60%] flex justify-center items-end">
                Edit User
              </span>
              <span className="text-[16px] font-[400] text-gray-500 h-[40%] flex justify-center items-center overflow-hidden w-[90%]">
                {msg}
              </span>
            </div>
            <div className="w-full px-5 gap-3 h-[15%] flex justify-start items-center text-xl font-[600]">
              <User size={40} /> <span>{data.username}</span>
            </div>
            <form
              action="#"
              method="post"
              className="w-full px-5 h-[55%] bg-white flex flex-col justify-start gap-2"
              id="editForm"
              onSubmit={change_max_container}
            >
              <div className="flex justify-center items-start flex-col gap-3 mt-5">
                <label className="block text-sm font-bold text-[18px]">
                  Max Containers
                </label>
                <input
                  type="text"
                  className="w-full py-2 border px-3 outline-none rounded-lg"
                  value={container}
                  onChange={container_change}
                  required
                  placeholder="6 - 10 (Number Only)"
                />
              </div>
              <div className="flex justify-between items-center mt-5">
                <label className="block text-sm font-bold text-[18px]">
                  <i className="bx bxs-data"></i> Use Database
                </label>
                <i
                  className={
                    icon
                      ? "bx bxs-toggle-right text-5xl cursor-pointer text-green-600 transition duration-300"
                      : "bx bxs-toggle-left text-5xl cursor-pointer text-gray-500 transition duration-300"
                  }
                  onClick={change_icon}
                ></i>
              </div>
            </form>
            <div className="flex justify-end items-center gap-4 w-full px-5 h-[15%] pb-4">
              <button
                type="submit"
                className="p-2 flex justify-center items-center bg-blue-500 text-white w-[80px] rounded-lg cursor-pointer hover:bg-blue-700 transition duration-200"
                form="editForm"
              >
                Edit
              </button>
              <form
                action="#"
                method="post"
                className="p-2 flex justify-center items-center bg-red-500 text-white w-[80px] rounded-lg cursor-pointer hover:bg-red-700 transition duration-200"
                id="delForm"
                onSubmit={del_user}
              >
                <input
                  type="hidden"
                  name="username_del"
                  value={data.username}
                />
                <button
                  type="submit"
                  className="cursor-pointer"
                  onClick={() => setdel_username(data.username)}
                  form="delForm"
                >
                  Delete
                </button>
              </form>
              <button
                type="button"
                className="p-2 flex justify-center items-center bg-gray-500 text-white w-[80px] rounded-lg cursor-pointer hover:bg-gray-700 transition duration-200"
                onClick={() => userData(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
