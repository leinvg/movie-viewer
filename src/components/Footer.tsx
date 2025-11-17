"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white/50 text-sm">
      <div className="container max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <div className="flex gap-1 text-xs">
            <p>© {currentYear}</p>
            <span>Powered by</span>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              TMDB
            </a>
            <span>•</span>
            <a
              href="https://www.justwatch.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              JustWatch
            </a>
          </div>
        </div>

        <a
          href="https://github.com/leinvg"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-white transition-colors text-sm"
        >
          <span>Github @leinvg</span>
          <span>→</span>
        </a>
      </div>
    </footer>
  );
}
