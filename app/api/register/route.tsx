import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as cookie from "cookie";


export async function POST(req: Request) {
	try{
		const body = await req.json();

		const {fullName, email, password} = body;

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				fullName,
				email, 
				password: hashedPassword,
			},
		});

		const token = jwt.sign({userId: newUser.id}, process.env.JWT_SECRET!, {expiresIn: "1h"});

		const cookieOptions = {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7,
		};

		const cookieHeader = cookie.serialize("token", token, cookieOptions);
		
		const res = NextResponse.json({newUser}, {status: 201});
		res.headers.set("Set-Cookie", cookieHeader);
		return res;
	}
	catch(error){
		console.error("Error handling request", error);
		return NextResponse.json({error: "Internal Server Error."}, {status: 500});
	}
}