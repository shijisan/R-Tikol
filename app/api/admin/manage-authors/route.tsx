import prisma from "@/lib/prisma"
import { authenticate } from "@/utils/fetchAuth";

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

   return moderators;
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