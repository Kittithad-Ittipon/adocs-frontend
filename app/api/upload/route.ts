import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { uploadsSchema } from "@/lib/validation/upload";

export async function POST(request: Request) {
  try {
    const token = (await cookies()).get("token");
    const formData = await request.formData();
    if (!token) {
      return NextResponse.json({ error: "No Token Found" }, { status: 401 });
    }
    const body = {
      file: formData.get("file"),
      serviceName: formData.get("serviceName"),
      port: String(formData.get("port")),
      domain: formData.get("domain"),
      uploadType: formData.get("uploadType"),
    };
    const result = uploadsSchema.safeParse(body);
    if (!result.success) {
      const errorMessage = result.error.issues[0].message;
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    const flaskRes = await fetch(`${process.env.NEXTAPI_URL}/upload`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token.value}`,
      },
      body: formData,
    });
    const flaskData = await flaskRes.json();
    if (!flaskRes.ok) {
      return NextResponse.json(flaskData, { status: flaskRes.status });
    }
    return NextResponse.json(flaskData, { status: flaskRes.status });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
