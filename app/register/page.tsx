"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
} from "@heroui/react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erro ao cadastrar");
        setIsLoading(false);
        return;
      }

      alert("Cadastro realizado com sucesso!");
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor");
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-black px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Criar conta</h1>
          <p className="text-sm text-zinc-500">
            Cadastre-se para acessar o painel da locadora.
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Nome"
              variant="bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Cadastrar
            </Button>

            <p className="text-sm text-center text-zinc-500 mt-2">
              Já tem conta?{" "}
              <Link
                href="/login"
                className="text-primary font-medium underline-offset-4 hover:underline"
              >
                Entrar
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </main>
  );
}
