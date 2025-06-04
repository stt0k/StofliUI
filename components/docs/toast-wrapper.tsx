"use client";

import { ToastProvider, useToast } from "@/components/sections/Toast";
import Button from "@/components/sections/Button";
import { ReactNode } from "react";
import {
  BellIcon,
  MessageSquareIcon,
  ShoppingCartIcon,
  StarIcon,
} from "lucide-react";

// Proveedor de toast mejorado que mantiene una lista de toasts
export function ToastWrapper({
  children,
  containerClassName,
}: {
  children: ReactNode;
  containerClassName?: string;
}) {
  return (
    <ToastProvider containerClassName={containerClassName}>
      {children}
    </ToastProvider>
  );
}

export function ToastDemo() {
  const { open } = useToast();

  return (
    <Button
      onClick={() =>
        open({
          title: "Notificación",
          description: "Este es un toast de ejemplo",
        })
      }
      variant="default"
      size="md"
    >
      Mostrar notificación
    </Button>
  );
}

export function ToastCustomDemo() {
  const { open } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          open({
            title: "Actualización completada",
            description: "El sistema se ha actualizado correctamente",
            variant: "default",
            icon: <BellIcon className="h-5 w-5" />,
            containerClassName: "max-w-md",
            toastClassName:
              "bg-white border border-zinc-300 text-neutral-900 rounded-xl shadow-lg px-4 py-3 dark:bg-zinc-900 dark:border-zinc-700 dark:text-neutral-100",
            titleClassName:
              "font-semibold text-base text-neutral-900 dark:text-white",
            descriptionClassName: "text-neutral-600 dark:text-neutral-400",
            iconContainerClassName:
              "bg-blue-100 p-2 rounded-full text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
            closeButtonClassName:
              "hover:bg-zinc-100 p-1 rounded-full opacity-100 dark:hover:bg-zinc-800",
          })
        }
        variant="default"
        size="sm"
      >
        Modo Claro/Oscuro
      </Button>

      <Button
        onClick={() =>
          open({
            title: "¡Éxito!",
            description: "Tu archivo ha sido guardado en la nube",
            variant: "default",
            icon: <ShoppingCartIcon className="h-5 w-5" />,
            containerClassName: "max-w-md",
            toastClassName:
              "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-none shadow-lg rounded-xl px-4 py-3",
            titleClassName: "font-bold text-white",
            descriptionClassName: "text-white/90",
            iconContainerClassName: "bg-white/20 p-2 rounded-full text-white",
            closeButtonClassName:
              "hover:bg-white/20 p-1 rounded-full text-white opacity-100",
          })
        }
        variant="success"
        size="sm"
      >
        Estilo Degradado
      </Button>

      <Button
        onClick={() =>
          open({
            title: "Nueva característica",
            description: "Descubre las nuevas funcionalidades disponibles",
            variant: "default",
            icon: <StarIcon className="h-5 w-5" />,
            containerClassName: "max-w-md",
            toastClassName:
              "bg-black text-white border border-zinc-800 shadow-lg rounded-2xl px-4 py-3",
            titleClassName: "font-semibold text-white",
            descriptionClassName: "text-neutral-400",
            iconContainerClassName: "bg-yellow-500 p-2 rounded-full text-black",
            closeButtonClassName:
              "hover:bg-zinc-800 p-1 rounded-full text-white",
          })
        }
        variant="warning"
        size="sm"
      >
        Estilo Oscuro
      </Button>
    </div>
  );
}

export function ToastVariantsDemo() {
  const { open } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          open({
            title: "Default",
            description: "Toast con estilo por defecto",
            variant: "default",
          })
        }
        variant="default"
        size="sm"
      >
        Default
      </Button>

      <Button
        onClick={() =>
          open({
            title: "Primary",
            description: "Toast con estilo primario",
            variant: "primary",
          })
        }
        variant="primary"
        size="sm"
      >
        Primary
      </Button>

      <Button
        onClick={() =>
          open({
            title: "Secondary",
            description: "Toast con estilo secundario",
            variant: "secondary",
          })
        }
        variant="secondary"
        size="sm"
      >
        Secondary
      </Button>

      <Button
        onClick={() =>
          open({
            title: "Success",
            description: "Operación completada correctamente",
            variant: "success",
          })
        }
        variant="success"
        size="sm"
      >
        Success
      </Button>

      <Button
        onClick={() =>
          open({
            title: "Warning",
            description: "Ten precaución con esta acción",
            variant: "warning",
          })
        }
        variant="warning"
        size="sm"
      >
        Warning
      </Button>

      <Button
        onClick={() =>
          open({
            title: "Danger",
            description: "Error al procesar la información",
            variant: "danger",
          })
        }
        variant="danger"
        size="sm"
      >
        Danger
      </Button>
    </div>
  );
}

