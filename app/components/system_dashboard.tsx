'use client'

import { Item } from "@radix-ui/react-select";
import { ArrowUpRight, Activity } from "lucide-react";
import { useEffect, useState } from "react";

export default function Getsystemlist() {
  const data_container = [
    {
      id: 1,
      container_name: "Portainer",
      domain: "portainer.addp.site",
      type: "System",
      status: "running",
    },
    {
      id: 2,
      container_name: "Nginx",
      domain: "nginx.addp.site",
      type: "System",
      status: "running",
    },
    {
      id: 3,
      container_name: "Technitium",
      domain: "technitium.addp.site",
      type: "System",
      status: "running",
    },
    {
      id: 4,
      container_name: "PHPmyadmin",
      domain: "pma.addp.site",
      type: "System",
      status: "running",
    },
    {
      id: 5,
      container_name: "Dozzle",
      domain: "dozzle.addp.site",
      type: "System",
      status: "running",
    },
    {
      id: 6,
      container_name: "Dashdot",
      domain: "dashdot.addp.site",
      type: "System",
      status: "running",
    },
    {
      id: 7,
      container_name: "Beszel",
      domain: "beszel.addp.site",
      type: "System",
      status: "running",
    },
  ];

  const [container, setContainer] = useState<any[]>([]);

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
  }, []);

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
      <td className="max-w-[80px] truncate" title={item.type}>
        {item.type}
      </td>
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
