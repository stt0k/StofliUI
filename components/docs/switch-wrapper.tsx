"use client";

import { useState } from "react";
import Switch from "@/components/sections/switch";

export function SwitchControlledDemo() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="space-y-4">
      <Switch
        checked={isChecked}
        onChange={setIsChecked}
        label={isChecked ? "Activado" : "Desactivado"}
        variant="primary"
      />
      <p className="text-sm text-gray-600 dark:text-gray-400">
        El switch está actualmente:{" "}
        <strong>{isChecked ? "Encendido" : "Apagado"}</strong>
      </p>
    </div>
  );
}
