import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    TMDB_KEY: process.env.TMDB_KEY ?? "No encontrada ❌",
  });
}
