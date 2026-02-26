import History from "@/app/components/history";
import Sidebar from "@/app/components/sidebar";

const history_page = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Sidebar />
      <History />
    </div>
  );
};
export default history_page;
