import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BuisnessPage(){
    const [ownerfirstname,setFirstname]=useState('');
    const [ownerlastname,setLastname]=useState('');
    const [ownerusername,setUsername]=useState('');
    const [ownerpassword,setPassword]=useState('');
    const [owneremail,setEmail]=useState('');
    const [ownerphone,setPhone]=useState('');
    const [ownerage,setAge]=useState('');
    const [owneraadharno,setAadhar]=useState('');
    async function registerOwner(ev){
        ev.preventDefault();
        try{
          await axios.post('/ownerRegister', {
            ownerfirstname,
            ownerlastname,
            ownerusername,
            owneremail,
            ownerpassword,
            ownerphone,
            owneraadharno,
          });
          alert(' Buisness Registration Successful. Now you can log in');
        }catch(e){
          alert(' Buisness Registration failed.Please try again later');
        }
    }
    return(
        <div className="bg-snow text-right px-12 pt-4">
          <Link to={'/ownerlogin'} className="text-xl font-bold text-white text-right">
              <span>Already a member? </span>
          </Link>
        <div className=" flex items-center justify-center h-screen">
        <div className="max-w-lg w-full bg-gradient-to-r from-pink-500 to-pink-300 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 animate-slideInFromLeft">
          <h2 className="text-center text-4xl font-extrabold text-white animate-appear"> Buisness Registration</h2>
          <p className="text-center text-black animate-appear">Register your Venue</p>
          <form className="space-y-6" onSubmit={registerOwner}>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  placeholder="First Name"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-black bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                  required='true'
                  id="FirstName"
                  name="FirstName"
                  type="text"
                  value={ownerfirstname}
                   onChange={ev => setFirstname(ev.target.value)}
                />
                <label
                  className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
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
                  value={ownerlastname}
                   onChange={ev => setLastname(ev.target.value)}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
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
                  value={ownerusername}
                   onChange={ev => setUsername(ev.target.value)}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
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
                  value={ownerpassword}
                   onChange={ev => setPassword(ev.target.value)}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
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
                  value={owneremail}
                   onChange={ev => setEmail(ev.target.value)}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
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
                  value={ownerphone}
                   onChange={ev => setPhone(ev.target.value)}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
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
                  value={ownerage}
                   onChange={ev => setAge(ev.target.value)}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                  htmlFor="age"
                >
                  Age
                </label>
              </div>
              <div className="relative">
                <input
                  placeholder="aadharno"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                  required='true'
                  id="aadharno"
                  name="aadharno"
                  type="numbers"
                  value={owneraadharno}
                   onChange={ev => setAadhar(ev.target.value)}
                />
                <label
                  className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                  htmlFor="phone"
                >
                  Aadhar No
                </label>
              </div>
            </div>
            <div>
            <button className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200">
                Sign up
            </button>
            </div>
            </form>
            <div className="text-center text-black">
              <span>Already have an account? </span>
              <Link to={"/ownerrlogin"} className="text-black hover:underline">
                <span>Login</span>
              </Link>
            </div>
        </div>
      </div>
      </div>
    );
}