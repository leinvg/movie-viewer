// src/app/api/media/tv/[id]/providers/route.ts

import { createMediaRouteHandler } from "@/app/api/lib/routeHandler";

export const GET = createMediaRouteHandler("tv", "providers");
