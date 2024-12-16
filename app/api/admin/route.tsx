import prisma from "@/lib/prisma"

export async function GET(){
   const admin = await prisma.user.findMany({
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

   return admin;
}