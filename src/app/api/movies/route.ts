// src/app/api/movies/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const token = process.env.TMDB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "TMDB_TOKEN no está configurado en el servidor" },
      { status: 500 }
    );
  }

  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { language: "es-ES" },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: "Error al obtener las películas" },
      { status: 500 }
    );
  }
}
