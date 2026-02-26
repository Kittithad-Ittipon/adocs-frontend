import { NextResponse } from "next/server";

export async function GET() {
  try {
    const flaskRes = await fetch(`${process.env.NEXTAPI_URL}/active_site`, {
      method: "GET",
      headers: {"Content-Type": "application/json",},
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