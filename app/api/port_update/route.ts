import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { port, containerName, type, pub } = await req.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ error: "No Token Found" }, { status: 401 });
    }
    const flaskRes = await fetch(`${process.env.NEXTAPI_URL}/portupdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({ port, containerName, type, pub }),
    });
    // console.log(flaskRes);
    const data = await flaskRes.json();
    // console.log(data);
    if (!flaskRes.ok) {
      return NextResponse.json(
        { error: data.error },
        { status: flaskRes.status }
      );
    }
    return NextResponse.json(data, { status: flaskRes.status });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
