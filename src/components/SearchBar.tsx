"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/pesquisar?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/pesquisar");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row max-w-[850px] items-stretch sm:items-center gap-3 rounded-medium border border-primary-200 bg-white p-2.5 sm:px-[18px] sm:py-[9px] sm:pr-[10px] shadow-medium transition-shadow hover:shadow-lg focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-100"
    >
      <div className="flex flex-1 items-center gap-3 min-w-0 px-2 sm:px-0">
        <Search
          size={22}
          strokeWidth={2}
          className="shrink-0 text-primary-700"
          aria-hidden="true"
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar trabalhos, autores, palavras-chave..."
          aria-label="Pesquisar trabalhos acadêmicos"
          className="min-w-0 flex-1 appearance-none border-0 bg-transparent text-sm sm:text-base text-gray-800 outline-none ring-0 shadow-none placeholder:text-gray-400 focus:border-0 focus:outline-none focus:ring-0 focus:shadow-none focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none"
        />
      </div>

      <button
        type="submit"
        className="h-11 shrink-0 rounded-small bg-primary-700 px-6 sm:px-[18px] text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-800 active:translate-y-0"
      >
        Pesquisar
      </button>
    </form>
  );
}
