import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { req_db } = await req.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ error: "Session Time Out" }, { status: 401 });
    }

    const flaskRes = await fetch(`${process.env.NEXTAPI_URL}/req_db`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({ req_db }),
    });
    const data = await flaskRes.json();
    if (!flaskRes.ok) {
      return NextResponse.json(data, { status: flaskRes.status });
    }
    return NextResponse.json(data, { status: flaskRes.status });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
