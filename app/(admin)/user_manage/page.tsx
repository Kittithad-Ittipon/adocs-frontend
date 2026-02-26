import UserTable from "@/app/components/user_table";
import Sidebar from "@/app/components/sidebar";

const user_manage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Sidebar />
      <UserTable />
    </div>
  );
};
export default user_manage;
