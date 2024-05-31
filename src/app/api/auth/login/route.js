import { cookies } from "next/headers";
import {NextResponse} from "next/server";
import {getAuthUserId} from "@/utils/server/auth";

export async function POST(req, res){

  const body = await req.json();
  const response = await fetch('http://localhost:5135/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });

  const { accessToken, refreshToken } = await response.json();

  const cookieStore = cookies();

  cookieStore.set({
    name: 'access-token',
    value: accessToken,
    httpOnly: true,
    secure: false,
    maxAge: 3600,
    sameSite: 'strict',
    path: '/',
  });

  cookieStore.set( {
    name: 'refresh-token',
    value: refreshToken,
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'strict',
    path: '/',
  });

  const userId = getAuthUserId();

  return NextResponse.json({ success: true, userId });
}