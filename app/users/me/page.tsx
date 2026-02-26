import User_profile from "@/app/components/user_profile"
import User_sidebar from "@/app/components/user_sidebar"

const User_me = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <User_sidebar />
      <User_profile />
    </div>
  )
}
export default User_me