"use client";

import dynamic from "next/dynamic";
import type { AccordionProps } from "@/components/sections/accordion";

const AccordionComponent = dynamic(
  () => import("@/components/sections/accordion"),
  {
    loading: () => <div>Cargando...</div>,
    ssr: false,
  }
);

export function Accordion(props: AccordionProps) {
  return <AccordionComponent {...props} />;
}

// Puedes añadir más componentes del cliente aquí
// export function Modal(props: ModalProps) { ... }
// export function Tabs(props: TabsProps) { ... }
