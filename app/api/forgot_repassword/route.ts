import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { otp, password } = await req.json();
    // console.log({ password, newPassword });
    const cookieStore = await cookies();
    const token_forgot = cookieStore.get("token_forgot");

    if (!token_forgot) {
      return NextResponse.json({ error: "OTP Session Time Out" }, { status: 401 });
    }

    const flaskRes = await fetch(
      `${process.env.NEXTAPI_URL}/forgot_repassword`,  
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token_forgot.value}`,
        },
        body: JSON.stringify({ otp, password }),
      }
    );
    const data = await flaskRes.json();
    if (!flaskRes.ok) {
      return NextResponse.json(data, { status: flaskRes.status });
    }
    const res = NextResponse.json(data, { status: flaskRes.status });
    res.cookies.set("token_forgot", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });
    return res;
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
