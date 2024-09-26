import {   DB1, readDB,  writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";



export const GET = async (request:NextRequest) => {

  const roomId = request.nextUrl.searchParams.get("rooms");

  let filtered = DB1.rooms;
  if (roomId !== null) {
    filtered = filtered.filter((std) => std.roomId === roomId);
  }
  return NextResponse.json(
    {
    ok: true,
    rooms:filtered,
  },{status: 200}
  );
}

export const POST = async (request: NextRequest) => {
  const payload = checkToken();
  const room1 = request.nextUrl.searchParams.get("rooms");
  const body = await request.json();
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

  const foundRoom = DB1.rooms.find((x) => x.roomName=== body.roomName);
  
  if(foundRoom){
   return NextResponse.json(
  {
  ok: false,
  message: `Room ${body.roomName} already exists`,
  },
  { status: 400 }
  ); 
  }
  

  const roomId = nanoid();
  const roomName=body.roomName;
  //call writeDB after modifying Database
  writeDB();
  DB1.rooms.push({
    roomId,
    roomName,
  });

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${body.roomName} has been created`,
  });
};
