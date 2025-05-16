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
  const lastClickedRef = useRef<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Función para normalizar los hashes (algunos pueden tener # y otros no)
  const normalizeHash = useCallback((hash: string): string => {
    return hash.startsWith("#") ? hash : `#${hash}`;
  }, []);

  // Función para verificar si estamos en la URL correcta
  const updateActiveIdFromHash = useCallback(() => {
    const hash = window.location.hash || "";
    if (hash) {
      // Ignorar hashes de Radix UI
      if (hash.includes("radix-:") || hash.includes("-content-code")) {
        if (lastClickedRef.current) {
          // Si tenemos un último hash válido, usarlo en lugar del hash de Radix
          setActiveId(lastClickedRef.current);
          return;
        }
      }

      const normalizedHash = normalizeHash(hash);
      setActiveId(normalizedHash);
    } else {
      // Si no hay hash, establecer el primer enlace como activo
      if (links.length > 0) {
        setActiveId(links[0].href);
      }
    }
  }, [links, normalizeHash]);

  // Función para actualizar manualmente el ID activo
  const forceUpdateActiveId = useCallback(
    (id: string) => {
      const normalizedId = normalizeHash(id);
      setActiveId(normalizedId);
      // Guardar el último ID válido para referencias futuras
      lastClickedRef.current = normalizedId;
    },
    [normalizeHash]
  );

  // Función para verificar si un enlace o sus hijos están activos
  const isLinkActive = useCallback(
    (link: NavLink): boolean => {
      const normalizedHref = normalizeHash(link.href);
      const normalizedActiveId = normalizeHash(activeId);

      // Comparación directa
      if (normalizedHref === normalizedActiveId) {
        return true;
      }

      // Verificar si activeId es un hash de Radix pero contiene el ID que buscamos
      const hrefWithoutHash = link.href.replace("#", "");
      if (normalizedActiveId.includes(hrefWithoutHash)) {
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

  // Función para forzar una actualización del estado después del clic
  const forceLinkActive = useCallback(
    (href: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Actualizar inmediatamente para la respuesta visual
      forceUpdateActiveId(href);

      // Y programar otra actualización para asegurarnos de que persista
      timeoutRef.current = setTimeout(() => {
        forceUpdateActiveId(href);
      }, 300);
    },
    [forceUpdateActiveId]
  );

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
    // Evitar verificaciones demasiado frecuentes
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
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
        const currentNormalizedId = normalizeHash(activeId);

        if (newActiveId !== currentNormalizedId) {
          forceUpdateActiveId(newActiveId);

          // Actualizar la URL sin recargar la página (solo si es diferente)
          if (normalizeHash(window.location.hash) !== newActiveId) {
            history.replaceState(null, "", newActiveId);
          }
        }
      }
    }, 100); // Pequeño retraso para limitar la frecuencia de las actualizaciones
  }, [activeId, findVisibleHeadings, forceUpdateActiveId, normalizeHash]);

  useEffect(() => {
    // Actualizar el enlace activo basado en el hash de la URL
    updateActiveIdFromHash();

    // Manejador de cambio de hash
    const handleHashChange = () => {
      const hash = window.location.hash;

      // Si el hash es de Radix pero tenemos un último hash válido, usarlo
      if (
        (hash.includes("radix-:") || hash.includes("-content-code")) &&
        lastClickedRef.current
      ) {
        // No actualizar el activeId, mantener el último valor válido
        // Opcionalmente, reemplazar el hash de Radix en la URL
        history.replaceState(null, "", lastClickedRef.current);
      } else {
        updateActiveIdFromHash();
      }
    };

    // Verificar visibilidad al cargar
    setTimeout(updateActiveIdFromScroll, 500);

    // También verificar periódicamente (útil para contenido que se carga dinámicamente)
    const intervalId = setInterval(updateActiveIdFromScroll, 2000);

    // Manejar el evento de scroll con throttling
    const handleScroll = () => {
      updateActiveIdFromScroll();
    };

    // Configurar eventos
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("DOMContentLoaded", updateActiveIdFromScroll);
    window.addEventListener("load", updateActiveIdFromScroll);

    // Limpieza
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("DOMContentLoaded", updateActiveIdFromScroll);
      window.removeEventListener("load", updateActiveIdFromScroll);
      clearInterval(intervalId);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [
    links,
    updateActiveIdFromHash,
    updateActiveIdFromScroll,
    forceUpdateActiveId,
    activeId,
  ]);

  // Manejador de clic en enlaces
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const normalizedHref = normalizeHash(href);

      // Guardar el href que el usuario intentó visitar
      lastClickedRef.current = normalizedHref;

      // Forzar actualización del estado (con persistencia)
      forceLinkActive(normalizedHref);

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
        // Actualizar URL y hacer scroll al elemento
        history.pushState(null, "", normalizedHref);
        targetElement.scrollIntoView({ behavior: "smooth" });
      } else {
        // Si no encontramos el elemento, al menos actualizamos la URL
        history.pushState(null, "", normalizedHref);
        // Y hacemos scroll a la parte superior de la sección
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [normalizeHash, forceLinkActive]
  );

  // Renderizar un enlace de navegación
  const renderNavLink = useCallback(
    (link: NavLink, depth: number = 0) => {
      const isActive = isLinkActive(link);
      const normalizedHref = normalizeHash(link.href);
      const normalizedActiveId = normalizeHash(activeId);
      const isCurrentActive =
        normalizedHref === normalizedActiveId ||
        lastClickedRef.current === normalizedHref;

      const hasChildren = link.children && link.children.length > 0;

      return (
        <li key={link.href} className={`${depth > 0 ? "ml-5" : ""}`}>
          <a
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className={`text-sm block py-[3px] transition-opacity ${
              isCurrentActive
                ? "font-medium text-black dark:text-white"
                : isActive
                ? "text-neutral-800 dark:text-neutral-300"
                : "text-neutral-500 dark:text-neutral-400 hover:opacity-80"
            }`}
            data-active={isCurrentActive ? "true" : "false"}
          >
            {isCurrentActive && (
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
    <div className="hidden lg:block fixed top-[9.5rem] right-[20rem] w-48 z-20">
      <div className="py-2 max-h-[calc(100vh-120px)] overflow-y-auto">
        <h3 className="text-xs uppercase tracking-wider font-medium text-neutral-400 dark:text-neutral-500 mb-4">
          En esta página
        </h3>
        <ul className="space-y-[2px]">
          {links.map((link) => renderNavLink(link))}
        </ul>
      </div>
    </div>
  );
}
