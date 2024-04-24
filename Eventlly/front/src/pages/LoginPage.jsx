import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage(){
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);
  const {setUser}=useContext(UserContext);

  async function handleLoginSubmit(ev){
    ev.preventDefault();
    try{
      const {data}= await axios.post('/login',{username,password});
      setUser(data);
      alert("Login Successful");
      setRedirect(true);
    }catch(e){
      alert("Login Failed");
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
  }
    return(
        <div className="flex items-center justify-center grow">
        <div className=" max-w-md w-full bg-gradient-to-r from-blue-800 to-violet-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 animate-slideInFromLeft">
        <h2 className="text-center text-4xl font-extrabold text-white animate-appear">Welcome</h2>
        <p className="text-center text-gray-200 animate-appear">Sign in to your account</p>
        <form className="space-y-6" onSubmit={handleLoginSubmit}>
          <div className="relative">
            <input
              placeholder="Username"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
              required=""
              id="username"
              name="username"
              type="text"
              value={username}
                onChange={ev => setUsername(ev.target.value)}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
              htmlFor="username"
            >
              Username
            </label>
          </div>
          <div className="relative">
            <input
              placeholder="Password"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
              required=""
              id="password"
              name="password"
              type="password"
              value={password}
                onChange={ev => setPassword(ev.target.value)}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-200">
              <input
                className="form-checkbox h-4 w-4 text-purple-600 bg-gray-800 border-gray-300 rounded"
                type="checkbox"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <a className="text-sm text-purple-200 hover:underline" href="#">
              Forgot your password?
            </a>
          </div>
          <button
            className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
            type="submit"
          >
            Sign In
          </button>

          <div className="text-center text-gray-300">
          <span>Don't have an account? </span>
          <Link to={'/register'} className='text-purple-300 hover:underline'>
            <span>Sign Up</span>
          </Link>
        </div>
        </form>
      </div>
      </div>
    );
}