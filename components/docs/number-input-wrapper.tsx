"use client";

import { useState } from "react";
import NumberInput from "@/components/sections/Number-input";

// Componente controlado con visualización del valor actual
export function NumberInputControlledDemo() {
  const [value, setValue] = useState(10);

  return (
    <>
      <NumberInput
        label="Valor controlado"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
      <p className="text-sm mt-2">
        Valor actual: <span className="font-semibold">{value}</span>
      </p>
    </>
  );
}

// Componente para visualización de porcentaje
export function NumberInputPercentageDemo() {
  const [value, setValue] = useState(25);

  return (
    <div className="relative">
      <NumberInput
        label="Porcentaje"
        value={value}
        min={0}
        max={100}
        onChange={setValue}
      />
      <div className="absolute right-12 top-[38px] text-sm text-neutral-500">
        %
      </div>
    </div>
  );
}

// Componente para visualización de moneda (Euro)
export function NumberInputCurrencyDemo() {
  const [value, setValue] = useState(99.95);

  return (
    <div className="relative">
      <NumberInput
        label="Precio"
        value={value}
        min={0}
        step={0.01}
        onChange={setValue}
      />
      <div className="absolute right-12 top-[38px] text-sm text-neutral-500">
        €
      </div>
    </div>
  );
}

// Componente para visualización de valores con signo +/-
export function NumberInputSignedDemo() {
  const [value, setValue] = useState(0);

  const formattedValue = value > 0 ? `+${value}` : value.toString();

  return (
    <div>
      <label className="block mb-1 font-medium text-sm text-neutral-700 dark:text-neutral-300">
        Valor con signo
      </label>
      <div className="flex items-center gap-2">
        <NumberInput value={value} onChange={setValue} />
        <div className="text-sm font-medium">{formattedValue}</div>
      </div>
    </div>
  );
}