export function ToastPositionsDemo() {
  const { open } = useToast();

  return (
    <div className="grid grid-cols-3 gap-2">
      <Button
        onClick={() =>
          open({
            title: "Superior izquierda",
            description: "top-left",
            position: "top-left",
            variant: "primary",
          })
        }
        variant="primary"
        size="sm"
      >
        Superior izquierda
      </Button>

      <Button
        onClick={() =>
          open({
            title: "Superior centro",
            description: "top-center",
            position: "top-center",
            variant: "primary",
          })
        }
        variant="primary"
        size="sm"
      >
        Superior centro
      </Button>

      <Button
        onClick={() =>
          open({
            title: "Superior derecha",
            description: "top-right",
            position: "top-right",
            variant: "success",
          })
        }
        variant="success"
        size="sm"
      >
        Superior derecha
      </Button>

      <Button
        onClick={() =>
          open({
            title: "Inferior izquierda",
            description: "bottom-left",
            position: "bottom-left",
            variant: "warning",
          })
        }
        variant="warning"
        size="sm"
      >
        Inferior izquierda
      </Button>

      <Button
        onClick={() =>
          open({
            title: "Inferior centro",
            description: "bottom-center",
            position: "bottom-center",
            variant: "warning",
          })
        }
        variant="warning"
        size="sm"
      >
        Inferior centro
      </Button>

      <Button
        onClick={() =>
          open({
            title: "Inferior derecha",
            description: "bottom-right",
            position: "bottom-right",
            variant: "danger",
          })
        }
        variant="danger"
        size="sm"
      >
        Inferior derecha
      </Button>
    </div>
  );
}

export function ToastIconsDemo() {
  const { open } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          open({
            title: "Notificación",
            description: "Nueva alerta del sistema",
            variant: "primary",
            icon: <BellIcon className="h-5 w-5" />,
          })
        }
        variant="primary"
        size="sm"
        leftIcon={<BellIcon className="h-4 w-4" />}
      >
        Notificación
      </Button>

      <Button
        onClick={() =>
          open({
            title: "Mensaje recibido",
            description: "Tienes un nuevo mensaje de María",
            variant: "secondary",
            icon: <MessageSquareIcon className="h-5 w-5" />,
          })
        }
        variant="secondary"
        size="sm"
        leftIcon={<MessageSquareIcon className="h-4 w-4" />}
      >
        Mensaje
      </Button>

      <Button
        onClick={() =>
          open({
            title: "Pedido completado",
            description: "Tu pedido #12345 ha sido procesado",
            variant: "success",
            icon: <ShoppingCartIcon className="h-5 w-5" />,
          })
        }
        variant="success"
        size="sm"
        leftIcon={<ShoppingCartIcon className="h-4 w-4" />}
      >
        Pedido
      </Button>

      <Button
        onClick={() =>
          open({
            title: "Producto favorito",
            description: "Producto añadido a favoritos",
            variant: "warning",
            icon: <StarIcon className="h-5 w-5" />,
          })
        }
        variant="warning"
        size="sm"
        leftIcon={<StarIcon className="h-4 w-4" />}
      >
        Favorito
      </Button>
    </div>
  );
}

export function ToastDurationDemo() {
  const { open } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          open({
            title: "Desaparece rápido",
            description: "Este toast desaparece en 2 segundos",
            variant: "primary",
            duration: 2000,
          })
        }
        variant="primary"
        size="sm"
      >
        2 segundos
      </Button>

      <Button
        onClick={() =>
          open({
            title: "Duración larga",
            description: "Este toast permanece durante 10 segundos",
            variant: "success",
            duration: 10000,
          })
        }
        variant="success"
        size="sm"
      >
        10 segundos
      </Button>

      <Button
        onClick={() =>
          open({
            title: "No desaparece",
            description: "Este toast no desaparece automáticamente",
            variant: "warning",
            duration: Infinity,
          })
        }
        variant="warning"
        size="sm"
      >
        Infinito
      </Button>
    </div>
  );
}

export function ToastMultipleDemo() {
  const { open } = useToast();

  const showSequentialToasts = () => {
    open({
      title: "Primer Toast",
      description: "Este es el primer toast",
      position: "bottom-right",
      variant: "primary",
    });

    setTimeout(() => {
      open({
        title: "Segundo Toast",
        description: "Este es el segundo toast",
        position: "bottom-right",
        variant: "success",
      });
    }, 500);

    setTimeout(() => {
      open({
        title: "Tercer Toast",
        description: "Este es el tercer toast",
        position: "bottom-right",
        variant: "warning",
      });
    }, 1000);
  };

  const showPositionedToasts = () => {
    open({
      title: "Superior izquierda",
      description: "Posición top-left",
      position: "top-left",
      variant: "primary",
    });

    open({
      title: "Superior derecha",
      description: "Posición top-right",
      position: "top-right",
      variant: "success",
    });

    open({
      title: "Inferior izquierda",
      description: "Posición bottom-left",
      position: "bottom-left",
      variant: "warning",
    });

    open({
      title: "Inferior derecha",
      description: "Posición bottom-right",
      position: "bottom-right",
      variant: "danger",
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="primary" size="sm" onClick={showSequentialToasts}>
        Mostrar varios toasts
      </Button>

      <Button variant="secondary" size="sm" onClick={showPositionedToasts}>
        Toasts en diferentes posiciones
      </Button>
    </div>
  );
}
