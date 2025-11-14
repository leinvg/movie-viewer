// src/app/api/media/tv/[id]/credits/route.ts

import { createMediaRouteHandler } from "@/app/api/lib/routeHandler";

export const GET = createMediaRouteHandler("tv", "credits");
