"use client";

import { FormEvent } from "react";
import { Search } from "lucide-react";

export function SearchBar() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Pesquisa realizada");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-[850px] items-center gap-3 rounded-medium border border-primary-200 bg-white px-[18px] py-[9px] pr-[10px] shadow-medium"
    >
      <Search
        size={22}
        strokeWidth={2}
        className="shrink-0 text-primary-700"
        aria-hidden="true"
      />

     <input
        type="text"
        placeholder="Pesquisar trabalhos, autores, palavras-chave..."
        aria-label="Pesquisar trabalhos"
        className="min-w-0 flex-1 appearance-none border-0 bg-transparent text-gray-800 outline-none ring-0 shadow-none placeholder:text-gray-400 focus:border-0 focus:outline-none focus:ring-0 focus:shadow-none focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none"
        />
  <button
  type="submit"
  className="h-11 rounded-small bg-primary-700 px-[18px] text-sm font-semibold text-white transition-colors hover:-translate-y-0.5 hover:bg-primary-800"
>
  Pesquisar
</button>
    </form>
  );
}