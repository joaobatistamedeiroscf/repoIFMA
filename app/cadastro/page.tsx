"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, User, ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { PasswordInput } from "@/src/components/ui/PasswordInput";
import { FormField } from "@/src/components/ui/FormField";
import { Alert } from "@/src/components/ui/Alert";
import { Card } from "@/src/components/ui/Card";
import { Footer } from "@/src/components/layout/Footer";

export default function CadastroPage() {
  const router = useRouter();

  // Estados do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Estados de controle
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Informe o seu nome completo.";
    } else if (name.trim().split(" ").length < 2) {
      newErrors.name = "Informe seu nome e sobrenome.";
    }

    if (!email.trim()) {
      newErrors.email = "Informe o seu e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Insira um endereço de e-mail válido.";
    }

    if (!password) {
      newErrors.password = "Informe uma senha.";
    } else if (password.length < 8) {
      newErrors.password = "A senha deve conter no mínimo 8 caracteres.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirme sua senha.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = "Você deve concordar com os termos de uso para continuar.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulação de cadastro
      await new Promise((resolve) => setTimeout(resolve, 900));

      setSuccessMessage(
        "Cadastro realizado com sucesso! Sua conta foi criada no RepoIFMA."
      );

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      setErrorMessage("Ocorreu um erro ao criar a conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface-page flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Botão Superior Voltar */}
      <div className="mx-auto w-full max-w-[560px]">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-primary-800 transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1 text-primary-700"
          />
          <span>Voltar ao início</span>
        </Link>
      </div>

      {/* Conteúdo Central */}
      <div className="mx-auto w-full max-w-[560px] my-6">
        <Card variant="default" shadow="medium" className="p-6 sm:p-9">
          {/* Identidade Institucional */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center justify-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Instituto Federal do Maranhão — Campus Caxias"
                width={1259}
                height={294}
                priority
                className="h-auto w-[160px] mx-auto"
              />
            </Link>

            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-xs font-semibold tracking-wider text-primary-800 uppercase bg-primary-50 px-2.5 py-0.5 rounded-full border border-primary-100">
                REPOIFMA
              </span>
              <span className="text-xs text-text-secondary">
                Campus Caxias
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-bold text-text-primary tracking-tight">
              Criar conta no RepoIFMA
            </h1>

            <p className="mt-1.5 text-sm text-text-secondary">
              Cadastre-se para submeter e consultar a produção acadêmica do campus.
            </p>
          </div>

          {/* Alertas */}
          {errorMessage && (
            <div className="mb-5">
              <Alert variant="error" onClose={() => setErrorMessage(null)}>
                {errorMessage}
              </Alert>
            </div>
          )}

          {successMessage && (
            <div className="mb-5">
              <Alert variant="success">
                <div className="flex items-center gap-1.5">
                  
                  <span>{successMessage} Redirecionando para o login...</span>
                </div>
              </Alert>
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Nome Completo */}
            <FormField
              label="Nome completo"
              htmlFor="name"
              required
              error={errors.name}
            >
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                placeholder="Ex: Maria Clara dos Santos"
                leftIcon={<User size={18} />}
                error={Boolean(errors.name)}
                disabled={isLoading}
              />
            </FormField>

            {/* E-mail */}
            <FormField
              label="E-mail institucional ou principal"
              htmlFor="email"
              required
              error={errors.email}
            >
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                placeholder="nome.sobrenome@ifma.edu.br"
                leftIcon={<Mail size={18} />}
                error={Boolean(errors.email)}
                disabled={isLoading}
              />
            </FormField>

            {/* Senha */}
            <FormField
              label="Senha"
              htmlFor="password"
              required
              error={errors.password}
            >
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                }}
                placeholder="Mínimo 8 dígitos"
                error={Boolean(errors.password)}
                disabled={isLoading}
              />
            </FormField>

            {/* Confirmação de Senha */}
            <FormField
              label="Confirmar senha"
              htmlFor="confirmPassword"
              required
              error={errors.confirmPassword}
            >
              <PasswordInput
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword)
                    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                placeholder="Repita sua senha"
                error={Boolean(errors.confirmPassword)}
                disabled={isLoading}
              />
            </FormField>

            {/* Termos de uso */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs sm:text-sm text-text-secondary select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (errors.agreeTerms)
                      setErrors((prev) => ({ ...prev, agreeTerms: "" }));
                  }}
                  className="mt-0.5 h-4 w-4 rounded border-border text-primary-700 focus:ring-primary-500 accent-primary-700 shrink-0"
                />
                <span>
                  Li e concordo com os{" "}
                  <Link
                    href="/termos"
                    className="font-medium text-primary-700 hover:underline"
                    target="_blank"
                  >
                    Termos de Uso
                  </Link>{" "}
                  e a{" "}
                  <Link
                    href="/privacidade"
                    className="font-medium text-primary-700 hover:underline"
                    target="_blank"
                  >
                    Política de Privacidade
                  </Link>{" "}
                  do Repositório Institucional.
                </span>
              </label>

              {errors.agreeTerms && (
                <p className="text-xs font-medium text-error mt-1.5 ml-6">
                  {errors.agreeTerms}
                </p>
              )}
            </div>

            {/* Botão de Envio */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                isLoading={isLoading}
                leftIcon={<ShieldCheck size={18} />}
              >
                Criar minha conta
              </Button>
            </div>
          </form>

          {/* Divisor */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-text-tertiary">
                Já possui conta?
              </span>
            </div>
          </div>

          {/* Link para Login */}
          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center w-full h-11 rounded-small border border-primary-700 bg-white text-primary-800 text-sm font-semibold hover:bg-primary-50 transition-colors"
            >
              Fazer login
            </Link>
          </div>
        </Card>
      </div>

      {/* Rodapé Simples */}
      <Footer/>
    </div>
  );
}