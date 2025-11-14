// src/app/api/media/movie/[id]/route.ts

import { NextResponse } from "next/server";
import { getMovieDetails } from "@/services/tmdb";

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

    const movieDetails = await getMovieDetails(id);
    return NextResponse.json(movieDetails);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
