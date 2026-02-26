import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ error: "No Token Found" }, { status: 401 });
    }

    const flaskRes = await fetch(`${process.env.NEXTAPI_URL}/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await flaskRes.json();
    console.log(data);
    if (!flaskRes.ok) {
      return NextResponse.json(
        { error: data.error },
        { status: flaskRes.status }
      );
    }
    return NextResponse.json(data, { status: flaskRes.status });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
