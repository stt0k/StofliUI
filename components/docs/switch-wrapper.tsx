"use client";

import { useState } from "react";
import Switch from "@/components/sections/Switch";

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

export function SwitchVariantsDemo() {
  const [defaultChecked, setDefaultChecked] = useState(false);
  const [primaryChecked, setPrimaryChecked] = useState(false);
  const [secondaryChecked, setSecondaryChecked] = useState(false);
  const [successChecked, setSuccessChecked] = useState(false);
  const [warningChecked, setWarningChecked] = useState(false);
  const [dangerChecked, setDangerChecked] = useState(false);

  return (
    <div className="space-y-4">
      <Switch
        checked={defaultChecked}
        onChange={setDefaultChecked}
        label="Default"
        variant="default"
      />
      <Switch
        checked={primaryChecked}
        onChange={setPrimaryChecked}
        label="Primary"
        variant="primary"
      />
      <Switch
        checked={secondaryChecked}
        onChange={setSecondaryChecked}
        label="Secondary"
        variant="secondary"
      />
      <Switch
        checked={successChecked}
        onChange={setSuccessChecked}
        label="Success"
        variant="success"
      />
      <Switch
        checked={warningChecked}
        onChange={setWarningChecked}
        label="Warning"
        variant="warning"
      />
      <Switch
        checked={dangerChecked}
        onChange={setDangerChecked}
        label="Danger"
        variant="danger"
      />
    </div>
  );
}

export function SwitchActiveVariantsDemo() {
  const [defaultChecked, setDefaultChecked] = useState(true);
  const [primaryChecked, setPrimaryChecked] = useState(true);
  const [secondaryChecked, setSecondaryChecked] = useState(true);
  const [successChecked, setSuccessChecked] = useState(true);
  const [warningChecked, setWarningChecked] = useState(true);
  const [dangerChecked, setDangerChecked] = useState(true);

  return (
    <div className="space-y-4">
      <Switch
        checked={defaultChecked}
        onChange={setDefaultChecked}
        label="Default (Activo)"
        variant="default"
      />
      <Switch
        checked={primaryChecked}
        onChange={setPrimaryChecked}
        label="Primary (Activo)"
        variant="primary"
      />
      <Switch
        checked={secondaryChecked}
        onChange={setSecondaryChecked}
        label="Secondary (Activo)"
        variant="secondary"
      />
      <Switch
        checked={successChecked}
        onChange={setSuccessChecked}
        label="Success (Activo)"
        variant="success"
      />
      <Switch
        checked={warningChecked}
        onChange={setWarningChecked}
        label="Warning (Activo)"
        variant="warning"
      />
      <Switch
        checked={dangerChecked}
        onChange={setDangerChecked}
        label="Danger (Activo)"
        variant="danger"
      />
    </div>
  );
}
