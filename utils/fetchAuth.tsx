import { jwtVerify } from "jose";
import { parse}  from "cookie";

interface JWTPayload{
   id: string;
   role: string;
   [key: string]: any;
}

export async function authenticate(req: Request): Promise<JWTPayload>{
   try{
      const cookies = parse(req.headers.get("cookie") || "");
      const token = cookies.token;

      if(!token){
         throw new Error("Unauthorized.")
      }

      const secret = process.env.JWT_SECRET;
      const {payload} = await jwtVerify(token, new TextEncoder().encode(secret));
   
      return payload as JWTPayload;
   }
   catch(error){
      console.error("Auth error", error);
      throw new Error("Unauthorized.");
   }
}