import User_sidebar from "@/app/components/user_sidebar";
import Container_manage from "@/app/components/container_manage";

const dashboard = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <User_sidebar />
      <Container_manage />
    </div>
  );
};
export default dashboard;
