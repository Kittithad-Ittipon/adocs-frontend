import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const flaskRes = await fetch(`${process.env.NEXTAPI_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await flaskRes.json();
    // console.log(data);
    if (!flaskRes.ok) {
      return NextResponse.json(
        { error: data.error },
        { status: flaskRes.status }
      );
    }

    const res = NextResponse.json({
      message: "Login Success",
      role: data.role,
    });

    const expire = 4 * 60 * 60;
    res.cookies.set("token", data.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: expire,
    });
    
    // res.cookies.set("role", data.role, {
    //   httpOnly: false,
    //   sameSite: "lax",
    //   path: "/",
    //   maxAge: expire,
    // });

    // console.log(NextResponse.json({ res: res, data: data }));
    // console.log(res.cookies);
    return res;
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
