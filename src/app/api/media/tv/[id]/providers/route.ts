// src/app/api/media/tv/[id]/providers/route.ts

import { NextResponse } from "next/server";
import { getTvProviders } from "@/services/tmdb";

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

    const providers = await getTvProviders(id);
    return NextResponse.json(providers);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
