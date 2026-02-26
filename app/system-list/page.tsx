import Footer from "../components/footer";
import Navbar from "../components/navbar";
import SystemList from "../components/system_list";

const system_list = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <SystemList />
      <Footer />
    </div>
  );
};
export default system_list;
