import { redirect } from "next/navigation";

export default function DocsPage() {
  // Redireccionar de /docs/componentes a /docs/componentes/accordion
  redirect("/docs/componentes/accordion");
} 