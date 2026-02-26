"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rocket, Key, User } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? "text-sky-600 cursor-pointer flex justify-center items-center hover:text-gray-800 transition-all duration-200"
      : "cursor-pointer flex justify-center items-center hover:text-sky-600 transition-all duration-200";

  return (
    <nav className="h-[90px] w-full sticky z-50 top-0 left-0 flex justify-center items-center border-b border-gray-100 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center h-full w-[75%] mt-3 py-3">
        <div className="flex justify-start items-center flex-1">
          <Link
            className="flex justify-start items-center gap-2 flex-1 cursor-pointer hover:text-sky-600 transition-all duration-200"
            href={"/"}
          >
            <span>
              <Rocket size={50} />
            </span>
            <span className="text-2xl font-bold">Adocs</span>
          </Link>
        </div>
        <div className="flex justify-center items-center gap-15 text-lg font-bold flex-2 ">
          <Link href="/" className={isActive("/")}>
            Home
          </Link>
          <a
            href="https://docs.addp.site"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer flex justify-center items-center hover:text-sky-600 transition-all duration-200"
          >
            Document
          </a>
          <Link href="/contact" className={isActive("/contact")}>
            About
          </Link>
          <Link href="/system-list" className={isActive("/system-list")}>
            Containers
          </Link>
        </div>
        <div className="flex justify-end items-center gap-5 flex-1 text-medium font-medium text-white">
          <Link
            href="/login"
            className="w-[160px] px-7 py-4 rounded-full flex justify-center items-center gap-2 text-black hover:text-sky-800 hover:bg-sky-50 transition-all duration-200"
          >
            <Key /> Login
          </Link>
          <Link
            href="/register"
            className="w-[160px] px-7 py-4 bg-gray-800 rounded-full flex justify-center items-center gap-2 text-white hover:bg-sky-50 hover:text-sky-800 transition-all duration-200"
          >
            <User /> Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
