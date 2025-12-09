import { Schema, model, models } from "mongoose";

const CarSchema = new Schema(
  {
    name: { type: String, required: true },       // Ex: "Onix 1.0 LT"
    brand: { type: String, required: true },      // Ex: "Chevrolet"
    year: { type: Number, required: true },       // Ex: 2022
    dailyRate: { type: Number, required: true },  // Ex: 189.90
    status: {
      type: String,
      enum: ["disponivel", "locado", "manutencao"],
      default: "disponivel",
    },
    imageUrl: { type: String },                   // URL da foto do carro
    description: { type: String },
  },
  { timestamps: true }
);

export const Car = models.Car || model("Car", CarSchema);