import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logout Success" });

  res.cookies.delete("token");
  res.cookies.delete("role");
  res.cookies.delete("token_forgot");

  return res;
}
