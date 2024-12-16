import { jwtVerify } from "jose";
import { parse}  from "cookie";

export async function authenticate(req: Request){
   try{
      const cookies = parse(req.headers.get("cookie") || "");
      const token = cookies.token;

      if(!token){
         throw new Error("Unauthorized.")
      }

      const secret = process.env.JWT_SECRET;
      const {payload} = await jwtVerify(token, new TextEncoder().encode(secret));
   
      return payload;
   }
   catch(error){
      console.error("Auth error", error);
      throw new Error("Unauthorized.");
   }
}