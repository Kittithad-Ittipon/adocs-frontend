import Upload from "@/app/components/upload";
import User_sidebar from "@/app/components/user_sidebar";

const dashboard = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <User_sidebar />
      <Upload />
    </div>
  );
};
export default dashboard;
