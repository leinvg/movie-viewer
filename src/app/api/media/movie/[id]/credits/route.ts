// src/app/api/media/movie/[id]/credits/route.ts

import { NextResponse } from "next/server";
import { getMovieCredits } from "@/services/tmdb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
    }

    const credits = await getMovieCredits(id);
    return NextResponse.json(credits);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
