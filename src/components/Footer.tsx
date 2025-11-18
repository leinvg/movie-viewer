// src/components/Footer.tsx

"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dark:text-stone-100/40">
      <div className="container mx-auto px-8 md:px-12">
        <section className="py-8 md:py-12 flex flex-col text-xs items-center text-center gap-3 **:data-link:hover:text-stone-100 **:data-link:transition-colors">
          <div className="flex items-center flex-wrap justify-center gap-1.5">
            <p>Impulsado por</p>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              data-link
            >
              TMDB
            </a>
            <p>y</p>
            <a
              href="https://www.justwatch.com/"
              target="_blank"
              rel="noopener noreferrer"
              data-link
            >
              JustWatch
            </a>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <p>© {currentYear}</p>
            <p>Leonardo Alain</p>
            <p>•</p>
            <a
              href="https://github.com/leinvg"
              target="_blank"
              rel="noopener noreferrer"
              data-link
            >
              GitHub
            </a>
            <p>•</p>
            <a
              href="https://linkedin.com/in/leonardo-alain-60a942126/"
              target="_blank"
              rel="noopener noreferrer"
              data-link
            >
              LinkedIn
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
}
