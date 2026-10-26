import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface AcademicWork {
  id: string;
  title: string;
  authors: string;
  course: string;
  year: number;
}

const RECENT_WORKS: AcademicWork[] = [
  {
    id: "1",
    title: "Práticas de ensino de ciências na educação básica: um estudo no município de Caxias",
    authors: "Ana Clara Ferreira; Marcos Vinícius Santos",
    course: "Licenciatura em Ciências Biológicas",
    year: 2025,
  },
  {
    id: "2",
    title: "Tecnologias assistivas aplicadas à educação profissional e tecnológica",
    authors: "João Pedro Lima; Larissa Almeida",
    course: "Bacharelado em Ciência da Computação",
    year: 2025,
  },
  {
    id: "3",
    title: "Qualidade da água em comunidades rurais da região dos Cocais",
    authors: "Mariana Sousa; Felipe Rocha",
    course: "Licenciatura em Química",
    year: 2024,
  },
  {
    id: "4",
    title: "Desenvolvimento de aplicativo móvel para apoio ao ensino de matemática no ensino médio",
    authors: "Lucas Mendes Silva; Patrícia Costa Andrade",
    course: "Bacharelado em Ciência da Computação",
    year: 2024,
  },
];

export function RecentWorks() {
  return (
    <section className="mx-auto w-[min(1180px,calc(100%-48px))] py-8">
      {/* Cabeçalho da Seção */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h2 className="text-xl sm:text-[22px] font-bold text-text-primary tracking-[-0.01em]">
          Obras mais recentes
        </h2>

        <Link
          href="/pesquisar"
          className="group inline-flex items-center gap-1 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-900"
        >
          <span>Ver todas</span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>

      {/* Lista de Obras */}
      <div className="divide-y divide-border">
        {RECENT_WORKS.map((work) => (
          <Link
            key={work.id}
            href={`/pesquisar?id=${work.id}`}
            className="group flex flex-col md:flex-row md:items-center justify-between gap-3 py-5 px-1 sm:px-2 rounded-small transition-colors hover:bg-surface-subtle"
          >
            {/* Informações Principais */}
            <div className="max-w-[720px]">
              <h3 className="text-base sm:text-[17px] font-semibold text-text-primary group-hover:text-primary-800 transition-colors leading-snug">
                {work.title}
              </h3>
              <p className="mt-1.5 text-sm text-text-secondary">
                {work.authors}
              </p>
            </div>

            {/* Metadados e Ação */}
            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 text-text-secondary">
              <span className="text-xs sm:text-sm font-normal text-text-secondary">
                {work.course} <span className="mx-1 text-text-tertiary">·</span> {work.year}
              </span>

              <ChevronRight
                size={18}
                className="text-text-tertiary transition-transform group-hover:translate-x-1 group-hover:text-primary-700 shrink-0"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

