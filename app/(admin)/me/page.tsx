import Profile from "@/app/components/profile";
import Sidebar from "@/app/components/sidebar";

const me = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Sidebar />
      <Profile />
    </div>
  );
};
export default me;
