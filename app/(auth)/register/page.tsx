import { Rocket } from "lucide-react";
import Link from "next/link";
import RegisterForm from "../../components/registerForm";

const login = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <main className="w-full h-[100vh] flex justify-center items-center bg-linear-to-r from-violet-300 to-fuchsia-300">
        <div className="w-[28%] h-[70%] rounded-3xl shadow-lg flex justify-start items-center bg-white shadow-gray-300 shadow-sm flex-col">
          <div className="flex w-full h-[15%] justify-center items-center text-4xl pt-4 gap-4">
            <Link
              href="/"
              className="flex justify-center items-center text-4xl pt-4 gap-2 hover:text-fuchsia-600 transition duration-200 group"
            >
              <span className="flex justify-center items-center">
                <Rocket size={40} />
              </span>
              <span className="text-gray-800 font-[700] group-hover:text-fuchsia-600 transition duration-200">
                Adocs
              </span>
            </Link>
          </div>
          <RegisterForm />
          <div className="text-sm text-gray-500 h-[10%] flex justify-center items-end gap-2 w-full">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-fuchsia-600 font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
export default login;
