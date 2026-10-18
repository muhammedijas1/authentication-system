import {useState} from "react"
import { validateEmail,validateFullname,validatePassword,validateUsername } from "../utils/validation"
import { adduser,getusers } from "../services/authApi"
import {Link} from "react-router-dom"
function Registerpage(){
    const[form,setform]=useState({
        username:"",
        email:"",
        password:"",
        fullname:""
    })
    const[error,seterror]=useState({})


    const handlebtn = async(e)=>{
        e.preventDefault()
        
        
        const errors = {
            username : validateUsername(form.username),
            email: validateEmail(form.email),
            password: validatePassword(form.password),
            fullname:validateFullname(form.fullname)
        }
        seterror(errors)
        const isValid = Object.values(errors).every(
        (message) => message === ""
        );


        if (isValid) {
        try{
        const response = await getusers();
        const users = response.data;

        const usernameExists = users.some(
        (user) => user.username === form.username
        );

        const emailExists = users.some(
        (user) => user.email === form.email
        );

        if (usernameExists || emailExists) {
        seterror({
            username: usernameExists ? "Username already exists" : "",
            email: emailExists ? "Email already registered" : ""
        });
        return;
    }
            const result = await adduser(form)
            console.log("registartion success", result.data)

            setform({
            username: "",
            email:"",
            password:"",
            fullname:""
        })
        seterror({})
        }
        catch(error){
            console.log("failed to register",error)
        }
  }
    }

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Create Account
      </h1>

      <form onSubmit={handlebtn} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={form.fullname}
            onChange={(e) =>
              setform({ ...form, fullname: e.target.value })
            }
            placeholder="Enter your full name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          {error.fullname && (
            <p className="mt-1 text-sm text-red-600">{error.fullname}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={form.username}
            onChange={(e) =>
              setform({ ...form, username: e.target.value })
            }
            placeholder="Choose a username"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          {error.username && (
            <p className="mt-1 text-sm text-red-600">{error.username}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setform({ ...form, email: e.target.value })
            }
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          {error.email && (
            <p className="mt-1 text-sm text-red-600">{error.email}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setform({ ...form, password: e.target.value })
            }
            placeholder="Create a password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          {error.password && (
            <p className="mt-1 text-sm text-red-600">{error.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Register
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
);

}
export default Registerpage