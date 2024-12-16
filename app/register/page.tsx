"use client";

import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function LoginPage() {

   const [showPassword, setShowPassword] = useState(false);
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [fullName, setFullName] = useState("");
   const [email, setEmail] = useState("");
   const router = useRouter();

   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
   }

   const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFirstName(e.target.value);
      setFullName(`${e.target.value} ${lastName}`);
   };

   const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLastName(e.target.value);
      setFullName(`${firstName} ${e.target.value}`);
   }

   const toggleShowPassword = () => {
      setShowPassword((prev) => (!prev));
   };

   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
   };

   const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value);
   }

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (password !== confirmPassword) {
         toast.error("Passwords do not match.")
         return;
      }

      const formData = {
         fullName,
         email,
         password
      };

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
         toast.error("Invalid email format.");
         return;
      }

      try {
         const res = await fetch("/api/register", {
            method: "POST",
            headers: {
               "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
         })

         if (res.ok) {
            toast.success("Registration successful!");
            router.push("/account");
         }
         else {
            toast.error("Registration failed.");
         }
      }
      catch (error) {
         toast.error("Error occurred during registration");
         console.error("Error:", error);
      }

   }

   return (
      <>
         <section className="flex justify-center items-center md:pt-0 pt-[10vh] w-full h-screen">
            <form className="max-w-lg w-full bg-white p-8 m-auto rounded border shadow space-y-4" onSubmit={handleSubmit}>
               <h1 className="text-3xl font-semibold text-center">Register</h1>
               <div>
                  <label htmlFor="fullName">Full Name:</label>
                  <div className="flex flex-row gap-2" id="fullName">

                     <div className="w-1/2">
                        <input className="" type="text" id="firstName" placeholder="First Name" onChange={handleFirstNameChange} value={firstName} required />
                     </div>
                     <div className="w-1/2">
                        <input className="" type="text" id="lastName" placeholder="Last Name" onChange={handleLastNameChange} value={lastName} required />
                     </div>
                  </div>
               </div>
               <div className="">
                  <label htmlFor="email">Email:</label>
                  <input id="email" className="" type="text" placeholder="johnpork@example.com" onChange={handleEmailChange} value={email} required />
               </div>
               <div>
                  <label htmlFor="password">Password:</label>
                  <input type="password" className="" id="password" placeholder="********" value={password} onChange={handlePasswordChange} required />
               </div>
               <div>
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <div className="relative">
                     <input
                        type={showPassword ? "text" : "password"}
                        className="pe-[2rem!important]"
                        id="confirmPassword"
                        placeholder="********"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
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

         <ToastContainer className={"pt-[10vh!important]"} position="top-right" autoClose={5000}/>

      </>
   );
}