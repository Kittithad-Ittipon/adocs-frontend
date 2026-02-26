"use client";
import { icons, Pencil, Rocket, User, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function UserTable() {
  const connt: React.SetStateAction<any[]> = [];

  const [data, setData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [containerTable, setContainerTable] = useState<any[]>([]);
  const [msg, setmsg] = useState("");
  const [port, setPort] = useState("");
  const [domain, setDomain] = useState("");
  const [refresh, setrefresh] = useState(0);
  const [task_id, setTaskID]  = useState("");
  const [del, setDel] = useState(false);
  const [containerName, setContainername] = useState("");
  const [type, set_type] = useState("");
  const [stack, setStack] = useState("");
  const [open_icon, setOpenicon] = useState(false);
  const [status, setStatus] = useState("");

  function userData(params: any) {
    if (params) {
      setData(params);
      setIsOpen(true);
      setContainername(params.container_name);
      set_type("");
      setStack(params.project_path);
      setPort(params.port_internal);
      setDomain(params.domain);
      set_type(params.forward_scheme);
      setOpenicon(params.publish);
      setStatus(params.status);
    } else {
      setIsOpen(false);
      setData(null);
    }
  }
  const check_port = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let port = parseInt(value);
    const allowed = "0123456789";
    for (const num of value) {
      console.log(num);
      console.log(value);
      if (!allowed.includes(num)) {
        setmsg("Port : Character Not Allowed");
        return;
      }
    }
    if (value.includes(" ")) {
      setmsg("Port : Space not allowed");
      return;
    }
    if (value.length > 5) {
      setmsg("Port : Maximum length is 5 characters");
      return;
    }
    if (port < 1 || port > 65535) {
      setmsg("Port : 1 - 65535");
      return;
    }
    setmsg("");
    setPort(value);
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
    const fetchContainermanage = async () => {
      try {
        const res = await fetch("/api/container_data");
        const data = await res.json();
        if (!res.ok) {
          setContainerTable(connt);
          return;
        }
        setContainerTable(data);
      } catch (error) {
        console.log(error);
        setContainerTable(connt);
      }
    };
    fetchContainermanage();
  }, [refresh]);

  const check_type = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.target.value;
    set_type(value);
    // console.log(value)
  };

  const port_Update = async (e: React.FormEvent) => {
    e.preventDefault();
    const pub = open_icon;
    const res = await fetch("/api/port_update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ port, containerName, type, pub }),
    });

    const data = await res.json();

    if (!res.ok) {
      setmsg(data.error);
      return;
    }

    setmsg(data.message);
    setrefresh(Date.now());
    setTimeout(() => {
      setmsg("");
    }, 200);
  };

  const del_stack = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/del_stack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stack }),
    });
    const data = await res.json();
    if (!res.ok) {
      setmsg(data.error);
      return;
    }
    setmsg(data.message);
    setrefresh(Date.now());
    setTaskID(data.task_id);
    setTimeout(() => {
      setmsg("");
      userData(null);
    }, 200);
  };

  const statusForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/status_container", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stack, status}),
    });
    const data = await res.json();

    if (!res.ok) {
      setmsg(data.error);
      return;
    }
    setmsg(data.message);
    setrefresh(Date.now());
    setTaskID(data.task_id);
    setTimeout(() => {
      setmsg("");
      userData(null);
    }, 200);
  };

  const change_icon = (e: React.MouseEvent<HTMLElement>) => {
    setOpenicon(!open_icon);
  };

  return (
    <main className="flex flex-12 h-full justify-center items-center relative">
      <div className="flex w-[90%] h-[90%] justify-center items-center">
        <div className="w-full h-full flex justify-center items-start overflow-y-auto custom-scroll border rounded-3xl relative">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-800 sticky top-0 z-10">
              <tr className="h-[70px] text-lg text-center text-white">
                <th className="w-[10%]">No.</th>
                <th className="w-[10%]">Protocol</th>
                <th className="w-[15%]">Domain</th>
                <th className="w-[10%]">Port</th>
                <th className="w-[10%]">Publish</th>
                <th className="w-[10%]">Status</th>
                <th className="w-[25%]">Project Path</th>
                <th className="w-[10%]">Edit</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {containerTable.map((container, index) => (
                <tr
                  key={index}
                  className="h-[60px] border-b hover:bg-gray-100 transition-all"
                >
                  <td>{index + 1}</td>
                  <td className="max-w-[80px] truncate">
                    {container.forward_scheme}
                  </td>
                  <td className="max-w-[80px] truncate">{container.domain}</td>
                  <td className="max-w-[80px] truncate">
                    {container.port_internal}
                  </td>
                  <td className="max-w-[80px] truncate">
                    {container.publish ? "Yes" : "No"}
                  </td>
                  <td className="max-w-[80px] truncate">{container.status == "running" ? "Running" : container.status == "pending" ? "Pending" : "Stopped"}</td>
                  <td className="max-w-[80px] truncate">
                    {container.project_path}
                  </td>
                  <td>
                    <div className="flex justify-center items-center w-full h-full">
                      <button
                        onClick={() => userData(container)}
                        className="p-3 rounded-full hover:bg-gray-200 h-full flex justify-center items-center cursor-pointer transition-colors"
                      >
                        <Pencil size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {containerTable.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="h-[65px] border-b hover:bg-gray-100 transition-all group"
                  >
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && data && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition duration-200">
          <div className="flex flex-col items-center justify-start w-[25%] h-[65%] bg-white rounded-3xl p-2">
            <div className="w-full h-[15%] flex justify-center items-center text-2xl font-[600] flex-col gap-1">
              <span className="h-[60%] flex justify-center items-end">
                Edit System
              </span>
              <span className="text-[16px] font-[400] text-gray-500 h-[40%]">
                {msg}
              </span>
            </div>
            <div className="w-full px-5 gap-3 h-[10%] flex justify-start items-center text-xl font-[600]">
              <Rocket size={40} />
              <span className="truncate max-w-[320px] text-lg">{domain}</span>
            </div>
            {!del && (
              <form
                action="#"
                method="post"
                className="w-full px-5 h-[65%] bg-white flex flex-col justify-start gap-2"
                id="editForm"
                onSubmit={port_Update}
              >
                <div className="flex justify-center items-start flex-col gap-3 mt-5">
                  <label className="block text-sm font-bold text-[18px]">
                    Protocol
                  </label>
                  <select
                    className="w-full py-2 border px-3 outline-none rounded-lg"
                    onChange={check_type}
                    value={type}
                    required
                  >
                    <option disabled value="">
                      Choose project type
                    </option>
                    <option value="http">http</option>
                    <option value="https">https</option>
                  </select>
                </div>
                <div className="flex justify-center items-start flex-col gap-3 mt-5">
                  <label className="block text-sm font-bold text-[18px]">
                    Port
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 border px-3 outline-none rounded-lg"
                    value={port}
                    onChange={check_port}
                    // required
                    placeholder="Enter port app (1 - 65535)"
                  />
                </div>
                <div className="flex justify-between items-start gap-3 mt-5">
                  <label className="block text-sm font-bold text-[18px]">
                    Publish
                  </label>
                  <i
                    className={
                      open_icon
                        ? "bx bxs-toggle-right text-5xl cursor-pointer text-green-600 transition duration-300"
                        : "bx bxs-toggle-left text-5xl cursor-pointer text-gray-500 transition duration-300"
                    }
                    onClick={change_icon}
                  ></i>
                </div>
              </form>
            )}
            {del && (
              <div className="w-full px-5 h-[65%] bg-white flex flex-col justify-start gap-2">
                <div className="w-[90%] h-full text-lg flex text-center mt-8">
                  Are you sure you want to delete all containers in this stack ?
                </div>
              </div>
            )}
            <div className="flex justify-end items-center gap-4 w-full px-5 h-[15%] pb-4">
              {!del && (
                <>
                  <form
                    method="post"
                    id="statusForm"
                    className="hidden"
                    onSubmit={statusForm}
                  ></form>

                  <button
                    type="submit"
                    className={`p-2 flex justify-center items-center ${status === "running" ? "bg-yellow-500 hover:bg-yellow-700" : "bg-green-500 hover:bg-green-700"} text-white w-[80px] rounded-lg cursor-pointer transition duration-200`}
                    form="statusForm"
                  >
                    {status === "running" ? "Stop" : "Start"}
                  </button>
                  <button
                    type="submit"
                    className="p-2 flex justify-center items-center bg-blue-500 text-white w-[80px] rounded-lg cursor-pointer hover:bg-blue-700 transition duration-200"
                    form="editForm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="p-2 flex justify-center items-center bg-red-500 text-white w-[80px] rounded-lg cursor-pointer hover:bg-red-700 transition duration-200"
                    onClick={() => {
                      setDel(true);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="p-2 flex justify-center items-center bg-gray-500 text-white w-[80px] rounded-lg cursor-pointer hover:bg-gray-700 transition duration-200"
                    onClick={() => userData(null)}
                  >
                    Cancel
                  </button>
                </>
              )}
              {del && (
                <>
                  <form
                    action="#"
                    method="post"
                    className="p-2 flex justify-center items-center bg-red-500 text-white w-[80px] rounded-lg cursor-pointer hover:bg-red-700 transition duration-200"
                    id="delForm"
                    onSubmit={del_stack}
                  >
                    <input type="hidden" name="username_del" value={stack} />
                    <button
                      type="submit"
                      className="cursor-pointer"
                      form="delForm"
                    >
                      Confirm
                    </button>
                  </form>
                  <button
                    type="button"
                    className="p-2 flex justify-center items-center bg-gray-500 text-white w-[80px] rounded-lg cursor-pointer hover:bg-gray-700 transition duration-200"
                    onClick={() => {
                      setDel(false);
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
