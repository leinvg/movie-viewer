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
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center w-full text-stone-400"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 py-4 pl-8 pr-28 text-base/normal text-stone-50 bg-neutral-800 rounded-full outline-none focus-visible:inset-ring-2 focus-visible:inset-ring-white/80"
        autoComplete="off"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Limpiar búsqueda"
          className="absolute right-17 p-2.5 translate-x-1/2 rounded-full outline-none transition-colors cursor-pointer hover:text-stone-50 focus:text-stone-50 focus-visible:inset-ring-2 focus-visible:inset-ring-white/80"
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
        className="absolute right-7 p-2.5 translate-x-1/2 text-stone-50 rounded-full outline-none transition-colors cursor-pointer focus:text-stone-50 focus-visible:inset-ring-2 focus-visible:inset-ring-white/80"
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
