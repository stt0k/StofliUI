import { redirect } from "next/navigation";

export default function DocsPage() {
  // Redireccionar de /docs a /docs/primeros-pasos/introduccion
  redirect("/docs/introduccion");
}
