// src/app/api/media/movie/[id]/route.ts

import { createMediaRouteHandler } from "@/app/api/lib/routeHandler";

export const GET = createMediaRouteHandler("movie", "details");
