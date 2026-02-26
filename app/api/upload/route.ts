import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const formData = await req.formData();
    if (!token) {
      return NextResponse.json({ error: "No Token Found" }, { status: 401 });
    }

    const flaskRes = await fetch(`${process.env.NEXTAPI_URL}/upload`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token.value}`,
      },
      body: formData,
    });
    const data = await flaskRes.json();
    if (!flaskRes.ok) {
      return NextResponse.json(data, { status: flaskRes.status });
    }
    return NextResponse.json(data, { status: flaskRes.status });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
