import Sidebar from "@/app/components/sidebar";
import Upload from "@/app/components/upload";

const dashboard = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Sidebar />
      <Upload />
    </div>
  );
};
export default dashboard;
