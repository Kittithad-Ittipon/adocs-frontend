"use client";

import { CircleCheck, Rocket, TriangleAlert, UploadCloud } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { div } from "framer-motion/client";

export default function Upload() {
  const [msg, setmsg] = useState("");
  const [alert_msg, setalertmsg] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<any>(null);
  const [container_name, setContainername] = useState("");
  const [port, setPort] = useState("");
  const [domain, setDomain] = useState("");
  const [new_file, set_new_file] = useState(false);
  const [type, set_type] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const check_file = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.files?.[0];

    if (!value) {
      return;
    }

    if (!value?.name.endsWith(".zip")) {
      setmsg(".zip File Only");
      setalertmsg(true);
      setFile(null);
      setFileName("");
      return;
    }
    setmsg("");
    setalertmsg(false);
    setFileName(value.name);
    setFile(value);
  };
  const check_name = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const allowed = "abcdefghijklmnopqrstuvwxyz0123456789-_";

    if (value.includes(" ")) {
      setmsg("Container Name : Space not allowed");
      setalertmsg(true);
      value = "";
      return value;
    }
    if (value !== value.toLowerCase()) {
      setmsg("Container Name : UpperCase  not allowed");
      setalertmsg(true);
      return;
    }
    if (value.length > 50) {
      setmsg("Container Name : Maximum length is 50 characters");
      setalertmsg(true);
      return;
    }
    for (const ch of value) {
      console.log(ch);
      console.log(value);
      if (!allowed.includes(ch)) {
        setmsg("Container Name : Special characters not allowed");
        setalertmsg(true);
        return;
      }
    }
    setmsg("");
    setalertmsg(false);
    setContainername(value);
  };
  const check_port = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let port = parseInt(value);
    const allowed = "0123456789";
    for (const num of value) {
      console.log(num);
      console.log(value);
      if (!allowed.includes(num)) {
        setmsg("Port : Character Not Allowed");
        setalertmsg(true);
        return;
      }
    }
    if (value.includes(" ")) {
      setmsg("Port : Space not allowed");
      setalertmsg(true);
      return;
    }
    if (value.length > 5) {
      setmsg("Port : Maximum length is 5 characters");
      setalertmsg(true);
      return;
    }
    if (port < 1 || port > 65535) {
      setmsg("Port : 1 - 65535");
      setalertmsg(true);
      return;
    }
    setmsg("");
    setalertmsg(false);
    setPort(value);
  };
  const check_domain = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const allowed = "abcdefghijklmnopqrstuvwxyz0123456789-.";

    if (value.includes(" ")) {
      setmsg("Domain : Space not allowed");
      setalertmsg(true);
      return;
    }
    if (value !== value.toLowerCase()) {
      setmsg("Domain : UpperCase  not allowed");
      setalertmsg(true);
      return;
    }
    if (value.length > 25) {
      setmsg("Domain : Maximum length is 25 characters");
      setalertmsg(true);
      return;
    }
    for (const ch of value) {
      console.log(ch);
      console.log(value);
      if (!allowed.includes(ch)) {
        setmsg("Domain Name : Special characters not allowed");
        setalertmsg(true);
        return;
      }
      if (
        value.includes("--") ||
        value.includes("..") ||
        value.includes("-.") ||
        value.includes(".-")
      ) {
        setmsg("Domain Name : Double  ' -- ' or ' .. ' not allowed");
        setalertmsg(true);
        return;
      }
      if (value.startsWith("-") || value.startsWith(".")) {
        setmsg("Domain Name : First  ' - ' or ' . ' not allowed");
        setalertmsg(true);
        return;
      }
      if (value.endsWith(".")) {
        setmsg("Domain Name : End  ' . ' not allowed");
        return;
      }
      if (value.endsWith("-")) {
        setmsg("Domain Name : End  ' - ' not allowed");
        setalertmsg(true);
        return;
      }
      if (value == "addp.site"){
        setmsg("Domain Name : Domain name addp.site not allowed");
        return;
      }
    }
    setmsg("");
    setalertmsg(false);
    setDomain(value);
  };
  const check_type = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.target.value;
    set_type(value);
    // console.log(value)
  };
  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(true);
    setmsg("Loading...");

    if (!file) {
      setmsg("Please Choose .zip File");
      setalertmsg(true);
      return;
    }

    if (!type) {
      setmsg("Please Choose Project Type");
      setalertmsg(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("container_name", container_name);
    formData.append("port", port);
    formData.append("domain", domain);
    formData.append("type", type);
    formData.append("newfile", new_file ? "set_new_file" : "");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setalertmsg(true);
      setmsg(data.error);
      return;
    }

    setContainername("");
    setPort("");
    setDomain("");
    setFileName("");
    set_type("");
    set_new_file(false);
    setmsg(data.message);
    setalertmsg(false);
    setFile(null);
  };
  return (
    <main className="flex flex-12 h-full justify-center items-center">
      <div className="w-[90%] h-[90%] border rounded-3xl flex flex-col justify-between items-center">
        {/* <div className="h-[10%] w-full flex justify-center items-center text-2xl font-[600]">
          Upload Project
        </div> */}
        <div className="h-[100%] w-full flex">
          <div className="flex flex-1 justify-start items-center flex-col pt-5">
            <form
              action="#"
              method="post"
              id="file_zip_form"
              className="h-[90%] w-[80%] flex flex-col justify-start items-start gap-4"
              onSubmit={upload}
            >
              <label
                htmlFor="file_zip"
                className="border block p-3 rounded-2xl w-full h-[60%] flex flex-col justify-center items-center hover:bg-gray-100 transition cursor-pointer"
              >
                {file ? ( <CircleCheck size={60} className="mb-3 text-green-400 transition duration-300" />) : (<UploadCloud size={60} className="mb-3 text-gray-400 transition duration-300"/>)}
                <span className="text-lg font-medium">
                  {file ? "File Selected" : "Click to upload .zip project"}
                </span>
                <span className="text-sm text-gray-500 mt-1">
                  {file ? `File is ${(file.size / 1024 / 1024).toFixed(3)} MB` : "Please Archive your project (.zip only)"}
                </span>
              </label>
              <input
                type="file"
                name="file_zip"
                id="file_zip"
                accept=".zip"
                hidden
                onChange={check_file}
                required
              />
              <div className="w-full flex gap-3">
                <div className="w-[65%] flex flex-col">
                  <p>Service Name</p>
                  <input
                    type="text"
                    className="py-5 px-5 text-md border h-[55px] w-full rounded-2xl outline-none"
                    placeholder="Enter service name (App Container)"
                    name="container_name"
                    onChange={check_name}
                    value={container_name}
                    required
                  />
                </div>
                <div className="w-[35%] flex flex-col">
                  <p>Port</p>
                  <input
                    type="text"
                    className="py-5 px-5 text-md border h-[55px] w-full rounded-2xl outline-none"
                    placeholder="Enter port app (1 - 65535)"
                    name="port"
                    onChange={check_port}
                    value={port}
                    required
                  />
                </div>
              </div>
              <div className="w-full flex gap-3">
                <div className="w-[65%] flex flex-col">
                  <p>Domain Name</p>
                  <input
                    type="text"
                    className="py-5 px-5 text-md border h-[55px] w-full rounded-2xl outline-none"
                    placeholder="Domain name"
                    name="domain"
                    onChange={check_domain}
                    value={domain}
                    required
                  />
                </div>
                <div className="w-[35%] flex flex-col">
                  <p>Root Domain (.addp.site)</p>
                  <input
                    type="text"
                    className="py-5 px-5 text-md border h-[55px] w-full rounded-2xl outline-none cursor-not-allowed"
                    placeholder=".addp.site"
                    name="root_domain"
                    readOnly
                    value={".addp.site"}
                  />
                </div>
              </div>
              <div className="w-full flex gap-3 justify-start items-center">
                <div className="w-[65%] flex flex-col">
                  <p>File Name</p>
                  <input
                    type="text"
                    className="py-5 px-5 text-md border h-[55px] w-full rounded-2xl outline-none cursor-not-allowed bg-gray-50"
                    placeholder="File Name"
                    name="domain"
                    value={fileName}
                    readOnly
                  />
                </div>
                <div className="w-[35%] flex flex-col">
                  <p>Project Type</p>
                  <select
                    className="px-5 text-md border h-[55px] w-full rounded-2xl outline-none"
                    onChange={check_type}
                    value={type}
                    required
                  >
                    <option disabled value="">
                      Choose project type
                    </option>
                    <option value="html">HTML / CSS / JS</option>
                    <option value="python">Python</option>
                    <option value="next.js">Next.js</option>
                    <option value="node.js">Node.js</option>
                    <option value="laravel">Laravel</option>
                    <option value="php">PHP</option>
                    <option value="custom (other)">Custom (Other)</option>
                  </select>
                  {/* <Select>
                    <SelectTrigger className="px-5 text-md border h-[55px] w-full rounded-2xl">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Project Type</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select> */}
                </div>
              </div>
              <div className="w-full flex gap-3 justify-start items-center mt-2">
                <div className="w-[35%] flex h-full gap-4">
                  <p>Upload New Project</p>
                  <input
                    type="checkbox"
                    name="check"
                    id="check"
                    className="outline-none w-[18px] h-[18px] accent-gray-800 cursor-pointer "
                    checked={new_file}
                    onChange={(e) => {
                      set_new_file(e.target.checked);
                    }}
                  />
                </div>
              </div>
            </form>
            <div className="h-[5%] w-[80%] flex flex-col justify-start items-start gap-3 pt-5">
              <div className="text-md w-full h-[50px] rounded-2xl flex justify-start items-center gap-3 text-gray-500">
                <TriangleAlert
                  className={alert_msg && !isOpen ? "" : "hidden"}
                />{" "}
                {isOpen ? "" : msg}
              </div>
            </div>
            <div className="h-[15%] w-full flex justify-center items-center">
              <button
                type="submit"
                form="file_zip_form"
                className="w-[30%] h-[60px] bg-sky-500 text-white text-md rounded-full flex justify-center items-center gap-2 hover:bg-sky-700 transition cursor-pointer"
                onClick={() => {
                  if (fileName === "") {
                    setmsg("Please Chose File .zip");
                    setalertmsg(true);
                  } else {
                    setmsg("");
                    setalertmsg(false);
                  }
                }}
              >
                <UploadCloud />
                Upload & Deploy
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition duration-200">
          <div className="flex flex-col items-center justify-start w-[35%] h-[60%] bg-white rounded-3xl p-1">
            <div className="w-full h-[85%] flex justify-center items-center">
              {msg == "Loading..." && alert_msg == false && (
                <div className="flex justify-center items-center w-full h-full flex-col gap-15">
                  <i className="bx bx-loader-alt bx-spin text-7xl"></i>
                  <p className="text-lg">{msg}</p>
                </div>
              )}
              {msg != "Loading..." && alert_msg == false && (
                <div className="flex justify-center items-center w-full h-full flex-col gap-15">
                  <Rocket size={80} className="text-sky-500" />
                  <div className="w-[100%] text-md text-center">
                    <p>{msg}</p>
                  </div>
                </div>
              )}
              {msg != "Loading..." && alert_msg == true && (
                <div className="flex justify-center items-center w-full h-full flex-col gap-15">
                  <TriangleAlert
                    size={80}
                    className={alert_msg ? "text-red-500" : "hidden"}
                  />
                  <div className="w-[100%] text-md text-center">
                    <p>{msg}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gray-800 w-[70%] h-[50px] text-white flex justify-center items-center rounded-full overflow-hidden">
              <button
                onClick={() => {
                  setIsOpen(false), setmsg(""), setalertmsg(false);
                }}
                className="w-full h-full cursor-pointer hover:bg-sky-600 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
