import jwt from "jsonwebtoken";

import { DB1, readDB } from "@lib/DB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  readDB();

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: "Username or Password is incorrect",
  //   },
  //   { status: 400 }
  // );
  const body = await request.json();
  const { username, password } = body;

  //you should do the validation here
  const user = DB1.users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return NextResponse.json(
      {
        ok: false,
        message: "Username or password is incorrect",
      },
      { status: 400 }
    );
  }

  //if found user, sign a JWT TOKEN
  const secret = process.env.JWT_SECRET || "This is my special secret";

  const token = jwt.sign(
    { username, role: user.role, studentId: user.username },
    secret,
    { expiresIn: "8h" }
  );
  

  return NextResponse.json({ ok: true, token });
};
