"use client";

import { useState } from "react";
import { Button, useDisclosure } from "@heroui/react";
import CarCard, { type CarType } from "./CarCard";
import CarFormModal from "./CarFormModal";

type Props = {
  initialCars: CarType[];
};

export default function CarList({ initialCars }: Props) {
  const [cars, setCars] = useState<CarType[]>(initialCars);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [carToEdit, setCarToEdit] = useState<CarType | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  async function reloadCars() {
    try {
      const res = await fetch("/api/cars");
      const data = await res.json();
      if (res.ok) {
        setCars(data);
      } else {
        alert(data.message || "Erro ao recarregar carros");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar carros");
    }
  }

  function handleNewCar() {
    setCarToEdit(null);
    onOpen();
  }

  function handleEditCar(car: CarType) {
    setCarToEdit(car);
    onOpen();
  }

  async function handleDeleteCar(id: string) {
    if (!confirm("Tem certeza que deseja excluir este carro?")) return;

    setIsDeleting(id);
    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setCars((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert(data.message || "Erro ao excluir carro");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir carro");
    } finally {
      setIsDeleting(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-2">
        <h2 className="text-lg font-semibold">
          Frota cadastrada
        </h2>
        <Button color="primary" onPress={handleNewCar}>
          Novo carro
        </Button>
      </div>

      {cars.length === 0 ? (
        <p className="text-sm text-zinc-500">
          Nenhum carro cadastrado ainda. Clique em{" "}
          <span className="font-semibold">Novo carro</span>{" "}
          para adicionar o primeiro.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard
              key={car._id}
              car={car}
              actions={
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="bordered"
                    onPress={() => handleEditCar(car)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    isLoading={isDeleting === car._id}
                    onPress={() => handleDeleteCar(car._id)}
                  >
                    Excluir
                  </Button>
                </div>
              }
            />
          ))}
        </div>
      )}

      <CarFormModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSaved={reloadCars}
        carToEdit={carToEdit}
      />
    </div>
  );
}
