import { NextResponse } from "next/server";
import { forgotSchema } from "@/lib/validation/forgot";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = forgotSchema.safeParse(body);
    if (!result.success) {
      const errorMessage = result.error.issues[0].message;
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    const { username } = result.data;
    const flaskRes = await fetch(`${process.env.NEXTAPI_URL}/forgot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const flaskData = await flaskRes.json();
    if (!flaskRes.ok) {
      return NextResponse.json(flaskData, { status: flaskRes.status });
    }
    const response = NextResponse.json(flaskData, { status: flaskRes.status });
    response.cookies.set({
      name: "tokenForgot",
      value: flaskData.token,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 300,
      secure: process.env.NODE_ENV === "production",
    });
    response.cookies.delete("token");
    return response;
  } catch (error) {
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}
