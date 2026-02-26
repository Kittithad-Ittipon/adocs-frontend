import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const task_id = await req.json();
        const cookieStore = await cookies();
        const token = cookieStore.get("token");
        const id = task_id.task_id;

        if (!token) {
            return NextResponse.json({ error: "Session Time Out" }, { status: 401 });
        }

        const flaskRes = await fetch(`${process.env.NEXTAPI_URL}/task_status/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token.value}`,
                "Content-Type": "application/json",
            },
        });

        const data = await flaskRes.json();
        
        return NextResponse.json(data, { status: flaskRes.status });

    } catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}