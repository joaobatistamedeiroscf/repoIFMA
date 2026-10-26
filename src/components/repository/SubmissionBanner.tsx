import Link from "next/link";
import { UploadCloud, ArrowRight } from "lucide-react";

export function SubmissionBanner() {
  return (
    <section className="mx-auto w-[min(1180px,calc(100%-48px))] my-12">
      <div className="relative overflow-hidden rounded-large bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 p-8 sm:p-12 text-white shadow-medium">
        {/* Elemento de fundo sutil */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-2xl" />

        <div className="relative z-10 max-w-[680px]">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-200 backdrop-blur-sm">
            <UploadCloud size={14} />
            Submissão de Trabalhos
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            É estudante ou orientador do IFMA Campus Caxias?
          </h2>

          <p className="mt-3 text-sm sm:text-base text-primary-100 leading-relaxed">
            Deposite sua monografia, TCC, dissertação ou artigo acadêmico no repositório.
            Garanta a preservação digital e amplie o impacto e visibilidade da sua pesquisa científica.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-small bg-white px-5 py-3 text-sm font-semibold text-primary-900 transition-all hover:bg-primary-50 hover:shadow-small hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Submeter trabalho agora</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/sobre"
              className="inline-flex items-center justify-center rounded-small border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Diretrizes de depósito
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

