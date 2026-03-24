"use client";

import { Eye, EyeOff, LockKeyhole, ShieldUser } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const forgotSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username or Email is required." })
    .regex(/^[a-zA-Z0-9@.]+$/, {
      message: "Special characters not allowed.",
    }),
});

const ForgotForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState<string>("");

  const CheckStateText = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);

    if (showPassword) {
      toast.info("Password Hidden", {
        description: "Your password is now hidden from view.",
      });
    } else {
      toast.warning("Password Visible", {
        description: "Your password is now visible on the screen.",
      });
    }
  };
  const toLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastID = toast.loading("Loading...");
    try {
      const result = forgotSchema.safeParse({
        username: username,
      });
      if (!result.success) {
        toast.dismiss(toastID);
        const errorMessage = result.error.issues[0].message;
        toast.error("Validation Error", { description: errorMessage });
        return;
      }
    } catch (error) {
      toast.dismiss(toastID);
      toast.error("Error", { description: "Server Error 500" });
    }
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error("Error", { id: toastID, description: data.error });
        return;
      }
      toast.success("Login Success", {
        id: toastID,
        description: data.message,
      });
    } catch (error) {
      toast.dismiss(toastID);
      toast.error("Error", { description: "Server Error 500" });
    }
  };
  return (
    <div className="relative w-[95%] md:w-[70%] lg:w-[50%] min-h-180 xl:w-[40%] 2xl:w-[35%] 2xl:min-h-185 3xl:min-h-180 3xl:w-[30%] 2xl:border-0 3xl:border md:border xl:border rounded-xl p-2 flex flex-col justify-between items-center">
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>
      <div className="w-1/2 px-8 flex justify-center items-center">
        <Link
          href={"/"}
          className="relative w-full text-4xl flex font-[700] justify-center items-center py-3 pt-10 gap-5 cursor-pointer transition duration-300 group"
        >
          <p className="bg-[linear-gradient(to_right,#0ea5e9,#67e8f9,#818cf8,#0ea5e9)] bg-clip-text text-transparent animate-rgb">
            ADOCS
          </p>
          <span className="absolute rounded-xl bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-sky-500 to-cyan-300 transform scale-x-0 group-hover:scale-x-100 transition duration-300 origin-left"></span>
        </Link>
      </div>
      <div className="h-[50%] w-full">
        <form
          action="#"
          method="post"
          className="w-full h-full flex flex-col gap-10 md:px-8"
          onSubmit={toLogin}
        >
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 items-center text-xl font-[600]">
              <ShieldUser size={30} /> Username / Email
            </div>
            <div>
              <Input
                placeholder="Enter Your Username or Email"
                id="username"
                type="text"
                className="h-15 shadow-none"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              ></Input>
            </div>
          </div>
          <div className="flex items-center justify-center mt-5">
            <button className="w-full p-3 h-auto bg-black/85 text-white text-lg font-[500] rounded-xl cursor-pointer transition duration-200 hover:bg-black/75 dark:text-black dark:bg-white dark:hover:bg-white/85 dark:hover:text-black">
              Send OTP
            </button>
          </div>
        </form>
      </div>
      <div className="mb-13 flex w-full px-8 justify-center flex-col gap-5 items-center pt-2">
        <div>
          Already have an account ?{" "}
          <Link
            href={"/login"}
            className="text-sky-500 font-[500] text-sky-500 dark:text-cyan-300 transition duration-200 hover:text-black hover:dark:text-white"
          >
            Login
          </Link>
        </div>
        <div>
          Don’t have an account ?{" "}
          <Link
            href={"/register"}
            className="text-sky-500 font-[500] text-sky-500 dark:text-cyan-300 transition duration-200 hover:text-black hover:dark:text-white"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ForgotForm;
