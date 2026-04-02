"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BsThreeDots } from "react-icons/bs";

type containersData = {
  protocol: string;
  domain: string;
  port: string;
  pubblish: boolean;
  status: string;
  projectPath: string;
};

const ComponentContainersManage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [containersData, setContainersData] = useState<containersData[]>([
    {
      protocol: "http",
      domain: "adoxs.addp.site",
      port: "80",
      pubblish: true,
      status: "running",
      projectPath: "/hdd/users/data/admin",
    },
    {
      protocol: "http",
      domain: "adoxs.addp.site",
      port: "80",
      pubblish: false,
      status: "pending",
      projectPath: "/hdd/users/data/admin",
    },
    {
      protocol: "http",
      domain: "adoxs.addp.site",
      port: "80",
      pubblish: false,
      status: "stopped",
      projectPath: "/hdd/users/data/admin",
    },
  ]);
  return (
    <div className="max-w-screen min-h-full flex items-center justify-start flex-col">
      <Breadcrumb className="h-full w-full justify-center items-center mt-10 md:mt-2 md:px-9 md:py-5">
        <BreadcrumbList className="w-full h-full text-md xl:text-lg font-[600] justify-center mb-4 sm:mb-0 sm:justify-start items-center">
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-gray-400">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-[600]">
              Containers Manage
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 w-full p-4 md:px-8">
        <div
          className={`rounded-xl overflow-hidden w-full overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] transition-all duration-400 ${isOpen ? "max-h-[0px]" : "border max-h-[700px]"}`}
        >
          <Table className="w-full">
            <TableHeader className="bg-muted/50">
              <TableRow className="text-sm text-muted-foreground">
                <TableHead className="font-semibold px-6 h-12">NO.</TableHead>
                <TableHead className="font-semibold px-6 h-12">
                  PROTOCOL
                </TableHead>
                <TableHead className="font-semibold h-12 py-5">
                  DOMAIN
                </TableHead>
                <TableHead className="font-semibold h-12">PORT</TableHead>
                <TableHead className="font-semibold h-12">
                  PROJECT PATH
                </TableHead>
                <TableHead className="font-semibold h-12 text-center">
                  PUBLISH
                </TableHead>
                <TableHead className="font-semibold h-12 text-center">
                  STATUS
                </TableHead>
                <TableHead className="font-semibold h-12">EDIT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {containersData.map((value, index) => (
                <TableRow
                  key={index}
                  className="transition-colors hover:bg-muted/40"
                >
                  <TableCell className="px-6 py-4">
                    <div className="max-w-[200px] truncate font-medium">
                      {index + 1}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div
                      className="max-w-[150px] truncate font-[400]"
                      title={value.protocol}
                    >
                      {value.protocol}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div
                      className="max-w-[150px] truncate font-[400]"
                      title={value.domain}
                    >
                      {value.domain}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div
                      className="max-w-[200px] truncate font-[400]"
                      title={value.port}
                    >
                      {value.port}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div
                      className="max-w-[200px] truncate font-[400]"
                      title={value.projectPath}
                    >
                      {value.projectPath}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <span className={`px-2.5 py-1 ${value.pubblish ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"} rounded-md text-xs font-medium max-w-[150px] truncate inline-block transition duration-200`}>
                      {value.pubblish ? "YES" : "NO"}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        value.status == "running"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : value.status == "pending"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {value.status == "running"
                        ? "Runnung"
                        : value.status == "pending"
                          ? "Pending"
                          : "Stoped"}
                    </span>
                  </TableCell>
                  <TableCell className="flex items-center justify-start">
                    <button className="flex justify-start items-center text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 transition-colors h-full">
                      <BsThreeDots size={30} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              {containersData.length === 0 && (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={8}
                    className="py-5 text-center text-muted-foreground font-medium"
                  >
                    No Results Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default ComponentContainersManage;
