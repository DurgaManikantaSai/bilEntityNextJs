import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

type UserRequestParams = {
  params: {
    userId: string;
  };
};

export async function GET(req: Request, { params }: UserRequestParams) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { password, ...secureUser } = user;
  return NextResponse.json(secureUser);
}

export async function PUT(req: Request, { params }: UserRequestParams) {
  const { password, id, ...restOfUser } = await req.json();
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 5);
  }

  const data = restOfUser;
  if (hashedPassword) {
    data.password = hashedPassword;
  }

  const user = await prisma.user.update({
    data,
    where: {
      id: params.userId,
    },
  });
  return NextResponse.json(user);
}
