import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const users = await prisma.user.findMany({});
  return NextResponse.json(users);
}

export async function POST(req: Request, res: Response) {
  const { password, ...restOfUser } = await req.json();
  const user = await prisma.user.create({
    data: restOfUser,
  });
  return NextResponse.json(user);
}
