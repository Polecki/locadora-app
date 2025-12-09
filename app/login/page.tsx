"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
} from "@heroui/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);

    if (!res?.error) {
      router.push("/dashboard");
    } else {
      alert("Email ou senha inválidos.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-black px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Entrar na Locadora</h1>
          <p className="text-sm text-zinc-500">
            Acesse o painel para gerenciar sua frota de veículos.
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="email"
              label="E-mail"
              variant="bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
            />
            <Input
              type="password"
              label="Senha"
              variant="bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
            />

            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              className="mt-2"
            >
              Entrar
            </Button>

            <p className="text-sm text-center text-zinc-500 mt-2">
              Ainda não tem conta?{" "}
              <Link
                href="/register"
                className="text-primary font-medium underline-offset-4 hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </main>
  );
}
