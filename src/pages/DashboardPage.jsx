import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";


function Dashboard(){
    const navigate = useNavigate()
    const { user, setIsLoggedIn, setUser } = useContext(AuthContext);
    
    
    const logoutbtn = ()=>{
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("username")

        setIsLoggedIn(false);
        setUser("")
        navigate("/login")
    }

return (
  <div className="min-h-screen bg-gray-100 px-4 py-10">
    <div className="mx-auto w-full max-w-3xl">

      <div className="mb-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-lg sm:flex-row">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user.toUpperCase()}!
          </h1>

          <p className="mt-2 text-gray-500">
            You are successfully logged in.
          </p>
        </div>

        <button
          onClick={logoutbtn}
          className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
);

}
export default Dashboard