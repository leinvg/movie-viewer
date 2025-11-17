// src/components/SearchInput.tsx

"use client";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  placeholder?: string;
}

/** Barra de búsqueda reutilizable controlada por el padre. */
export default function SearchInput({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = "Buscar...",
}: SearchInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full py-4 pl-6 pr-26 text-base placeholder-stone-100/70 bg-neutral-800 rounded-full outline-none inset-ring inset-ring-neutral-700"
        autoComplete="off"
        enterKeyHint="search"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Limpiar búsqueda"
          className="absolute right-14 p-2.5 bg-neutral-800 text-stone-100 rounded-full outline-none transition-all cursor-pointer hover:bg-neutral-700 focus-visible:ring focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-5 fill-none stroke-current stroke-[2px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      <button
        type="submit"
        aria-label="Buscar"
        className="absolute right-2 p-2.5 bg-neutral-200 text-stone-900 rounded-full transition-all cursor-pointer outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-5 fill-none stroke-current stroke-[2px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );
}
