"use client";
import { Cuboid, Rocket, ShieldUser, UserCog, Users, User, History } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function User_sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (path: string) => {
      return pathname === path ? "border-sky-600 text-sky-600 hover:text-sky-600 hover:bg-sky-50 " : "hover:bg-gray-800 hover:text-white";
    }

  const logout = async () => {
    await fetch("/api/logout", { method: "POST"});
    console.log("LOGOUT");
    router.replace("/");
    router.refresh();
  };
  return (
    <nav className="bg-white flex flex-3 h-full flex-col justify-start items-center border-r">
      <Link
        href="/"
        className="flex justify-center items-center text-4xl pt-4 gap-2 hover:text-sky-600 transition duration-200 group h-[15%] outline-none"
      >
        <span className="flex justify-center items-center text-gray-800 p-4 rounded-2xl border border-gray-300 hover:bg-sky-100 hover:text-sky-500 hover:border-sky-300 transition duration-200 cursor-pointer">
          <Rocket size={40} />
        </span>
      </Link>
      <div className="flex flex-col justify-start items-start h-[15%] w-[80%] gap-3">
        <span className="text-lg font-[400]">Home</span>
        <Link
          href="/users/dashboard"
          className={`${isActive("/users/dashboard")} w-full h-[50px] rounded-2xl border justify-start items-center flex gap-3 pl-5 text-md transition duration-200 cursor-pointer`}
        >
          <i className="bx bxs-dashboard text-xl"></i> <span>Dashboard</span>
        </Link>
      </div>
      <div className="flex flex-col justify-start items-start h-[50%] w-[80%] gap-3">
        <span className="text-lg font-[400]">Utilities</span>
        <Link
          href="/users/upload"
          className={`${isActive("/users/upload")} w-full h-[50px] rounded-2xl border justify-start items-center flex gap-3 pl-5 text-md transition duration-200 cursor-pointer`}
        >
          <i className="bx bx-window-open text-xl"></i>{" "}
          <span>Upload Project</span>
        </Link>
        <Link
          href="/users/container-manage"
          className={`${isActive("/users/container-manage")} w-full h-[50px] rounded-2xl border justify-start items-center flex gap-3 pl-5 text-md transition duration-200 cursor-pointer`}
        >
          <i className="bx bx-link-external text-xl"></i> <span>System</span>
        </Link>
        <Link
          href="/users/me"
          className={`${isActive("/users/me")} w-full h-[50px] rounded-2xl border justify-start items-center flex gap-3 pl-5 text-md transition duration-200 cursor-pointer`}
        >
          <User /> <span>Profile</span>
        </Link>
        <Link
          href="/users/history"
          className={`${isActive("/users/history")} w-full h-[50px] rounded-2xl border justify-start items-center flex gap-3 pl-5 text-md transition duration-200 cursor-pointer`}
        >
          <History /> <span>History</span>
        </Link>
      </div>
      <div className="flex flex-col justify-start items-start h-[15%] w-[80%] gap-3">
        <span className="text-lg font-[400]">Logout</span>
        <div className="w-full h-[50px]">
          <button
            type="submit"
            className="w-full h-[50px] rounded-2xl border justify-start items-center flex gap-3 pl-5 text-md hover:bg-gray-800 hover:text-white transition duration-200 cursor-pointer"
            onClick={logout}
          >
            <i className="bx bx-log-out-circle text-xl"></i>Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
