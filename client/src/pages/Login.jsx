import {useState} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { UserContext } from "../context/UserContext"
import { useContext } from "react"
import { FaRegUser } from 'react-icons/fa'
export default function Login(){
    const [ email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const {setUser} = useContext(UserContext);

    const navigate = useNavigate();

    const onLogin = async (e)=>{
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:4000/auth/login',{
                password,
                email
            })
            const { token,user } = response.data;
            localStorage.setItem('token',token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            toast.success("Login successful")
            navigate('/')
            setUser(user);
            
        } catch (error) {
            const str = "Password not matched";
            if(error.response.data.message === str){
              toast.error("Password entered is incorrect");
              return;
            }
            console.log(error.response.data.message)
            toast.error("Login failed. Try again later")
            console.log("Error occured during login ", error)
        }
    }
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex flex-col w-full md:w-1/2 text-white p-8 items-center justify-center bg-blue-600">
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome Back!</h1>
        <p className="text-2xl text-center">
          Login to continue and access your dashboard.
        </p>
        <br />
        <button className="bg-white text-blue-600 px-6 py-3 rounded-md mt-4 md:mt-0" onClick={() => navigate("/signup")}>
          Register
        </button>
      </div>

      <div className="bg-white flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <h1 className="font-bold text-3xl mb-4">Login</h1>

        <form className="w-full max-w-md" onSubmit={onLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
      );
}