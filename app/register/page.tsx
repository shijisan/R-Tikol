"use client";

import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { use, useState } from "react";

export default function LoginPage() {
   
   const [showPassword, setShowPassword] = useState(false);
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const toggleShowPassword = () =>{
      setShowPassword((prev) => (!prev));
   };

   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
   };

   const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value);
   }

   return (
      <>
         <section className="flex justify-center items-center md:pt-0 pt-[10vh] w-full h-screen">
            <form className="max-w-lg w-full bg-white p-8 m-auto rounded border shadow space-y-4">
               <h1 className="text-3xl font-semibold text-center">Register</h1>
               <div>
                  <label htmlFor="fullName">Full Name:</label>
                  <div className="flex flex-row gap-2" id="fullName">

                     <div className="w-1/2">
                        <input className="" type="text" id="firstName" placeholder="First Name" />
                     </div>
                     <div className="w-1/2">
                        <input className="" type="text" id="lastName" placeholder="Last Name" />
                     </div>
                  </div>
               </div>
               <div className="">
                  <label htmlFor="email">Email:</label>
                  <input id="email" className="" type="text" placeholder="johnpork@example.com" />
               </div>
               <div>
                  <label htmlFor="password">Password:</label>
                  <input type="password" className="" id="password" placeholder="********" value={password} onChange={handlePasswordChange} />
               </div>
               <div>
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <div className="relative">
                     <input
                        type={showPassword ? "password" : "text"}
                        className="pe-[2rem!important]"
                        id="confirmPassword"
                        placeholder="********"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                     />
                     <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 size-4 text-inherit"
                        onClick={toggleShowPassword}
                     >
                        {showPassword ? (<EyeSlashIcon />) : (<EyeIcon />)}
                        
                     </button>
                  </div>
               </div>

               <div className="text-xs font-semibold">
                  <div className="w-full">
                     <p className="text-center">Already have an account? <span><Link className="text-blue-500" href={"/login"}>Login here</Link></span></p>
                  </div>
               </div>
               <div className="w-full">
                  <input className="w-full p-2 rounded bg-red-500 hover:bg-red-600 text-white hover:cursor-pointer" type="submit" value="Register" />
               </div>

            </form>
         </section>

      </>
   );
}