import {useState} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

export default function Signup(){
    const [ username , setName] = useState("");
    const [ email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate();

    const onSignUp = async (e)=>{
        try {
            e.preventDefault();
            await axios.post('http://localhost:4000/auth/signup',{
                username,
                password,
                email
            })
            toast.success("Account created successfully")
            navigate('/login')
        } catch (error) {
            console.log("Error occured during signup : ",error)
            toast.error("Try again later")
        }
    }
    return (
        <>
          <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex flex-col w-full md:w-1/2 text-white p-8 items-center justify-center bg-blue-600">
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome to PlatesForAll</h1>
        <p className="text-2xl text-center">
          Join us to help needy people and build a Prosperous Soceity. Register now to get started!
        </p>
        <br />
        <button 
          className="bg-white text-blue-600 px-6 py-3 rounded-md mt-4 md:mt-0" 
          onClick={() => navigate("/Login")}
        >
          Login
        </button>
      </div>

      <div className="bg-white flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <h1 className="font-bold text-3xl mb-4">User Registration</h1>

        <form className="w-full max-w-md" onSubmit={onSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your Name"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
        </>
      );
}