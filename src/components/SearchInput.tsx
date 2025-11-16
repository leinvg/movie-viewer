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
      className="w-full flex items-center text-stone-400 bg-neutral-900 inset-ring-1 inset-ring-neutral-800 rounded-lg overflow-hidden focus-within:inset-ring-2 focus-within:inset-ring-slate-500 transition-all"
    >
      <div className="py-3.5 px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-5 fill-none stroke-current stroke-[1.5px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 py-3 font-normal text-base/normal text-stone-50 placeholder-stone-400 outline-none bg-transparent"
        autoComplete="off"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Limpiar búsqueda"
          className="p-3 hover:text-stone-50 transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-6 fill-none stroke-current stroke-[1.5px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </form>
  );
}
