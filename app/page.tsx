import { Header } from "@/src/components/Header";
import { SearchBar } from "@/src/components/SearchBar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-page">
      <Header />

      <main>
        {/* Hero */}
        <section className=" bg-gradient-to-b from-primary-50 to-white">
          <div className="mx-auto w-[min(1180px,calc(100%-48px))] px-0 pt-[72px] pb-0">
            <h1 className="max-w-[760px] text-[clamp(2rem,4vw,3.1rem)] font-semibold leading-tight tracking-[-0.02em] text-text-primary">
              Repositório Institucional
            </h1>

            <p className="mt-6 max-w-[650px] text-base text-text-secondary">
              Pesquise e acesse a produção acadêmica do IFMA — Campus Caxias.
            </p>

            <div className="mt-6">
              <SearchBar />
            </div>

            <div className="mt-4">
              <Link
                href="/pesquisar"
                className="text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800"
              >
                Busca avançada →
              </Link>
            </div>
          </div>
        </section>

        {/* Estatísticas */}
        <section  className="mx-auto w-[min(1180px,calc(100%-48px))] pt-6 pb-12">
          <div className="flex items-center gap-6">
            <div className="flex items-baseline gap-2">
              <strong className="text-xl font-semibold text-primary-800">
                328
              </strong>
              <span className="text-sm text-text-secondary">
                trabalhos publicados
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <strong className="text-xl font-semibold text-primary-800">
                12
              </strong>
              <span className="text-sm text-text-secondary">
                cursos
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <strong className="text-xl font-semibold text-primary-800">
                8
              </strong>
              <span className="text-sm text-text-secondary">
                áreas do conhecimento
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}