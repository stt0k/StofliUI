"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";

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

  // Función para normalizar los hashes (algunos pueden tener # y otros no)
  const normalizeHash = useCallback((hash: string): string => {
    return hash.startsWith("#") ? hash : `#${hash}`;
  }, []);

  // Función para verificar todos los encabezados y encontrar el visible
  const findVisibleHeadings = useCallback(() => {
    try {
      // Obtener todos los encabezados con ID y elementos específicos que sabemos que nos interesan
      const targetIds = links
        .map((link) => link.href.replace("#", ""))
        .concat(
          ...links.flatMap((link) =>
            link.children
              ? link.children.map((child) => child.href.replace("#", ""))
              : []
          )
        );

      // Crear selectores para IDs exactos
      const exactSelectors = targetIds.map((id) => `[id='${id}']`).join(", ");

      // Selectores de respaldo
      const fallbackSelectors = [
        "h1[id]",
        "h2[id]",
        "h3[id]",
        "h4[id]",
        "h5[id]",
        "h6[id]",
        "div[id]",
        "[role=heading][id]",
      ].join(", ");

      // Combinar selectores
      const combinedSelector = exactSelectors
        ? `${exactSelectors}, ${fallbackSelectors}`
        : fallbackSelectors;

      // Buscar elementos con estos selectores
      const headings = Array.from(
        document.querySelectorAll(combinedSelector)
      ).filter((el) => {
        // Filtrar los IDs que parecen ser de Radix UI u otros IDs dinámicos
        const id = el.id;
        return (
          !id.includes("radix-:") &&
          !id.includes("-content-code") &&
          !id.includes(":")
        );
      });

      // Si aún no encontramos encabezados, buscar todos los elementos con ID
      if (headings.length === 0) {
        const allWithIds = Array.from(
          document.querySelectorAll("*[id]")
        ).filter((el) => {
          const id = el.id;
          return (
            !id.includes("radix-:") &&
            !id.includes("-content-code") &&
            !id.includes(":")
          );
        });

        headings.push(...allWithIds);
      }

      if (headings.length === 0) return null;

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
      let activeHeading = null;

      // Primero intentar encontrar un encabezado dentro del umbral ideal
      for (const heading of Array.from(headings)) {
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
        let closestAbove = null;
        let closestAboveDistance = -Infinity;

        for (const heading of Array.from(headings)) {
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

      return activeHeading;
    } catch (error) {
      console.error("Error finding visible headings:", error);
      return null;
    }
  }, [links]);

  // Función para actualizar el ID activo basado en el scroll
  const updateActiveIdFromScroll = useCallback(() => {
    const activeHeading = findVisibleHeadings();

    if (activeHeading && "id" in activeHeading && activeHeading.id) {
      // Ignorar IDs de Radix
      if (
        activeHeading.id.includes("radix-:") ||
        activeHeading.id.includes("-content-code")
      ) {
        return;
      }

      const newActiveId = normalizeHash(activeHeading.id);
      setActiveId(newActiveId);
    }
  }, [findVisibleHeadings, normalizeHash]);

  // Función para manejar el scroll inicial cuando se carga con un hash
  const handleInitialScroll = useCallback(() => {
    if (initialScrollDoneRef.current) return;
    
    const hash = window.location.hash || "";
    if (!hash) return;
    
    // Ignorar hashes de Radix UI
    if (hash.includes("radix-:") || hash.includes("-content-code")) return;
    
    initialScrollDoneRef.current = true;
    
    // Normalizar el hash para la búsqueda
    const targetId = hash.startsWith("#") ? hash.substring(1) : hash;
    
    // Asegurarse de que todos los iframes y las imágenes se hayan cargado antes de intentar scrollear
    setTimeout(() => {
      let targetElement = document.getElementById(targetId);
      
      // Si no encontramos el elemento, intentamos buscar con selectores alternativos
      if (!targetElement) {
        // Buscar por atributo name
        targetElement = document.querySelector(`[name="${targetId}"]`);
        
        if (!targetElement) {
          // Buscar cualquier elemento que contenga el ID
          const allElements = document.querySelectorAll("*[id]");
          Array.from(allElements).some((el) => {
            if (el.id.includes(targetId) && !el.id.includes("radix-:") && !el.id.includes("-content-code")) {
              targetElement = el as HTMLElement;
              return true;
            }
            return false;
          });
        }
      }
      
      if (targetElement) {
        // Scroll al elemento con un pequeño offset para mejor visualización
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.pageYOffset - 100,
          behavior: "instant"
        });
      }
    }, 500);
  }, []);

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
    
    // Limpieza
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(intervalId);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [
    handleInitialScroll,
    updateActiveIdFromScroll,
    handleScroll
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
    <div className="hidden xl:block fixed top-[9.5rem] w-48 z-20 py-2 max-h-[calc(100vh-120px)] overflow-y-auto">
      <h3 className="text-xs uppercase tracking-wider font-medium text-neutral-400 dark:text-neutral-500 mb-4">
        En esta página
      </h3>
      <ul className="space-y-[2px]">
        {links.map((link) => renderNavLink(link))}
      </ul>
    </div>
  );
}
