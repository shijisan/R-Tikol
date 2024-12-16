import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { SignJWT } from "jose"; // Import SignJWT from jose
import { encodeText } from "@/utils/textEncoder"; // If you want to encode a secret or other data

export async function POST(req: Request) {
   try {
      const body = await req.json();
      const { email, password, rememberMe } = body;

      // Find user by email
      const user = await prisma.user.findUnique({
         where: { email },
      });

      if (!user) {
         return new NextResponse(
            JSON.stringify({ message: "User not found" }),
            { status: 404 }
         );
      }

      // Validate the password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
         return new NextResponse(
            JSON.stringify({ message: "Invalid password" }),
            { status: 401 }
         );
      }

      // Create the JWT token with jose
      const secret = encodeText(process.env.JWT_SECRET!); // Use encodeText if needed for encoding the secret

      // Use SignJWT to create a signed JWT token
      const token = await new SignJWT({ userId: user.id })
         .setProtectedHeader({ alg: "HS256" }) // Set the signing algorithm
         .setExpirationTime(rememberMe ? "7d" : "1h") // Expiration time based on rememberMe
         .sign(secret); // Sign with the secret

      // Set cookie expiration time based on rememberMe
      const cookieOptions = {
         httpOnly: true,
         maxAge: rememberMe ? 7 * 24 * 60 * 60 : 60 * 60, // 7 days or 1 hour in seconds
         sameSite: "strict" as const, // "strict" value must be cast in TypeScript
         path: "/", // Path for cookie (set for the whole domain)
      };

      // Create a response
      const res = NextResponse.json({ message: "Login successful" });

      // Set the cookie in the response headers
      res.headers.set(
         "Set-Cookie",
         `token=${token}; HttpOnly; Max-Age=${cookieOptions.maxAge}; SameSite=${cookieOptions.sameSite}; Path=${cookieOptions.path}`
      );

      return res;
   } catch (error) {
      console.error("Login error:", error);
      return new NextResponse(
         JSON.stringify({ message: "Internal server error" }),
         { status: 500 }
      );
   }
}
