import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface-default/95 backdrop-blur-[10px]">
      <div className="mx-auto flex min-h-[82px] w-[min(1180px,calc(100%-48px))] items-center gap-9">
        {/* Identidade */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Instituto Federal do Maranhão — Campus Caxias"
              width={1259}
              height={294}
              priority
              className="block h-auto w-[178px]"
            />
          </Link>

          <div className="flex flex-col border-l border-border pl-4">
            <span className="text-[14.4px] font-semibold tracking-[0.04em] text-primary-800">
              REPOIFMA
            </span>

            <span className="text-[10.4px] text-text-secondary">
              Repositório Institucional
            </span>
          </div>
        </div>

        {/* Navegação */}
        <nav
          className="ml-auto flex items-center gap-2"
          aria-label="Navegação principal"
        >
          <Link
            href="/"
            className="px-3 py-2 text-[13.6px] font-medium text-text-secondary transition-colors hover:text-primary-700"
          >
            Início
          </Link>

          <Link
            href="/pesquisar"
            className="px-3 py-2 text-[13.6px] font-medium text-text-secondary transition-colors hover:text-primary-700"
          >
            Pesquisar
          </Link>

          <Link
            href="/sobre"
            className="px-3 py-2 text-[13.6px] font-medium text-text-secondary transition-colors hover:text-primary-700"
          >
            Sobre o RepoIFMA
          </Link>

          <div className="flex items-center gap-1.5">
            <Link
              href="/login"
              className="px-3 py-2 text-[13.6px] font-semibold text-primary-800 transition-colors hover:text-primary-900"
            >
              Entrar
            </Link>

            <Link
              href="/cadastro"
              className="flex min-h-11 items-center rounded-small border border-primary-700 bg-surface-default px-[18px] py-2 text-[13.6px] font-semibold text-primary-800 transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-primary-50"
            >
              Criar conta
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}