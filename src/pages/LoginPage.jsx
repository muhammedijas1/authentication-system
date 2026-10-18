import { useState } from "react";
import { getusers } from "../services/authApi";
import {useNavigate,Link} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function Loginpage(){
    const navigate = useNavigate()

    const { setIsLoggedIn, setUser } = useContext(AuthContext);
    const[password,setpassword]=useState("")
    const[email,setemail]=useState("")
    const[error,seterror]=useState(null)


    const handlebtn = async(e)=>{
        e.preventDefault()

        try{
        const response = await getusers()
        const users = response.data

        const user = users.find((item)=>
            (item.password===password &&
                item.email===email
            )
        )

        if(user){
            seterror("")
            setIsLoggedIn(true);
            setUser(user.username);   

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username",user.username)
            console.log("login")
            console.log(user)

            setpassword("")
            setemail("")

            navigate("/dashboard")
        }
        else{
            seterror("Invalid Email or Password")
            console.log("not login")
        }
      }
      catch(error){
        seterror("something wrong")
        console.log(error)
      }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
            <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
                Login
            </h1>

            <form onSubmit={handlebtn} className="space-y-5">
                <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                </div>

                <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                </div>

                {error && (
                <p className="text-sm text-red-600">{error}</p>
                )}

                <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                Login
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                to="/register"
                className="font-semibold text-blue-600 hover:underline"
                >
                Register
                </Link>
            </p>
            </div>
        </div>


            )
}
export default Loginpage