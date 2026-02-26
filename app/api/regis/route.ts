import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, email, password, create_db } = await req.json();
    const flaskRes = await fetch(`${process.env.NEXTAPI_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username, email, password, create_db,}),
    });
    const flaskData = await flaskRes.json();
    return NextResponse.json(flaskData, {
      status: flaskRes.status
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
