import prisma from "@/lib/prisma"
import { authenticate } from "@/utils/fetchAuth";
import { stringify } from "querystring";

export async function GET() {
   const moderators = await prisma.user.findMany({
      where: { role: "AUTHOR" },
      select: {
         id: true,
         fullName: true,
         email: true,
         role: true,
         createdAt: true,
         updatedAt: true,
      }
   });

   return new Response(JSON.stringify(moderators),{
      status: 200,
      headers: {"Content-type" : "application/json"}
   });
}

export async function POST(req: Request) {
   try {

      const decoded = await authenticate(req);

      if(decoded.role !== "ADMIN"){
         throw new Error("Forbidden");
      }

      const body = await req.json();
      const { id, newRole } = body;

      const roleToAuthor = await prisma.user.update({
         where: { id: id },
         data: { role: newRole },
      });

      if (!id || !newRole){
         return new Response(JSON.stringify({error: "Missing required fields."}));
      }

      return new Response(JSON.stringify(roleToAuthor), {
         status: 200,
         headers: { "Content-type": "application/json" },
      });
   }
   catch (error) {
      console.error("Error:", error);

      return new Response(JSON.stringify({ error: "Failed to update user role." }),
      );
   }
}