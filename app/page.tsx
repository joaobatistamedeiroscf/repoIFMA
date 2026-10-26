import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { SearchBar } from "@/src/components/SearchBar";
import { RecentWorks } from "@/src/components/repository/RecentWorks";
import { BrowseByCourse } from "@/src/components/repository/BrowseByCourse";
import { SubmissionBanner } from "@/src/components/repository/SubmissionBanner";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-page flex flex-col justify-between">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary-50/70 via-white/50 to-surface-page pb-4">
          <div className="mx-auto w-[min(1180px,calc(100%-48px))] px-0 pt-[56px] sm:pt-[72px]">
            <h1 className="max-w-[760px] text-[clamp(2.2rem,4.5vw,3.2rem)] font-bold leading-tight tracking-[-0.025em] text-text-primary">
              Repositório Institucional
            </h1>

            <p className="mt-4 sm:mt-6 max-w-[650px] text-base sm:text-lg text-text-secondary leading-relaxed">
              Pesquise e acesse a produção acadêmica do IFMA — Campus Caxias.
            </p>

            <div className="mt-6 sm:mt-8">
              <SearchBar />
            </div>

            <div className="mt-4">
              <Link
                href="/pesquisar"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-900"
              >
                <span>Busca avançada</span>
                <span>→</span>
              </Link>
            </div>

            {/* Divisor Figma */}
            <div className="mt-8 border-b border-border/80" />
          </div>
        </section>

        {/* Estatísticas */}
        <section className="mx-auto w-[min(1180px,calc(100%-48px))] pt-6 pb-10">
          <div className="flex flex-wrap items-center gap-6 sm:gap-12">
            <div className="flex items-baseline gap-2">
              <strong className="text-2xl sm:text-[26px] font-bold text-primary-800 tracking-tight">
                328
              </strong>
              <span className="text-sm font-medium text-text-secondary">
                trabalhos publicados
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <strong className="text-2xl sm:text-[26px] font-bold text-primary-800 tracking-tight">
                12
              </strong>
              <span className="text-sm font-medium text-text-secondary">
                cursos
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <strong className="text-2xl sm:text-[26px] font-bold text-primary-800 tracking-tight">
                8
              </strong>
              <span className="text-sm font-medium text-text-secondary">
                áreas do conhecimento
              </span>
            </div>
          </div>
        </section>

        {/* Obras mais recentes */}
        <RecentWorks />

        {/* Coleções e Cursos */}
       

        {/* Banner de Submissão de Trabalhos */}
      
      </main>

      <Footer />
    </div>
  );
}
