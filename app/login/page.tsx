"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { PasswordInput } from "@/src/components/ui/PasswordInput";
import { FormField } from "@/src/components/ui/FormField";
import { Alert } from "@/src/components/ui/Alert";
import { Card } from "@/src/components/ui/Card";
import { Footer } from "@/src/components/layout/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function validate() {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Informe o seu e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Insira um endereço de e-mail válido.";
    }

    if (!password) {
      newErrors.password = "Informe a sua senha.";
    } else if (password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
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

    // Simulação de login (preparado para backend real de autenticação)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock de autenticação
      if (email.toLowerCase().includes("erro")) {
        setErrorMessage("Credenciais inválidas. Verifique seu e-mail e senha.");
      } else {
        setSuccessMessage("Autenticação realizada com sucesso! Redirecionando...");
        setTimeout(() => {
          router.push("/");
        }, 1200);
      }
    } catch {
      setErrorMessage("Ocorreu um erro ao processar sua solicitação. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface-page flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Botão Superior Voltar */}
      <div className="mx-auto w-full max-w-[460px]">
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
      <div className="mx-auto w-full max-w-[460px] my-6">
        <Card variant="default" shadow="medium" className="p-6 sm:p-8">
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
              Acessar sua conta
            </h1>

            <p className="mt-1.5 text-sm text-text-secondary">
              Entre com suas credenciais para gerenciar suas publicações e submissões.
            </p>
          </div>

          {/* Alertas de Feedback */}
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
                  <span>{successMessage}</span>
                </div>
              </Alert>
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FormField
              label="E-mail institucional ou cadastrado"
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
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="seu.email@ifma.edu.br"
                autoComplete="email"
                leftIcon={<Mail size={18} />}
                error={Boolean(errors.email)}
                disabled={isLoading}
              />
            </FormField>

            <FormField
              label="Senha de acesso"
              htmlFor="password"
              required
              error={errors.password}
            >
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                placeholder="••••••••"
                autoComplete="current-password"
                error={Boolean(errors.password)}
                disabled={isLoading}
              />
            </FormField>

            {/* Lembrar e Esqueceu Senha */}
            <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-text-secondary hover:text-text-primary">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary-700 focus:ring-primary-500 accent-primary-700"
                />
                <span>Lembrar de mim</span>
              </label>

              <Link
                href="/recuperar-senha"
                className="font-medium text-primary-700 hover:text-primary-900 transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>

            {/* Botão Entrar */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                isLoading={isLoading}
              >
                Entrar no Repositório
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
                Novo no RepoIFMA?
              </span>
            </div>
          </div>

          {/* Link para Cadastro */}
          <div className="text-center">
            <Link
              href="/cadastro"
              className="inline-flex items-center justify-center w-full h-11 rounded-small border border-primary-700 bg-white text-primary-800 text-sm font-semibold hover:bg-primary-50 transition-colors"
            >
              Criar nova conta
            </Link>
          </div>
        </Card>
      </div>

      {/* Rodapé Simples */}
      <Footer/>
    </div>
  );
}

