import Link from "next/link";
import { Laptop, Dna, FlaskConical, Calculator, Network, GraduationCap, ArrowUpRight } from "lucide-react";

interface CourseItem {
  id: string;
  name: string;
  degree: string;
  count: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const COURSES: CourseItem[] = [
  {
    id: "bcc",
    name: "Ciência da Computação",
    degree: "Bacharelado",
    count: 84,
    icon: Laptop,
  },
  {
    id: "bio",
    name: "Ciências Biológicas",
    degree: "Licenciatura",
    count: 72,
    icon: Dna,
  },
  {
    id: "qui",
    name: "Química",
    degree: "Licenciatura",
    count: 58,
    icon: FlaskConical,
  },
  {
    id: "mat",
    name: "Matemática",
    degree: "Licenciatura",
    count: 45,
    icon: Calculator,
  },
  {
    id: "redes",
    name: "Redes de Computadores",
    degree: "Tecnologia",
    count: 39,
    icon: Network,
  },
  {
    id: "pos",
    name: "Pós-Graduação & Especializações",
    degree: "Lato Sensu / Stricto Sensu",
    count: 30,
    icon: GraduationCap,
  },
];

export function BrowseByCourse() {
  return (
    <section className="mx-auto w-[min(1180px,calc(100%-48px))] py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h2 className="text-xl sm:text-[22px] font-bold text-text-primary tracking-[-0.01em]">
            Navegar por Coleções e Cursos
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Consulte a produção acadêmica categorizada pelos cursos do Campus Caxias.
          </p>
        </div>

        <Link
          href="/pesquisar"
          className="group inline-flex items-center gap-1 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-900 shrink-0"
        >
          <span>Ver todas as coleções</span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {COURSES.map((course) => {
          const Icon = course.icon;
          return (
            <Link
              key={course.id}
              href={`/pesquisar?curso=${course.id}`}
              className="group relative flex items-start gap-4 p-5 rounded-large border border-border bg-white transition-all duration-200 hover:border-primary-300 hover:shadow-medium hover:-translate-y-0.5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-medium bg-primary-50 text-primary-800 transition-colors group-hover:bg-primary-700 group-hover:text-white">
                <Icon size={22} />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium text-text-secondary">
                  {course.degree}
                </span>
                <h3 className="mt-0.5 text-base font-semibold text-text-primary group-hover:text-primary-800 transition-colors truncate">
                  {course.name}
                </h3>
                <p className="mt-1 text-xs text-text-secondary font-medium">
                  <span className="text-primary-800 font-semibold">{course.count}</span> trabalhos publicados
                </p>
              </div>

              <ArrowUpRight
                size={18}
                className="text-text-tertiary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-700 shrink-0"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

