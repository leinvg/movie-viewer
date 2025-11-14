// src/app/api/media/tv/[id]/route.ts

import { createMediaRouteHandler } from "@/app/api/lib/routeHandler";

export const GET = createMediaRouteHandler("tv", "details");
