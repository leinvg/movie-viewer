// src/app/api/media/tv/[id]/route.ts

import { NextResponse } from "next/server";
import { getTvDetails } from "@/services/tmdb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid TV ID" }, { status: 400 });
    }

    const tvDetails = await getTvDetails(id);
    return NextResponse.json(tvDetails);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
