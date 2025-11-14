// src/app/api/media/tv/[id]/credits/route.ts

import { NextResponse } from "next/server";
import { getTvCredits } from "@/services/tmdb";

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

    const credits = await getTvCredits(id);
    return NextResponse.json(credits);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
