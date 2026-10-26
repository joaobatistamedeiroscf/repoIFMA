"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Início", href: "/" },
    { label: "Pesquisar", href: "/pesquisar" },
    { label: "Sobre o RepoIFMA", href: "/sobre" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface-default/95 backdrop-blur-[10px]">
      <div className="mx-auto flex min-h-[82px] w-[min(1180px,calc(100%-48px))] items-center justify-between gap-4 md:gap-9">
        {/* Identidade */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo.png"
              alt="Instituto Federal do Maranhão — Campus Caxias"
              width={1259}
              height={294}
              priority
              className="block h-auto w-[150px] sm:w-[178px]"
            />
          </Link>

          <div className="flex flex-col border-l border-border pl-3 sm:pl-4">
            <span className="text-[13px] sm:text-[14.4px] font-semibold tracking-[0.04em] text-primary-800 leading-tight">
              REPOIFMA
            </span>

            <span className="text-[9.5px] sm:text-[10.4px] text-text-secondary leading-tight">
              Repositório Institucional
            </span>
          </div>
        </div>

        {/* Navegação Desktop */}
        <nav
          className="hidden md:flex ml-auto items-center gap-1 lg:gap-2"
          aria-label="Navegação principal"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-[13.6px] font-medium transition-colors ${
                  isActive
                    ? "text-primary-800 font-semibold"
                    : "text-text-secondary hover:text-primary-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="flex items-center gap-1.5 ml-2">
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

        {/* Botão Menu Mobile */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-text-secondary hover:text-primary-800 rounded-small hover:bg-primary-50 transition-colors"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface-default px-6 py-4 shadow-medium animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-small text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-800 font-semibold"
                      : "text-text-secondary hover:bg-surface-subtle hover:text-primary-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-3 mt-1 border-t border-border flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center h-10 rounded-small text-sm font-semibold text-primary-800 hover:bg-primary-50 transition-colors"
              >
                Entrar
              </Link>

              <Link
                href="/cadastro"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center h-11 rounded-small border border-primary-700 bg-primary-700 text-white text-sm font-semibold hover:bg-primary-800 transition-colors"
              >
                Criar conta
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

