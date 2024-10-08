import {  readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  readDB();

  if(request){
  return NextResponse.json(
  {
      ok: false,
     message: `Room is not found`,
     },
     { status: 404 }
   );
};
  }

export const POST = async (request: NextRequest) => {
  readDB();

  if(request){
    return NextResponse.json(
     {
       ok: false,
       message: `Room is not found`,
     },
     { status: 404 }
   ); 
  }

  const messageId = nanoid();

  writeDB();

  return NextResponse.json({
    ok: true,
    messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async () => {
  const payload = checkToken();

  if(!payload){
   return NextResponse.json(
     {
       ok: false,
       message: "Invalid token",
     },
     { status: 401 }
   ); 
  }
   

  readDB();

  if(payload){
    return NextResponse.json(
     {
       ok: false,
       message: "Message is not found",
     },
     { status: 404 }
   );
  }
  
  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
