import Link from "next/link";

export default function LoginPage() {
   return (
      <>
         <section className="flex justify-center items-center md:pt-0 pt-[10vh] w-full h-screen">
            <form className="max-w-lg w-full bg-white p-8 m-auto rounded border shadow space-y-4">
               <h1 className="text-3xl font-semibold text-center">Login</h1>
               <div className="">
                  <label htmlFor="email">Email:</label>
                  <input id="email" className="" type="text" placeholder="johndoe@example.com" />
               </div>
               <div>
                  <label htmlFor="password">Password:</label>
                  <input type="password" className="" id="password" placeholder="********" />
               </div>
               <div className="flex md:flex-row flex-col items-center text-xs font-semibold">
                  <div className="flex items-center flex-row-reverse justify-end py-2 md:w-1/2 w-full">
                     <label className="" htmlFor="rememberMe">Remember Me?</label>
                     <input className="me-2" type="checkbox" name="rememberMe" id="rememberMe" />
                  </div>
                  <div className="md:w-1/2 w-full flex justify-end">
                     <p>Dont have an account? <span><Link className="text-blue-500" href={"/register"}>Register here</Link></span></p>
                     
                  </div>
               </div>
               <div className="w-full">
                  <input className="w-full p-2 rounded bg-red-500 hover:bg-red-600 text-white hover:cursor-pointer" type="submit" value="Login" />
               </div>
            </form>
         </section>

      </>
   );
}