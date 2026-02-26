"use client";
import User_sidebar from "@/app/components/user_sidebar";
import Get_users_systemlist from "@/app/components/users_dashboard";
import {
  ArrowUpRight,
  ArrowUpToLine,
  Database,
  FileText,
  IdCard,
  MonitorCog,
  SquareActivity,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Dashboard =  () => {
  const [refresh, setRefresh] = useState(0)
  const [data, setData] = useState({
  username: "Loading...",
  user_total: 0,
  upload_total: 0,
  req_total: 0,
  user_upload_total: 0,
  max_containers: 0,
  container_used: 0,
});

  useEffect(() => {
    const interval = setInterval(async () => {
      setRefresh(Date.now());
    }, 12000);

    return () => clearInterval(interval);
  }, []);

useEffect(() => {
  const fetchData = async () => {
    const res = await fetch("/api/dashboard", { cache: "no-store" });
    const data = await res.json();
    setData(data);
  };

  fetchData();
}, [refresh]);

const { username, user_upload_total, max_containers, container_used } = data;
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <User_sidebar />
      <main className="flex flex-12 h-full flex-col items-center justify-center gap-3">
        <div className="h-[90%] w-[90%] flex flex-col justify-start items-center gap-3">
          <div className="w-full h-[65%] rounded-3xl flex justify-between items-center flex-col overflow-hidden">
            <div className="w-full h-[15%] pl-4 flex items-center justify-between">
              <div className="flex items-center justify-start gap-3 text-xl font-[600]">
                <MonitorCog size={30} />
                <p>My System and Container</p>
              </div>
              <div className="flex items-center justify-end gap-3 text-xl text-gray-800 font-[600]">
                <IdCard size={35} />
                <div className="max-w-[250px] truncate">{username}</div>
                <div className="ml-5">({container_used}/{max_containers})</div>
              </div>
            </div>
            <div className="w-full h-[85%] flex justify-center items-start overflow-y-auto custom-scroll border rounded-3xl">
              <table className="table-auto w-full border-collapse">
                <thead className="bg-gray-800 sticky top-0 z-10">
                  <tr className="h-[70px] p-2 text-lg text-center text-white">
                    <th className="w-[10%]">No.</th>
                    <th className="w-[25%]">Container Name</th>
                    <th className="w-[20%]">Domain</th>
                    <th className="w-[15%]">Type</th>
                    <th className="w-[10%]">Status</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <Get_users_systemlist />
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full h-[35%] flex justify-between items-center">
            <Link
              className="h-[90%] w-[22%] border rounded-3xl flex justify-center items-center gap-3 flex-col p-2 transition duration-200 shadow-gray-100 hover:bg-gray-800 hover:text-white"
              href={"/users/upload"}
            >
              <span className="h-full w-full flex flex-col justify-between items-center font-[600]">
                <div className="w-full h-[20%] pt-3 pl-3 flex justify-start items-center gap-2 text-md">
                  <ArrowUpToLine />
                  <p>Uploads Total</p>
                </div>
                <div className="w-full h-[30%] text-2xl flex justify-center items-center">
                  <p>{user_upload_total}</p>
                </div>
                <div className="w-full h-[20%]"></div>
              </span>
            </Link>
            <Link
              className="h-[90%] w-[22%] border rounded-3xl flex justify-center items-center gap-3 flex-col p-2 transition duration-200 shadow-gray-100 hover:bg-gray-800 hover:text-white"
              href={"/users/history"}
            >
              <span className="h-full w-full flex flex-col justify-between items-center font-[600]">
                <div className="w-full h-[20%] pt-3 pl-3 flex justify-start items-center gap-2 text-md">
                  <SquareActivity />
                  <p>History Log</p>
                </div>
                <div className="w-full h-[30%] text-lg flex justify-center items-center outline-none">
                  <p>Monitoring Log </p>
                </div>
                <div className="w-full h-[20%]"></div>
              </span>
            </Link>
            <a
              className="h-[90%] w-[22%] border rounded-3xl flex justify-center items-center gap-3 flex-col p-2 transition duration-200 shadow-gray-100 hover:bg-gray-800 hover:text-white"
              href="https://pma.addp.site"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="h-full w-full flex flex-col justify-between items-center font-[600]">
                <div className="w-full h-[20%] pt-3 pl-3 flex justify-start items-center gap-2 text-md">
                  <Database />
                  <p>PHP Myadmin</p>
                </div>
                <div className="w-full h-[30%] text-lg flex justify-center items-center outline-none">
                  <p>Manage DB </p>
                  <ArrowUpRight />
                </div>
                <div className="w-full h-[20%]"></div>
              </span>
            </a>
            <a
              className="h-[90%] w-[22%] border rounded-3xl flex justify-center items-center gap-3 flex-col p-2 transition duration-200 shadow-gray-100 hover:bg-gray-800 hover:text-white"
              href="https://docs.addp.site"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="h-full w-full flex flex-col justify-between items-center font-[600]">
                <div className="w-full h-[20%] pt-3 pl-3 flex justify-start items-center gap-2 text-md">
                  <FileText />
                  <p>Documents</p>
                </div>
                <div className="w-full h-[30%] text-lg flex justify-center items-center outline-none">
                  <p>Read Doc</p>
                  <ArrowUpRight />
                </div>
                <div className="w-full h-[20%]"></div>
              </span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
