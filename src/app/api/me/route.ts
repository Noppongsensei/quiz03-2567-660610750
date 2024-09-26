import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Noppong Anakhaphruek",
    studentId: "660610750",
  });
};
