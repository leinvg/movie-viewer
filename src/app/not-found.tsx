import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-gray-400 mb-6">
          Lo sentimos — no pudimos encontrar la página que buscas. Puede que la URL
          esté mal escrita o el contenido ya no exista.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold"
          >
            Volver al inicio
          </Link>

          <Link
            href="/search"
            className="px-4 py-2 border border-gray-700 rounded-md text-gray-200 hover:bg-gray-800"
          >
            Buscar contenido
          </Link>
        </div>
      </div>
    </div>
  );
}
