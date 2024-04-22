import * as fs from 'fs';
import chalk from 'chalk';
import mongoose, { Document, Schema, connect } from 'mongoose';

connect('mongodb://127.0.0.1:27017/notes-app').then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});

/**
 * Enumeración que define los posibles tipos de carta.
 */
export enum Tipo {
  Tierra = "Tierra",
  Criatura = "Criatura",
  Encantamiento = "Encantamiento",
  Conjuro = "Conjuro",
  Instantaneo = "Instantaneo",
  Artefacto = "Artefacto",
  Planeswalker = "Planeswalker"
}

/**
 * Enumeración que define los posibles colores de una carta.
 */
export enum Color {
  Blanco = "Blanco",
  Azul = "Azul",
  Negro = "Negro",
  Rojo = "Rojo",
  Verde = "Verde",
  Incoloro = "Incoloro",
  Multicolor = "Multicolor"
}

/**
 * Enumeración que define las posibles rarezas de una carta.
 */
export enum Rareza {
  Comun = "Común",
  Infrecuente = "Infrecuente",
  Rara = "Rara",
  Mitica = "Mítica"
}

/**
 * Interfaz que define la estructura de una carta.
 */
export interface Carta extends Document {
  id: number;
  nombre: string;
  mana: number;
  color: Color;
  tipo: Tipo;
  rareza: Rareza;
  reglas: string;
  fuerza?: number;
  resistencia?: number;
  lealtad?: number;
  valor_mercado: number;
}


export const SchemaCartas = new Schema <Carta>({
  id: {
    type: Number,
    required: true,
  },
  nombre:{
    type: String,
    required: true,
  },
  mana:{
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
    enum: ['blanco', 'azul', 'negro', 'rojo', 'verde', 'incoloro', 'multicolor'],
  },
  tipo: {
    type: String,
    required: true,
    enum:['tierra', 'criatura', 'encantamiento', 'conjuro', 'instantaneo', 'artefacto', 'planeswalker'],
  },
  rareza:{
    type: String,
    required: true,
    enum:['comun', 'infrecuente', 'rara', 'mitica'],
  },
  reglas:{
    type: String,
    required: true,
  },
  fuerza:{
    type: Number,
    required: false,
  },
  resistencia: {
    type: Number,
    required: false,
  },
  lealtad: {
    type: Number,
    required: false,
  },
  valor_mercado:{
    type: Number,
    required: true,
  }
})

const Card = mongoose.model<Carta>('Card', SchemaCartas);

export default Card;

const carta = new Card({
  id: 2,
  nombre: "Lightning Bolt",
  mana: 1,
  color: "rojo",
  tipo: "conjuro",
  rareza: "comun",
  reglas: "Lightning Bolt hace 3 puntos de daño a cualquier objetivo.",
  valor_mercado: 1
})


