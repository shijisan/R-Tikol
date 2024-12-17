import prisma from "@/lib/prisma";
import { authenticate } from "@/utils/fetchAuth";

export async function GET() {
   try {
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

      return new Response(JSON.stringify(moderators), {
         status: 200,
         headers: { "Content-type": "application/json" },
      });
   } catch (error) {
      console.error("Error fetching moderators:", error);
      return new Response(
         JSON.stringify({ error: "Failed to fetch moderators." }),
         {
            status: 500,
            headers: { "Content-type": "application/json" },
         }
      );
   }
}

export async function POST(req: Request) {
   try {
      const decoded = await authenticate(req);

      if (decoded.role !== "ADMIN") {
         return new Response(
            JSON.stringify({ error: "Forbidden: You don't have permission to perform this action." }),
            {
               status: 403,
               headers: { "Content-type": "application/json" },
            }
         );
      }

      const body = await req.json();
      const { id, newRole } = body;

      if (!id || !newRole) {
         return new Response(
            JSON.stringify({ error: "Missing required fields." }),
            {
               status: 400, 
               headers: { "Content-type": "application/json" },
            }
         );
      }

      const roleToAuthor = await prisma.user.update({
         where: { id: id },
         data: { role: newRole },
      });

      return new Response(JSON.stringify(roleToAuthor), {
         status: 200,
         headers: { "Content-type": "application/json" },
      });

   } catch (error) {
      console.error("Error updating user role:", error);
      return new Response(
         JSON.stringify({ error: "Failed to update user role." }),
         {
            status: 500,
            headers: { "Content-type": "application/json" },
         }
      );
   }
}
