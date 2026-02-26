import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { password, newPassword } = await req.json();
    // console.log({ password, newPassword });
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const flaskRes = await fetch(`${process.env.NEXTAPI_URL}/repassword` , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({ password, newPassword }),
    });
    // console.log(flaskRes);
    const data = await flaskRes.json();
    // console.log(data);
    if(!flaskRes.ok){
      return NextResponse.json(data, {status: flaskRes.status});
    }
    return NextResponse.json(data, { status: flaskRes.status });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
