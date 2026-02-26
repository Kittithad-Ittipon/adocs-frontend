import User_sidebar from "@/app/components/user_sidebar";
import User_History from "@/app/components/user_history";

const dashboard = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <User_sidebar />
      <User_History />
    </div>
  );
};
export default dashboard;
