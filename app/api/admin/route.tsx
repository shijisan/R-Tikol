import prisma from "@/lib/prisma"

export async function GET(){
   try{
      const admins = await prisma.user.findMany({
         where:{role :"ADMIN"},
         select:{
            id: true,
            fullName: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
         }
      });
   
      return new Response(JSON.stringify(admins), {
         status: 200,
         headers: {"Content-type" : "application/json"},
      });
   }
   catch(error){
      console.error(error);
   }
}
