"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import PremiumCard from "./PremiumCard";

interface NavLink {
  title: string;
  href: string;
  children?: NavLink[];
}

interface PageNavProps {
  links: NavLink[];
}

export default function PageNav({ links }: PageNavProps) {
  const [activeId, setActiveId] = useState<string>("");
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialScrollDoneRef = useRef<boolean>(false);
  const clickedIdRef = useRef<string | null>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollPosRef = useRef<number>(0);
  const isUserScrollingRef = useRef<boolean>(false);

  // Función para normalizar los hashes (algunos pueden tener # y otros no)
  const normalizeHash = useCallback((hash: string): string => {
    return hash.startsWith("#") ? hash : `#${hash}`;
  }, []);

  // Función para actualizar el ID activo basado en el scroll
  const updateActiveIdFromScroll = useCallback(() => {
    // Detectar si es scroll manual comparando con la posición anterior
    const currentScrollPos = window.scrollY;
    const scrollDiff = Math.abs(currentScrollPos - lastScrollPosRef.current);

    // Si el usuario está scrolleando manualmente (diferencia significativa en poco tiempo)
    if (scrollDiff > 5) {
      isUserScrollingRef.current = true;

      // Si estaba bloqueado por un clic, desbloquearlo inmediatamente
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickedIdRef.current = null;
      }
    }

    // Actualizar posición de scroll para la próxima comparación
    lastScrollPosRef.current = currentScrollPos;

    // Si se acaba de hacer clic en un ID y no es scroll manual, dar prioridad a ese ID
    if (clickedIdRef.current && !isUserScrollingRef.current) {
      return;
    }

    // Obtener todos los IDs válidos de los enlaces en el TOC
    const validIds = new Set<string>();
    const extractIds = (navLinks: NavLink[]) => {
      navLinks.forEach((link) => {
        if (link.href && link.href.startsWith("#")) {
          validIds.add(link.href.substring(1));
        }
        if (link.children && link.children.length > 0) {
          extractIds(link.children);
        }
      });
    };
    extractIds(links);

    // Buscar encabezados que coincidan con los IDs en el TOC
    const headings: HTMLElement[] = [];
    validIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        headings.push(element);
      }
    });

    if (headings.length === 0) return;

    // Ordenar encabezados por posición vertical
    headings.sort((a, b) => {
      const rectA = a.getBoundingClientRect();
      const rectB = b.getBoundingClientRect();
      return rectA.top - rectB.top;
    });

    // Umbrales ajustados para mejor detección
    const topOffset = 100; // Umbral superior más pequeño para ser más sensible
    const bottomOffset = -100; // Umbral inferior para elementos que ya pasaron

    // Buscar el primer encabezado visible (dentro del umbral)
    let activeHeading: HTMLElement | null = null;

    // Primero intentar encontrar un encabezado dentro del umbral ideal
    for (const heading of headings) {
      const rect = heading.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= topOffset) {
        activeHeading = heading;
        break;
      }
    }

    // Si no encontramos uno en el umbral ideal, buscar el último encabezado que haya pasado
    if (!activeHeading) {
      for (let i = headings.length - 1; i >= 0; i--) {
        const rect = headings[i].getBoundingClientRect();
        if (rect.top <= 0 && rect.top >= bottomOffset) {
          activeHeading = headings[i];
          break;
        }
      }
    }

    // Como último recurso, usar el primer encabezado que está por encima de la vista
    if (!activeHeading) {
      let closestAbove: HTMLElement | null = null;
      let closestAboveDistance = -Infinity;

      for (const heading of headings) {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 0 && rect.top > closestAboveDistance) {
          closestAbove = heading;
          closestAboveDistance = rect.top;
        }
      }

      if (closestAbove) {
        activeHeading = closestAbove;
      } else {
        // Si no hay encabezados por encima, usar el primero
        activeHeading = headings[0];
      }
    }

    if (activeHeading && activeHeading.id) {
      const newActiveId = normalizeHash(activeHeading.id);
      setActiveId(newActiveId);
    }
  }, [links, normalizeHash]);

  // Función para verificar si un ID está en el TOC
  const isValidTocId = useCallback(
    (navLinks: NavLink[], id: string): boolean => {
      for (const link of navLinks) {
        const linkId = link.href.startsWith("#")
          ? link.href.substring(1)
          : link.href;
        if (linkId === id) {
          return true;
        }
        if (link.children && link.children.length > 0) {
          if (isValidTocId(link.children, id)) {
            return true;
          }
        }
      }
      return false;
    },
    []
  );

  // Función para manejar el scroll inicial cuando se carga con un hash
  const handleInitialScroll = useCallback(() => {
    if (initialScrollDoneRef.current) return;

    const hash = window.location.hash || "";
    if (!hash) return;

    // Normalizar el hash
    const normalizedHash = normalizeHash(hash);
    const hashId = normalizedHash.substring(1); // Quitar el # inicial

    // Solo procesar si es un ID válido del TOC
    if (!isValidTocId(links, hashId)) return;

    initialScrollDoneRef.current = true;

    // Establecer el hash como ID activo
    setActiveId(normalizedHash);

    // Asegurarse de que todos los iframes y las imágenes se hayan cargado antes de intentar scrollear
    setTimeout(() => {
      const targetElement = document.getElementById(hashId);

      if (targetElement) {
        // Scroll al elemento con un pequeño offset para mejor visualización
        window.scrollTo({
          top:
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            100,
          behavior: "instant",
        });
      }
    }, 500);
  }, [normalizeHash, links, isValidTocId]);

  // Función para manejar cambios en el hash de la URL
  const handleHashChange = useCallback(() => {
    const hash = window.location.hash || "";
    if (!hash) return;

    // Normalizar el hash
    const normalizedHash = normalizeHash(hash);
    const hashId = normalizedHash.substring(1); // Quitar el # inicial

    // Solo actualizar el ID activo si es un ID válido del TOC
    if (isValidTocId(links, hashId)) {
      setActiveId(normalizedHash);
    }
  }, [normalizeHash, links, isValidTocId]);

  // Manejar el evento de scroll
  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      updateActiveIdFromScroll();
    });
  }, [updateActiveIdFromScroll]);

  // Verificar si un enlace o sus hijos están activos
  const isLinkActive = useCallback(
    (link: NavLink): boolean => {
      const normalizedHref = normalizeHash(link.href);
      const normalizedActiveId = normalizeHash(activeId);

      // Comparación directa
      if (normalizedHref === normalizedActiveId) {
        return true;
      }

      // Verificar si es un enlace hijo activo
      if (link.children) {
        return link.children.some((child) => isLinkActive(child));
      }

      return false;
    },
    [activeId, normalizeHash]
  );

  // Manejador de clic en enlaces
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const normalizedHref = normalizeHash(href);

      // Resetear la bandera de scroll manual
      isUserScrollingRef.current = false;

      // Actualizar inmediatamente el ID activo
      setActiveId(normalizedHref);

      // Establecer el ID clickeado como activo (para el scroll automático inicial)
      clickedIdRef.current = normalizedHref;

      // Limpiar el timeout anterior si existe
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }

      // Solo bloquear brevemente para permitir que el scroll automático llegue a su destino
      clickTimeoutRef.current = setTimeout(() => {
        clickedIdRef.current = null;
      }, 800); // Tiempo suficiente para que el scroll automático inicial llegue a su destino

      // Buscar el elemento por ID (sin el #)
      const targetId = normalizedHref.substring(1);
      let targetElement = document.getElementById(targetId);

      // Si no encontramos el elemento, intentamos buscar con selectores alternativos
      if (!targetElement) {
        // Buscar por atributo name
        targetElement = document.querySelector(`[name="${targetId}"]`);

        // Intentar buscar elementos que puedan tener ese ID como parte de su estructura
        if (!targetElement) {
          // Buscar cualquier elemento que contenga el ID
          const allElements = document.querySelectorAll("*[id]");
          // Usar Array.from para convertir NodeList a Array antes de iterar
          Array.from(allElements).some((el) => {
            if (el.id.includes(targetId)) {
              targetElement = el as HTMLElement;
              return true;
            }
            return false;
          });
        }
      }

      if (targetElement) {
        // Actualizar URL pero sin afectar la actualización por scroll
        history.pushState(null, "", normalizedHref);
        targetElement.scrollIntoView({ behavior: "smooth" });
      } else {
        // Si no encontramos el elemento, al menos actualizamos la URL
        history.pushState(null, "", normalizedHref);
        // Y hacemos scroll a la parte superior de la sección
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [normalizeHash]
  );

  // Configurar eventos y efectos
  useEffect(() => {
    // Guardar referencias a los timeouts actuales
    const scrollTimeoutRefValue = scrollTimeoutRef.current;
    const clickTimeoutRefValue = clickTimeoutRef.current;

    // Verificar primero si hay un hash en la URL y manejarlo
    if (window.location.hash) {
      handleInitialScroll();
    }

    // Iniciar con un scan para establecer el enlace activo inicial
    updateActiveIdFromScroll();

    // Verificar periódicamente (útil para contenido que se carga dinámicamente)
    const intervalId = setInterval(() => {
      updateActiveIdFromScroll();
    }, 2000);

    // Configurar eventos
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    // Limpieza
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      clearInterval(intervalId);

      if (scrollTimeoutRefValue) {
        clearTimeout(scrollTimeoutRefValue);
      }
      if (clickTimeoutRefValue) {
        clearTimeout(clickTimeoutRefValue);
      }
    };
  }, [
    handleInitialScroll,
    updateActiveIdFromScroll,
    handleScroll,
    handleHashChange,
  ]);

  // Renderizar un enlace de navegación
  const renderNavLink = useCallback(
    (link: NavLink, depth: number = 0) => {
      const isActive = isLinkActive(link);
      const normalizedHref = normalizeHash(link.href);
      const normalizedActiveId = normalizeHash(activeId);
      const isCurrentActive = normalizedHref === normalizedActiveId;

      const hasChildren = link.children && link.children.length > 0;

      // Solo mostrar el punto para enlaces de nivel secundario o superior
      const showDot = depth > 0 && isCurrentActive;

      return (
        <li key={link.href}>
          <a
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className={`text-sm block py-[3px] transition-opacity ${
              depth > 0 ? "pl-4" : ""
            } ${
              isCurrentActive
                ? "font-medium text-black dark:text-white"
                : isActive
                ? "text-neutral-800 dark:text-neutral-300"
                : "text-neutral-500 dark:text-neutral-400 hover:opacity-80"
            }`}
            data-active={isCurrentActive ? "true" : "false"}
          >
            {showDot && (
              <span className="inline-block w-[3px] h-[3px] bg-black dark:bg-white rounded-full mr-2 align-middle" />
            )}
            {link.title}
          </a>

          {hasChildren && (
            <ul className="mt-1 space-y-0">
              {link.children?.map((child) => renderNavLink(child, depth + 1))}
            </ul>
          )}
        </li>
      );
    },
    [activeId, isLinkActive, handleLinkClick, normalizeHash]
  );

  return (
    <div className="hidden xl:block fixed top-[6.5rem] w-52 z-20 py-2 max-h-[calc(100vh-150px)] overflow-y-auto ml-27 scrollbar-hide">
      <div className="max-h-[calc(100vh-330px)] overflow-y-auto pr-2 scrollbar-hide">
        <h3 className="text-xs uppercase tracking-wider font-medium text-neutral-400 dark:text-neutral-500 mb-4">
          En esta página
        </h3>
        <ul className="space-y-[2px]">
          {links.map((link) => renderNavLink(link))}
        </ul>
      </div>
      <div className="mt-6">
        <PremiumCard />
      </div>
    </div>
  );
}

// CSS personalizado para ocultar scrollbar
const scrollbarHideStyle = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Añadir estilos al documento
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = scrollbarHideStyle;
  document.head.appendChild(style);
}
