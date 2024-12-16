"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function LoginPage() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [rememberMe, setRememberMe] = useState(false);
   const router = useRouter();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const formData = {
         email,
         password,
         rememberMe,
      };

      try {
         const res = await fetch("/api/login", {
            method: "POST",
            headers: {
               "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
         });

         if (res.ok) {
            const data = await res.json();

            console.log("Response from server:", data);

            if (data.message === "Login successful") {
               toast.success("Login successful!");
               router.push("/account");
            } else {
               toast.error("Login failed. Please check your credentials.");
            }
         } else {
            toast.error("Login error. Please try again later.");
         }
      } catch (error) {
         toast.error("An unexpected error occurred.");
         console.error("Error:", error);
      }
   };

   return (
      <>
         <section className="flex justify-center items-center md:pt-0 pt-[10vh] w-full h-screen">
            <form
               onSubmit={handleSubmit}
               className="max-w-lg w-full bg-white p-8 m-auto rounded border shadow space-y-4"
            >
               <h1 className="text-3xl font-semibold text-center">Login</h1>
               <div className="space-y-2">
                  <label htmlFor="email" className="block font-semibold">
                     Email:
                  </label>
                  <input
                     id="email"
                     type="email"
                     placeholder="johndoe@example.com"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full p-2 border rounded"
                     required
                  />
               </div>

               <div className="space-y-2">
                  <label htmlFor="password" className="block font-semibold">
                     Password:
                  </label>
                  <input
                     type="password"
                     id="password"
                     placeholder="********"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full p-2 border rounded"
                     required
                  />
               </div>

               <div className="flex md:flex-row flex-col items-center text-xs font-semibold">
                  <div className="flex items-center flex-row-reverse justify-end py-2 md:w-1/2 w-full">
                     <label htmlFor="rememberMe" className="mr-2">
                        Remember Me?
                     </label>
                     <input
                        className="me-2"
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                     />
                  </div>
                  <div className="md:w-1/2 w-full flex justify-end">
                     <p>
                        Don't have an account?{" "}
                        <Link className="text-blue-500" href="/register">
                           Register here
                        </Link>
                     </p>
                  </div>
               </div>

               <div className="w-full">
                  <button
                     type="submit"
                     className="w-full p-2 rounded bg-red-500 hover:bg-red-600 text-white"
                  >
                     Login
                  </button>
               </div>
            </form>
         </section>

         <ToastContainer position="top-right" className={"pt-[10vh!important]"} />
      </>
   );
}
