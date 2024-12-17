import { authenticate } from "@/utils/fetchAuth";

export async function checkRole(req: Request, roles: string[]){
   try{
      const decoded = await authenticate(req);
      if(!roles.includes(decoded?.role)) throw new Error("Forbidden.");
      return decoded;
   }
   catch{
      throw new Error("Unauthorized.");
   }
}