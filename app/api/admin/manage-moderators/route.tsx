import prisma from "@/lib/prisma"

export async function GET(){
   try{
      const moderators = await prisma.user.findMany({
         where:{role :"MODERATOR"},
         select:{
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
         headers: {"Content-type" : "application/json"}
      });
   }
   catch(error){
      console.error(error);
   }
}