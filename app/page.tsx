import { ArrowUpRight, Key, Rocket, User } from "lucide-react";
import Link from "next/link";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const Index = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <main className="h-[calc(100vh-90px)] w-full flex justify-start items-center flex-col">
        <div className="w-[75%] h-[75%] flex justify-start items-center rounded-4xl shadow-lg mt-7 overflow-hidden shadow-gray-100">
          <div className="w-full h-full flex bg-img bg-cover bg-center">
            <div className="w-[45%] h-full bg-gray-900/50 rounded-3xl">
              <div className="w-full h-full">
                <div className="w-[70%] h-[35%]">
                  <h1 className="text-white text-7xl font-[900] mt-10 ml-10 leading-tight">
                    <span className="text-white">Learn </span> <br />
                    <span className="text-white">Build </span> <br />
                    <span className="text-white">Deploy </span>
                  </h1>
                </div>
                <div className="w-[90%] h-[10%]">
                  <h1 className="text-white text-md font-[400] mt-20 ml-10">
                    Manage containers, launch environments, and deploy websites
                    through a user-friendly platform designed for developers.
                  </h1>
                </div>
                <div className="w-full flex justify-start items-center">
                  <a
                    href="https://docs.addp.site"
                    className="w-full"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="group cursor-pointer mt-5 ml-10 py-3 text-white rounded-full text-4xl font-[700] hover:text-cyan-400 transition-all duration-200 flex justify-center items-center">
                      Get Started{" "}
                      <ArrowUpRight
                        size={35}
                        className="group transition-all duration-200"
                      />
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[75%] h-[12%] bg-gray-100 shadow-gray-100 rounded-4xl p-3 flex justify-between items-center mt-7">
          <div className="flex flex-col border-r-2 border-gray-300 flex-1 pl-6">
            <span className="text-lg font-bold text-gray-900 flex justify-start items-center gap-2 flex-col">
              <i className="bx bxs-window-alt text-2xl"></i>
              <p>Local DNS</p>
            </span>
          </div>
          <div className="flex flex-col border-r-2 border-gray-300 flex-1 pl-6">
            <span className="text-lg font-bold text-gray-900 flex justify-start items-center gap-2 flex-col">
              <i className="bx bxs-user text-2xl"></i>
              <p>Users Management</p>
            </span>
          </div>
          <div className="flex flex-col border-r-2 border-gray-300 flex-1 pl-6">
            <span className="text-lg font-bold text-gray-900 flex justify-start items-center gap-2 flex-col">
              <i className="bx bxs-rocket text-2xl"></i>
              <p>Deployments</p>
            </span>
          </div>
          <div className="flex flex-col flex-1 pl-6">
            <span className="text-lg font-bold text-gray-900 flex justify-start items-center gap-2 flex-col">
              <i className="bx bxl-docker text-3xl"></i>
              <p>Docker Container</p>
            </span>
          </div>
        </div>
      </main>
      <main className="h-[100vh] w-full flex justify-start items-center flex-col">
        <div className="w-full h-[15%] flex justify-center items-center text-3xl font-[700]">
          <h1>Deploy Categories</h1>
        </div>
        <div className="grid grid-cols-3 gap-10 w-[55%] h-[75%] justify-center items-center">
          <a
            className="w-[100%] h-[100%] bg-gray-100 rounded-3xl flex justify-center items-center cursor-pointer transition duration-200 shadow-gray-100 hover:bg-gray-700 hover:text-white"
            rel="noopener noreferrer"
            target="_blank"
            href="https://docs.addp.site/docs/html"
          >
            <span className="text-lg font-bold flex justify-center items-center flex-col gap-4">
              <i className="bx bxl-html5 text-5xl"></i>
              <p className="text-2xl">HTML</p>
            </span>
          </a>
          <a
            className="w-[100%] h-[100%] bg-gray-100 rounded-3xl flex justify-center items-center cursor-pointer transition duration-200 shadow-gray-100 hover:bg-gray-700 hover:text-white"
            rel="noopener noreferrer"
            target="_blank"
            href="https://docs.addp.site/docs/python/flask"
          >
            <span className="text-lg font-bold flex justify-center items-center flex-col gap-4">
              <i className="bx bxl-python text-5xl"></i>
              <p className="text-2xl">Python</p>
            </span>
          </a>
          <a
            className="w-[100%] h-[100%] bg-gray-100 rounded-3xl flex justify-center items-center cursor-pointer transition duration-200 shadow-gray-100 hover:bg-gray-700 hover:text-white"
            rel="noopener noreferrer"
            target="_blank"
            href="https://docs.addp.site/docs/nodejs/express"
          >
            <span className="text-lg font-bold flex justify-center items-center flex-col gap-4">
              <i className="bx bxl-nodejs text-5xl"></i>
              <p className="text-2xl">Node.js</p>
            </span>
          </a>
          <a
            className="w-[100%] h-[100%] bg-gray-100 rounded-3xl flex justify-center items-center cursor-pointer transition duration-200 shadow-gray-100 hover:bg-gray-700 hover:text-white"
            rel="noopener noreferrer"
            target="_blank"
            href="https://docs.addp.site/docs/php/php"
          >
            <span className="text-lg font-bold flex justify-center items-center flex-col gap-4">
              <i className="bx bxl-php text-5xl"></i>
              <p className="text-2xl">PHP</p>
            </span>
          </a>
          <a
            className="w-[100%] h-[100%] bg-gray-100 rounded-3xl flex justify-center items-center cursor-pointer transition duration-200 shadow-gray-100 hover:bg-gray-700 hover:text-white"
            rel="noopener noreferrer"
            target="_blank"
            href="https://docs.addp.site/docs/mysql"
          >
            <span className="text-lg font-bold flex justify-center items-center flex-col gap-4">
              <i className="bx bxs-data text-5xl"></i>
              <p className="text-2xl">Database</p>
            </span>
          </a>
          <a
            className="w-[100%] h-[100%] bg-gray-100 rounded-3xl flex justify-center items-center cursor-pointer transition duration-200 shadow-gray-100 hover:bg-gray-700 hover:text-white"
            rel="noopener noreferrer"
            target="_blank"
            href="https://docs.addp.site/docs/docker-engine/introduction"
          >
            <span className="text-lg font-bold flex justify-center items-center flex-col gap-4">
              <i className="bx bxs-cog text-5xl"></i>
              <p className="text-2xl">Maintenance</p>
            </span>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
