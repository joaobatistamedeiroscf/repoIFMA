"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  FileText,
  Calendar,
  GraduationCap,
  Download,
  ExternalLink,
  ChevronRight,
  FilterX,
  BookOpen,
} from "lucide-react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { Button } from "@/src/components/ui/Button";

// Estrutura dos trabalhos acadêmicos
export interface AcademicItem {
  id: string;
  title: string;
  authors: string;
  advisor: string;
  course: string;
  courseId: string;
  type: string;
  typeId: string;
  year: number;
  knowledgeArea: string;
  abstract: string;
  keywords: string[];
}

const ALL_WORKS: AcademicItem[] = [
  {
    id: "1",
    title: "Práticas de ensino de ciências na educação básica: um estudo no município de Caxias",
    authors: "Ana Clara Ferreira; Marcos Vinícius Santos",
    advisor: "Prof. Dr. Carlos Eduardo Medeiros",
    course: "Licenciatura em Ciências Biológicas",
    courseId: "bio",
    type: "Trabalho de Conclusão (TCC)",
    typeId: "tcc",
    year: 2025,
    knowledgeArea: "Ciências Biológicas",
    abstract:
      "Este trabalho investiga as metodologias de ensino de ciências aplicadas nas escolas públicas do município de Caxias-MA, abordando os desafios pedagógicos e proposições para aulas experimentais no ensino fundamental.",
    keywords: ["Ensino de Ciências", "Metodologias Ativas", "Educação Básica"],
  },
  {
    id: "2",
    title: "Tecnologias assistivas aplicadas à educação profissional e tecnológica",
    authors: "João Pedro Lima; Larissa Almeida",
    advisor: "Profa. Dra. Juliana Barbosa",
    course: "Bacharelado em Ciência da Computação",
    courseId: "bcc",
    type: "Trabalho de Conclusão (TCC)",
    typeId: "tcc",
    year: 2025,
    knowledgeArea: "Ciências Exatas e da Terra",
    abstract:
      "Desenvolvimento de ferramentas digitais e recursos de acessibilidade para apoiar o aprendizado de alunos com deficiência visual e auditiva no âmbito da Rede Federal de Educação Profissional.",
    keywords: ["Tecnologia Assistiva", "Acessibilidade Digital", "Educação Profissional"],
  },
  {
    id: "3",
    title: "Qualidade da água em comunidades rurais da região dos Cocais",
    authors: "Mariana Sousa; Felipe Rocha",
    advisor: "Prof. Me. Thiago Vasconcelos",
    course: "Licenciatura em Química",
    courseId: "qui",
    type: "Trabalho de Conclusão (TCC)",
    typeId: "tcc",
    year: 2024,
    knowledgeArea: "Ciências Exatas e da Terra",
    abstract:
      "Análise físico-química e microbiológica de poços artesianos e mananciais hídricos em comunidades da zona rural de Caxias e região dos Cocais, avaliando padrões de potabilidade.",
    keywords: ["Recursos Hídricos", "Química Ambiental", "Região dos Cocais"],
  },
  {
    id: "4",
    title: "Desenvolvimento de aplicativo móvel para apoio ao ensino de matemática no ensino médio",
    authors: "Lucas Mendes Silva; Patrícia Costa Andrade",
    advisor: "Prof. Dr. André Luiz Santos",
    course: "Bacharelado em Ciência da Computação",
    courseId: "bcc",
    type: "Trabalho de Conclusão (TCC)",
    typeId: "tcc",
    year: 2024,
    knowledgeArea: "Ciências Exatas e da Terra",
    abstract:
      "Proposta e implementação de uma aplicação mobile multiplataforma contendo exercícios gamificados e visualização geométrica para estudantes do ensino médio integrado.",
    keywords: ["Aplicativo Móvel", "Educação Matemática", "Gamificação"],
  },
  {
    id: "5",
    title: "Diversidade florística e conservação do Cerrado maranhense",
    authors: "Beatriz Rodrigues; Rafael Guimarães",
    advisor: "Profa. Dra. Renata Silveira",
    course: "Licenciatura em Ciências Biológicas",
    courseId: "bio",
    type: "Artigo Científico",
    typeId: "artigo",
    year: 2024,
    knowledgeArea: "Ciências Biológicas",
    abstract:
      "Levantamento fitossociológico de fragmentos de Cerrado no leste maranhense, com ênfase na identificação de espécies ameaçadas e estratégias de preservação em unidades de conservação.",
    keywords: ["Cerrado Maranhense", "Botânica", "Conservação Ambiental"],
  },
  {
    id: "6",
    title: "Síntese e caracterização de catalisadores heterogêneos para produção de biodiesel",
    authors: "Fernando Ramos; Camila Neves",
    advisor: "Prof. Dr. Roberto Albuquerque",
    course: "Licenciatura em Química",
    courseId: "qui",
    type: "Artigo Científico",
    typeId: "artigo",
    year: 2023,
    knowledgeArea: "Ciências Exatas e da Terra",
    abstract:
      "Investigação de catalisadores sólidos obtidos a partir de rejeitos minerais e argilas locais para reação de transesterificação de óleos vegetais regionais (babaçu).",
    keywords: ["Biodiesel", "Catálise Heterogênea", "Babaçu"],
  },
  {
    id: "7",
    title: "Avaliação de segurança e desempenho em redes definidas por software (SDN)",
    authors: "Gabriel Costa Vieira; Matheus Barros",
    advisor: "Prof. Esp. Ricardo Nogueira",
    course: "Tecnologia em Redes de Computadores",
    courseId: "redes",
    type: "Trabalho de Conclusão (TCC)",
    typeId: "tcc",
    year: 2024,
    knowledgeArea: "Ciências Exatas e da Terra",
    abstract:
      "Implementação de ambiente de testes virtualizado para mitigação de ataques de negação de serviço (DoS/DDoS) utilizando controladores OpenFlow e regras dinâmicas de fluxo.",
    keywords: ["Redes Definidas por Software", "OpenFlow", "Segurança de Redes"],
  },
  {
    id: "8",
    title: "Modelagem matemática da propagação de epidemias sazonais no Maranhão",
    authors: "Daniel Carvalho; Thaís Moraes",
    advisor: "Prof. Me. Samuel Ribeiro",
    course: "Licenciatura em Matemática",
    courseId: "mat",
    type: "Trabalho de Conclusão (TCC)",
    typeId: "tcc",
    year: 2023,
    knowledgeArea: "Ciências Exatas e da Terra",
    abstract:
      "Aplicação de modelos compartimentais (SIR e SEIR) ajustados com dados epidemiológicos do estado do Maranhão para previsão de surtos de arboviroses.",
    keywords: ["Biomatemática", "Modelos SIR", "Epidemiologia"],
  },
  {
    id: "9",
    title: "Gestão e Governança da Informação em Ambientes Acadêmicos da Rede Federal",
    authors: "Cláudia Maria Tavares; Vinícius Lima",
    advisor: "Profa. Dra. Helena Siqueira",
    course: "Pós-Graduação & Especializações",
    courseId: "pos",
    type: "Dissertação de Mestrado",
    typeId: "dissertacao",
    year: 2025,
    knowledgeArea: "Ciências Humanas e Sociais",
    abstract:
      "Estudo de caso sobre implantação de repositórios digitais abertos e políticas de preservação documental nos campi do Instituto Federal do Maranhão.",
    keywords: ["Governança da Informação", "Repositórios Institucionais", "DSpace"],
  },
];

