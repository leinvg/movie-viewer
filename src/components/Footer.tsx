"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-950 to-gray-900 border-t border-indigo-900/30 text-gray-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <p>© {currentYear} Moviewer</p>
          <div className="flex gap-4 text-xs">
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              Powered by TMDB
            </a>
            <span>•</span>
            <a
              href="https://www.justwatch.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              JustWatch
            </a>
          </div>
        </div>

        <a
          href="https://github.com/leinvg"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-indigo-400 transition-colors"
        >
          <span>@leinvg</span>
          <span>→</span>
        </a>
      </div>
    </footer>
  );
}
