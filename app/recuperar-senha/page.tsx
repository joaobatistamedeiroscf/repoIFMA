"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2, SendHorizonal } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { FormField } from "@/src/components/ui/FormField";
import { Alert } from "@/src/components/ui/Alert";
import { Card } from "@/src/components/ui/Card";
import { Footer } from "@/src/components/layout/Footer";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});

  function validate() {
    const newErrors: { email?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Informe o seu e-mail cadastrado.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Insira um endereço de e-mail válido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) return;

    setIsLoading(true);

    try {
      // Simulação de envio de e-mail (preparado para backend real)
      await new Promise((resolve) => setTimeout(resolve, 900));
      setEmailSent(true);
    } catch {
      setErrorMessage(
        "Não foi possível enviar o e-mail de recuperação. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface-page flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Botão Superior Voltar */}
      <div className="mx-auto w-full max-w-[460px]">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-primary-800 transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1 text-primary-700"
          />
          <span>Voltar para o login</span>
        </Link>
      </div>

      {/* Conteúdo Central */}
      <div className="mx-auto w-full max-w-[460px] my-6">
        <Card variant="default" shadow="medium" className="p-6 sm:p-8">
          {/* Identidade Institucional */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center justify-center">
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
              <span className="text-xs text-text-secondary">Campus Caxias</span>
            </div>

            <h1 className="mt-4 text-2xl font-bold text-text-primary tracking-tight">
              Recuperar senha
            </h1>

            <p className="mt-1.5 text-sm text-text-secondary leading-relaxed max-w-[340px] mx-auto">
              Informe o e-mail cadastrado e enviaremos um link para você criar uma nova senha.
            </p>
          </div>

          {/* Estado: E-mail enviado com sucesso */}
          {emailSent ? (
            <div className="flex flex-col items-center gap-5 py-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-bg border border-success/20">
                <CheckCircle2 size={32} className="text-success" />
              </div>

              <div className="text-center">
                <h2 className="text-base font-semibold text-text-primary">
                  E-mail enviado!
                </h2>
                <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                  Se o endereço{" "}
                  <span className="font-medium text-text-primary">{email}</span>{" "}
                  estiver cadastrado, você receberá em instantes um link para
                  redefinir sua senha.
                </p>
                <p className="mt-2 text-xs text-text-tertiary">
                  Não recebeu? Verifique sua pasta de spam ou tente novamente.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 w-full pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={() => {
                    setEmailSent(false);
                    setEmail("");
                  }}
                >
                  Tentar com outro e-mail
                </Button>

             
              </div>
            </div>
          ) : (
            <>
              {/* Alerta de Erro */}
              {errorMessage && (
                <div className="mb-5">
                  <Alert variant="error" onClose={() => setErrorMessage(null)}>
                    {errorMessage}
                  </Alert>
                </div>
              )}

              {/* Formulário */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <FormField
                  label="E-mail cadastrado"
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
                      if (errors.email)
                        setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="seu.email@ifma.edu.br"
                    autoComplete="email"
                    leftIcon={<Mail size={18} />}
                    error={Boolean(errors.email)}
                    disabled={isLoading}
                  />
                </FormField>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    fullWidth
                    isLoading={isLoading}
                    
                  >
                    Enviar link de recuperação
                  </Button>
                </div>
              </form>

              {/* Divisor */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-text-tertiary">ou</span>
                </div>
              </div>

              {/* Links de navegação */}
              <div className="flex flex-col gap-2 text-center text-sm">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center w-full h-11 rounded-small border border-primary-700 bg-white text-primary-800 font-semibold hover:bg-primary-50 transition-colors"
                >
                  Voltar para o login
                </Link>

                <p className="text-text-secondary pt-1">
                  Não tem uma conta?{" "}
                  <Link
                    href="/cadastro"
                    className="font-semibold text-primary-700 hover:text-primary-900 transition-colors"
                  >
                    Criar conta
                  </Link>
                </p>
              </div>
            </>
          )}
        </Card>
      </div>

     <Footer/>
    </div>
  );
}

