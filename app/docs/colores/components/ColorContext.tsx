"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  useRef,
} from "react";
import { ColorInfo, ColorFormat, colors as allColors } from "./ColorData";

interface ColorContextType {
  colors: ColorInfo[];
  selectedFamily: string | null;
  copiedColor: string | null;
  activeFormat: ColorFormat;
  setSelectedFamily: (family: string | null) => void;
  setCopiedColor: (color: string | null) => void;
  setActiveFormat: (format: ColorFormat) => void;
  handleCopy: (value: string) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [activeFormat, setActiveFormat] = useState<ColorFormat>("hex");
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isProcessingRef = useRef<boolean>(false);

  // Manejar la copia al portapapeles
  const handleCopy = useCallback((value: string) => {
    // Prevenir múltiples clics rápidos
    if (isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;

    // Limpiar cualquier timeout anterior
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = null;
    }

    navigator.clipboard.writeText(value);
    setCopiedColor(value);

    copyTimeoutRef.current = setTimeout(() => {
      setCopiedColor(null);
      isProcessingRef.current = false;
      copyTimeoutRef.current = null;
    }, 2000);
  }, []);

  // Limpiar el timeout al desmontar
  React.useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  // Memoizar valores del contexto para evitar renderizados innecesarios
  const contextValue = useMemo(
    () => ({
      colors: allColors,
      selectedFamily,
      copiedColor,
      activeFormat,
      setSelectedFamily,
      setCopiedColor,
      setActiveFormat,
      handleCopy,
    }),
    [selectedFamily, copiedColor, activeFormat, handleCopy]
  );

  return (
    <ColorContext.Provider value={contextValue}>
      {children}
    </ColorContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useColorContext = () => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error("useColorContext debe usarse dentro de un ColorProvider");
  }
  return context;
};
