"use client";

import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import Image from "next/image";

export type CarType = {
  _id: string;
  name: string;
  brand: string;
  year: number;
  dailyRate: number;
  status: "disponivel" | "locado" | "manutencao";
  imageUrl?: string;
  description?: string;
};

type Props = {
  car: CarType;
  actions?: React.ReactNode; // botões (editar/excluir) no dashboard
};

export default function CarCard({ car, actions }: Props) {
  const statusColor: Record<CarType["status"], "success" | "warning" | "danger"> =
    {
      disponivel: "success",
      locado: "warning",
      manutencao: "danger",
    };

  return (
    <Card className="w-full">
      <CardHeader className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold">
            {car.name}
          </h3>
          <p className="text-xs text-zinc-500">
            {car.brand} • {car.year}
          </p>
        </div>
        <Chip size="sm" color={statusColor[car.status]} variant="flat">
          {car.status}
        </Chip>
      </CardHeader>
      <CardBody className="flex flex-col gap-3">
        <div className="w-full rounded-lg overflow-hidden bg-zinc-200/80 min-h-[140px] flex items-center justify-center">
          {car.imageUrl ? (
            <Image
              src={car.imageUrl}
              alt={car.name}
              width={400}
              height={200}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs text-zinc-500">
              Sem imagem
            </span>
          )}
        </div>
        {car.description && (
          <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3">
            {car.description}
          </p>
        )}
        <div className="flex items-center justify-between gap-2 mt-1">
          <span className="text-sm font-semibold text-green-600">
            R$ {car.dailyRate.toFixed(2)}/dia
          </span>
          {actions}
        </div>
      </CardBody>
    </Card>
  );
}