const FILTER_COURSES = [
  { id: "all", label: "Todos os Cursos" },
  { id: "bcc", label: "Ciência da Computação" },
  { id: "bio", label: "Ciências Biológicas" },
  { id: "qui", label: "Química" },
  { id: "mat", label: "Matemática" },
  { id: "redes", label: "Redes de Computadores" },
  { id: "pos", label: "Pós-Graduação" },
];

const FILTER_TYPES = [
  { id: "all", label: "Todos os Tipos" },
  { id: "tcc", label: "Trabalhos de Conclusão (TCC)" },
  { id: "artigo", label: "Artigos Científicos" },
  { id: "dissertacao", label: "Dissertações de Mestrado" },
  { id: "projeto", label: "Projetos de Extensão" },
];

const FILTER_YEARS = [
  { id: "all", label: "Todos os Anos" },
  { id: "2025", label: "2025" },
  { id: "2024", label: "2024" },
  { id: "2023", label: "2023" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("q") || "";
  const initialCourse = searchParams.get("curso") || "all";
  const initialType = searchParams.get("tipo") || "all";
  const initialId = searchParams.get("id") || "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedYear, setSelectedYear] = useState("all");
  const [sortBy, setSortBy] = useState<"recent" | "oldest" | "title">("recent");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Manipular submit da barra de pesquisa
  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("q", searchTerm.trim());
    if (selectedCourse !== "all") params.set("curso", selectedCourse);
    if (selectedType !== "all") params.set("tipo", selectedType);
    router.replace(`/pesquisar?${params.toString()}`);
  }

  function handleResetFilters() {
    setSearchTerm("");
    setSelectedCourse("all");
    setSelectedType("all");
    setSelectedYear("all");
    router.replace("/pesquisar");
  }

  // Filtragem dos trabalhos
  const filteredWorks = useMemo(() => {
    return ALL_WORKS.filter((work) => {
      // Se veio id específico via URL
      if (initialId && work.id !== initialId) {
        return false;
      }

      // Termo de busca (título, autores, orientador, resumo ou palavras-chave)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = work.title.toLowerCase().includes(query);
        const matchesAuthors = work.authors.toLowerCase().includes(query);
        const matchesAdvisor = work.advisor.toLowerCase().includes(query);
        const matchesAbstract = work.abstract.toLowerCase().includes(query);
        const matchesKeywords = work.keywords.some((k) =>
          k.toLowerCase().includes(query)
        );
        if (
          !matchesTitle &&
          !matchesAuthors &&
          !matchesAdvisor &&
          !matchesAbstract &&
          !matchesKeywords
        ) {
          return false;
        }
      }

      // Filtro de Curso
      if (selectedCourse !== "all" && work.courseId !== selectedCourse) {
        return false;
      }

      // Filtro de Tipo
      if (selectedType !== "all" && work.typeId !== selectedType) {
        return false;
      }

      // Filtro de Ano
      if (selectedYear !== "all" && work.year.toString() !== selectedYear) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "recent") return b.year - a.year;
      if (sortBy === "oldest") return a.year - b.year;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  }, [searchTerm, selectedCourse, selectedType, selectedYear, sortBy, initialId]);

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedCourse !== "all" ||
    selectedType !== "all" ||
    selectedYear !== "all" ||
    Boolean(initialId);

  return (
    <div className="min-h-screen bg-surface-page flex flex-col justify-between">
      <Header />

      <main className="flex-1 pb-16">
        {/* Topo / Hero da Pesquisa */}
        <section className="border-b border-border bg-gradient-to-b from-primary-50/60 to-surface-page pt-8 pb-10">
          <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-text-secondary mb-4">
              <Link href="/" className="hover:text-primary-700 transition-colors">
                Início
              </Link>
              <ChevronRight size={13} className="text-text-tertiary" />
              <span className="text-primary-900 font-medium">Pesquisar Acervo</span>
            </nav>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Pesquisar no Repositório
            </h1>
            <p className="mt-1.5 text-sm text-text-secondary max-w-[620px]">
              Explore monografias, dissertações, artigos e produções científicas desenvolvidas no IFMA Campus Caxias.
            </p>

            {/* Barra de Pesquisa */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-medium border border-primary-200 bg-white p-2 sm:px-4 sm:py-2 shadow-medium focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-100"
            >
              <div className="flex flex-1 items-center gap-3 px-2 sm:px-0 min-w-0">
                <Search size={20} className="shrink-0 text-primary-700" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquise por título, autor, assunto, palavra-chave..."
                  className="w-full text-sm sm:text-base text-gray-800 outline-none placeholder:text-gray-400 bg-transparent"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                    aria-label="Limpar termo de busca"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="h-10 sm:h-11 rounded-small bg-primary-700 px-6 text-sm font-semibold text-white transition-all hover:bg-primary-800 hover:-translate-y-0.5 active:translate-y-0 shrink-0"
              >
                Buscar
              </button>
            </form>
          </div>
        </section>

        {/* Corpo: Filtros + Resultados */}
        <section className="mx-auto w-[min(1180px,calc(100%-48px))] pt-8">
          {/* Botão Mobile para exibir Filtros */}
          <div className="lg:hidden mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="inline-flex items-center gap-2 rounded-small border border-border bg-white px-4 py-2.5 text-sm font-medium text-text-primary shadow-small hover:bg-surface-subtle"
            >
              <SlidersHorizontal size={16} className="text-primary-700" />
              <span>{showMobileFilters ? "Ocultar Filtros" : "Filtrar Resultados"}</span>
              {hasActiveFilters && (
                <span className="h-2 w-2 rounded-full bg-primary-700" />
              )}
            </button>

            <span className="text-xs text-text-secondary">
              {filteredWorks.length} {filteredWorks.length === 1 ? "resultado" : "resultados"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Sidebar de Filtros (Desktop + Mobile colapsável) */}
            <aside
              className={`lg:block ${
                showMobileFilters ? "block" : "hidden"
              } bg-white p-5 rounded-large border border-border shadow-small lg:sticky lg:top-24`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-primary-700" />
                  <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                    Filtros
                  </h2>
                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-primary-700 hover:text-primary-900 transition-colors"
                  >
                    Limpar todos
                  </button>
                )}
              </div>

              {/* Filtro por Tipo */}
              <div className="py-4 border-b border-border">
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2.5">
                  Tipo de Documento
                </h3>
                <div className="flex flex-col gap-1.5">
                  {FILTER_TYPES.map((t) => (
                    <label
                      key={t.id}
                      className="flex items-center gap-2 text-sm text-text-primary cursor-pointer hover:text-primary-800 transition-colors py-0.5"
                    >
                      <input
                        type="radio"
                        name="filter-type"
                        checked={selectedType === t.id}
                        onChange={() => setSelectedType(t.id)}
                        className="text-primary-700 focus:ring-primary-500 accent-primary-700 h-4 w-4"
                      />
                      <span className={selectedType === t.id ? "font-semibold text-primary-900" : ""}>
                        {t.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro por Curso */}
              <div className="py-4 border-b border-border">
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2.5">
                  Cursos / Coleções
                </h3>
                <div className="flex flex-col gap-1.5">
                  {FILTER_COURSES.map((c) => (
                    <label
                      key={c.id}
                      className="flex items-center gap-2 text-sm text-text-primary cursor-pointer hover:text-primary-800 transition-colors py-0.5"
                    >
                      <input
                        type="radio"
                        name="filter-course"
                        checked={selectedCourse === c.id}
                        onChange={() => setSelectedCourse(c.id)}
                        className="text-primary-700 focus:ring-primary-500 accent-primary-700 h-4 w-4"
                      />
                      <span className={selectedCourse === c.id ? "font-semibold text-primary-900" : ""}>
                        {c.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro por Ano */}
              <div className="pt-4">
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2.5">
                  Ano de Publicação
                </h3>
                <div className="flex flex-col gap-1.5">
                  {FILTER_YEARS.map((y) => (
                    <label
                      key={y.id}
                      className="flex items-center gap-2 text-sm text-text-primary cursor-pointer hover:text-primary-800 transition-colors py-0.5"
                    >
                      <input
                        type="radio"
                        name="filter-year"
                        checked={selectedYear === y.id}
                        onChange={() => setSelectedYear(y.id)}
                        className="text-primary-700 focus:ring-primary-500 accent-primary-700 h-4 w-4"
                      />
                      <span className={selectedYear === y.id ? "font-semibold text-primary-900" : ""}>
                        {y.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Listagem de Resultados */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              {/* Barra superior de controle de resultados */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-text-primary">
                    {filteredWorks.length}{" "}
                    {filteredWorks.length === 1 ? "trabalho encontrado" : "trabalhos encontrados"}
                  </span>

                  {initialId && (
                    <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full font-medium">
                      Obra #{initialId}
                      <button
                        type="button"
                        onClick={() => router.replace("/pesquisar")}
                        className="hover:text-primary-950"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                </div>

                {/* Ordenação */}
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="text-text-secondary whitespace-nowrap">Ordenar por:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="h-9 rounded-small border border-border bg-white px-2.5 text-xs sm:text-sm text-text-primary focus:border-primary-700 focus:ring-1 focus:ring-primary-100 outline-none"
                  >
                    <option value="recent">Mais recentes (ano decrescente)</option>
                    <option value="oldest">Mais antigos (ano crescente)</option>
                    <option value="title">Título (A-Z)</option>
                  </select>
                </div>
              </div>

              {/* Tags de Filtros Ativos */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs text-text-secondary">Filtros aplicados:</span>

                  {searchTerm.trim() && (
                    <span className="inline-flex items-center gap-1 bg-surface-subtle border border-border text-text-primary text-xs px-2.5 py-1 rounded-full">
                      Termo: &ldquo;{searchTerm}&rdquo;
                      <button
                        type="button"
                        onClick={() => setSearchTerm("")}
                        className="text-text-tertiary hover:text-text-primary"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  {selectedCourse !== "all" && (
                    <span className="inline-flex items-center gap-1 bg-surface-subtle border border-border text-text-primary text-xs px-2.5 py-1 rounded-full">
                      Curso: {FILTER_COURSES.find((c) => c.id === selectedCourse)?.label}
                      <button
                        type="button"
                        onClick={() => setSelectedCourse("all")}
                        className="text-text-tertiary hover:text-text-primary"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  {selectedType !== "all" && (
                    <span className="inline-flex items-center gap-1 bg-surface-subtle border border-border text-text-primary text-xs px-2.5 py-1 rounded-full">
                      Tipo: {FILTER_TYPES.find((t) => t.id === selectedType)?.label}
                      <button
                        type="button"
                        onClick={() => setSelectedType("all")}
                        className="text-text-tertiary hover:text-text-primary"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  {selectedYear !== "all" && (
                    <span className="inline-flex items-center gap-1 bg-surface-subtle border border-border text-text-primary text-xs px-2.5 py-1 rounded-full">
                      Ano: {selectedYear}
                      <button
                        type="button"
                        onClick={() => setSelectedYear("all")}
                        className="text-text-tertiary hover:text-text-primary"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-primary-700 hover:text-primary-900 ml-1"
                  >
                    Limpar filtros
                  </button>
                </div>
              )}

              {/* Lista de Cards de Obras */}
              {filteredWorks.length > 0 ? (
                <div className="flex flex-col gap-4 mt-2">
                  {filteredWorks.map((work) => (
                    <article
                      key={work.id}
                      className="group p-5 sm:p-6 rounded-large border border-border bg-white shadow-small hover:border-primary-300 hover:shadow-medium transition-all duration-200"
                    >
                      {/* Topo do card: Tipo e Ano */}
                      <div className="flex items-center justify-between gap-3 text-xs text-text-secondary mb-2.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium bg-primary-50 text-primary-800 border border-primary-100">
                          <FileText size={12} />
                          {work.type}
                        </span>

                        <div className="flex items-center gap-1.5 font-medium">
                          <Calendar size={13} className="text-text-tertiary" />
                          <span>{work.year}</span>
                        </div>
                      </div>

                      {/* Título */}
                      <h3 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-primary-800 transition-colors leading-snug">
                        {work.title}
                      </h3>

                      {/* Autores & Orientador */}
                      <div className="mt-2 text-xs sm:text-sm text-text-secondary flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <p>
                          <span className="font-semibold text-text-primary">Autoria: </span>
                          {work.authors}
                        </p>
                        <span className="hidden sm:inline text-text-tertiary">·</span>
                        <p className="text-text-tertiary">
                          <span className="font-medium text-text-secondary">Orientação: </span>
                          {work.advisor}
                        </p>
                      </div>

                      {/* Curso */}
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-text-secondary">
                        <GraduationCap size={14} className="text-primary-700 shrink-0" />
                        <span>{work.course}</span>
                      </div>

                      {/* Resumo */}
                      <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3">
                        {work.abstract}
                      </p>

                      {/* Palavras-chave */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {work.keywords.map((kw) => (
                          <span
                            key={kw}
                            onClick={() => setSearchTerm(kw)}
                            className="inline-block px-2 py-0.5 text-xs rounded bg-surface-subtle text-text-secondary border border-border/60 hover:bg-primary-50 hover:text-primary-800 hover:border-primary-200 cursor-pointer transition-colors"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>

                      {/* Rodapé do Card: Ações */}
                      <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs text-text-tertiary">
                          Área: <strong className="text-text-secondary">{work.knowledgeArea}</strong>
                        </span>

                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            leftIcon={<Download size={14} />}
                            onClick={() => alert(`Iniciando download do documento #${work.id}`)}
                          >
                            PDF
                          </Button>

                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            rightIcon={<ExternalLink size={13} />}
                            onClick={() =>
                              alert(
                                `Trabalho: "${work.title}"\nAutores: ${work.authors}\nOrientador: ${work.advisor}\nAno: ${work.year}\nCurso: ${work.course}`
                              )
                            }
                          >
                            Detalhes
                          </Button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                /* Estado Vazio */
                <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-large border border-border shadow-small">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-700 mb-4">
                    <FilterX size={30} />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">
                    Nenhum trabalho acadêmico encontrado
                  </h3>
                  <p className="mt-1.5 text-sm text-text-secondary max-w-[420px] leading-relaxed">
                    Não encontramos resultados que correspondam aos filtros ou termo de busca
                    utilizados. Experimente usar termos mais amplos ou redefinir seus filtros.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    className="mt-6"
                    onClick={handleResetFilters}
                  >
                    Limpar todos os filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function PesquisarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface-page flex flex-col justify-between">
          <Header />
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-700" />
              <p className="text-sm font-medium text-text-secondary">
                Carregando acervo do RepoIFMA...
              </p>
            </div>
          </div>
          <Footer />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}

