"use client";
import { ArrowUpRight, Activity } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";

export default function Get_users_systemlist() {
  const data_container: SetStateAction<any[]> = [];
  const [refresh, setRefresh] = useState(0)
  const [container, setContainer] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      setRefresh(Date.now());
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchContainer = async () => {
      try {
        const res = await fetch("/api/container_data");
        const data = await res.json();
        if (!res.ok) {
          setContainer(data_container);
          return;
        }
        setContainer(data);
      } catch (error) {
        console.log(error);
        setContainer(data_container);
      }
    };
    fetchContainer();
  }, [refresh]);

  if (container.length === 0) {
    return (
      <tr>
        <td
          colSpan={6}
          className="h-[65px] border-b hover:bg-gray-100 transition-all group"
        >
          No results found
        </td>
      </tr>
      );
  }
  return container.map((item, index) => (
    <tr
      key={index + 1}
      className="h-[65px] border-b hover:bg-gray-100 transition-all group"
    >
      <td className="max-w-[80px] truncate">{index + 1}</td>
      <td className="max-w-[80px] truncate">{item.container_name}</td>
      <td className="max-w-[80px] truncate">
        <div className="flex justify-center items-center gap-1">
          <a
            href={`https://${item.domain}`}
            className="text-sky-700 hover:text-sky-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.domain} {item.domain ? "" : "-"}
          </a>
          {item.domain && (
            <ArrowUpRight
              size={16}
              className="text-sky-700 group-hover:text-sky-900"
            />
          )}
        </div>
      </td>
      <td className="max-w-[80px] truncate">{item.type}</td>
      <td className="h-[65px] align-middle">
        <div className="relative w-full h-full flex justify-center items-center">
          { item.status == "running" &&
          <Activity className="text-green-500 transition-opacity duration-200 group-hover:opacity-0"/>
          }
          { item.status != "running" &&
          <Activity className="text-red-500 transition-opacity duration-200 group-hover:opacity-0" />
          }
          <span
            className={
              item.status == "running"
                ? "absolute text-sm text-green-600 font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                : "absolute text-sm text-red-500 font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            }
          >
            {item.status}
          </span>
        </div>
      </td>
    </tr>
  ));
}
