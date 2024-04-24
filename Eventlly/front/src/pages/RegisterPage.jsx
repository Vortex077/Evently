import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage(){
    const [firstname,setFirstname]=useState('');
    const [lastname,setLastname]=useState('');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    const [age,setAge]=useState('');
    async function registerUser(ev){
        ev.preventDefault();
        try{
          await axios.post('/register', {
            firstname,
            lastname,
            username,
            email,
            password,
            phone,
          });
          alert('Registration Successful. Now you can log in');
        }catch(e){
          alert('Registration failed.Please try again later');
        }
    }
    return(
        <div className="flex items-center justify-center h-screen">
        <div className="max-w-lg w-full bg-gradient-to-r from-blue-800 to-violet-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 animate-slideInFromLeft">
          <h2 className="text-center text-4xl font-extrabold text-white animate-appear">Register</h2>
          <p className="text-center text-gray-200 animate-appear">Register your account</p>
          <form className="space-y-6" onSubmit={registerUser}>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  placeholder="First Name"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                  required='true'
                  id="FirstName"
                  name="FirstName"
                  type="text"
                  value={firstname}
                   onChange={ev => setFirstname(ev.target.value)}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                  htmlFor="FirstName"
                >
                  First Name
                </label>
              </div>
              <div className="relative">
                <input
                  placeholder="Last Name"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                  required='true'
                  id="LastName"
                  name="LastName"
                  type="text"
                  value={lastname}
                   onChange={ev => setLastname(ev.target.value)}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                  htmlFor="LastName"
                >
                  Last Name
                </label>
              </div>
              <div className="relative">
                <input
                  placeholder="Username"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                  required='true'
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
                  required='true'
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
              <div className="relative">
                <input
                  placeholder="Email"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                  required='true'
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                   onChange={ev => setEmail(ev.target.value)}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                  htmlFor="email"
                >
                  Email
                </label>
              </div>
              <div className="relative">
                <input
                  placeholder="Phone"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                  required='true'
                  id="phone"
                  name="phone"
                  type="numbers"
                  value={phone}
                   onChange={ev => setPhone(ev.target.value)}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                  htmlFor="phone"
                >
                  Phone No
                </label>
              </div>
              <div className="relative">
                <input
                  placeholder="Age"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                  required=''
                  id="age"
                  name="age"
                  type="number"
                  value={age}
                   onChange={ev => setAge(ev.target.value)}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                  htmlFor="age"
                >
                  Age
                </label>
              </div>
            </div>
            <div>
            <button className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200">
                Sign up
            </button>
            </div>
            </form>
            <div className="text-center text-gray-300">
              <span>Already have an account? </span>
              <Link to={"/login"} className="text-purple-300 hover:underline">
                <span>Login</span>
              </Link>
            </div>
        </div>
      </div>
    );
}