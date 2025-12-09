"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { useState, type FormEvent, useEffect } from "react";
import type { CarType } from "./CarCard";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void; // recarregar lista depois
  carToEdit?: CarType | null;
};

export default function CarFormModal({
  isOpen,
  onOpenChange,
  onSaved,
  carToEdit,
}: Props) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState<number | string>("");
  const [dailyRate, setDailyRate] = useState<number | string>("");
  const [status, setStatus] = useState<"disponivel" | "locado" | "manutencao">(
    "disponivel"
  );
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Preenche campos quando for edição
  useEffect(() => {
    if (carToEdit) {
      setName(carToEdit.name);
      setBrand(carToEdit.brand);
      setYear(carToEdit.year);
      setDailyRate(carToEdit.dailyRate);
      setStatus(carToEdit.status);
      setImageUrl(carToEdit.imageUrl || "");
      setDescription(carToEdit.description || "");
    } else {
      setName("");
      setBrand("");
      setYear("");
      setDailyRate("");
      setStatus("disponivel");
      setImageUrl("");
      setDescription("");
    }
  }, [carToEdit, isOpen]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        name,
        brand,
        year: Number(year),
        dailyRate: Number(dailyRate),
        status,
        imageUrl: imageUrl || undefined,
        description: description || undefined,
      };

      const url = carToEdit ? `/api/cars/${carToEdit._id}` : "/api/cars";
      const method = carToEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erro ao salvar carro");
      } else {
        onSaved();
        onOpenChange(false);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao comunicar com o servidor");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(close) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              {carToEdit ? "Editar carro" : "Cadastrar carro"}
            </ModalHeader>
            <ModalBody className="gap-3">
              <Input
                label="Nome"
                placeholder="Ex: Onix 1.0 LT"
                variant="bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isRequired
              />
              <Input
                label="Marca"
                placeholder="Ex: Chevrolet"
                variant="bordered"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                isRequired
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Ano"
                  type="number"
                  variant="bordered"
                  value={year?.toString()}
                  onChange={(e) => setYear(e.target.value)}
                  isRequired
                />
                <Input
                  label="Diária (R$)"
                  type="number"
                  variant="bordered"
                  value={dailyRate?.toString()}
                  onChange={(e) => setDailyRate(e.target.value)}
                  isRequired
                />
              </div>
              <Select
                label="Status"
                selectedKeys={[status]}
                onChange={(e) =>
                  setStatus(e.target.value as typeof status)
                }
              >
                <SelectItem key="disponivel">Disponível</SelectItem>
                <SelectItem key="locado">Locado</SelectItem>
                <SelectItem key="manutencao">Manutenção</SelectItem>
              </Select>
              <Input
                label="URL da imagem"
                placeholder="https://exemplo.com/carro.jpg"
                variant="bordered"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Input
                label="Descrição"
                placeholder="Opcional"
                variant="bordered"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                onPress={close}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={isLoading}
              >
                {carToEdit ? "Salvar alterações" : "Cadastrar"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
