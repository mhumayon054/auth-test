import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const conn = await connectDB();
    return NextResponse.json({
      ok: true,
      db: "connected",
      dbName: conn.connection.name,
      host: conn.connection.host,
      readyState: conn.connection.readyState,
      time: new Date().toISOString(),
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        db: "failed",
        message: e?.message ?? String(e),
      },
      { status: 500 }
    );
  }
}