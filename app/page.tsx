"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-100 dark:bg-black">
      <section className="flex flex-col sm:flex-row gap-12 items-center justify-between w-full max-w-5xl px-6 py-20">
        {/* TEXTOS */}
        <div className="flex flex-col gap-6 max-w-md">
          <h1 className="text-4xl font-bold leading-tight text-zinc-900 dark:text-zinc-100">
            Locadora Rápida 🚗
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Alugue o carro ideal para sua viagem com poucos cliques. Painel
            administrativo simples pra gerenciar a frota.
          </p>

          <div className="flex gap-4 pt-2">
            <Button
              as={Link}
              href="/login"
              color="primary"
              radius="full"
              size="lg"
            >
              Entrar
            </Button>

            <Button
              as={Link}
              href="/register"
              variant="bordered"
              color="primary"
              radius="full"
              size="lg"
            >
              Cadastrar
            </Button>
          </div>
        </div>

        {/* CARD COM CARRO */}
        <Card className="w-full max-w-sm shadow-xl">
          <CardHeader className="flex flex-col items-start gap-1">
            <span className="text-sm text-zinc-500">Destaque do dia</span>
            <h2 className="text-xl font-semibold">Sedan Executivo</h2>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div className="w-full rounded-lg overflow-hidden">
              <Image
                src="/car.png"
                alt="Carro"
                width={500}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Conforto, economia e segurança para viagens de trabalho ou lazer.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-green-600">
                R$ 189,00/dia
              </span>
              <Button color="success" radius="full" size="sm">
                Ver detalhes
              </Button>
            </div>
          </CardBody>
        </Card>
      </section>
    </main>
  );
}
