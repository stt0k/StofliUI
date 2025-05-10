import React, { memo, useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ColorCardProps {
  shade: {
    level: string | number;
    hex: string;
    rgb: string;
    hsl: string;
    oklch: string;
  };
  format: "hex" | "rgb" | "hsl" | "oklch";
  copiedColor: string | null;
  onCopy: (value: string) => void;
}

const ColorCard: React.FC<ColorCardProps> = memo(
  ({ shade, format, copiedColor, onCopy }) => {
    const [showCopiedOverlay, setShowCopiedOverlay] = useState(false);

    // Sincronizar el estado local con el estado del contexto
    useEffect(() => {
      const isCopied = copiedColor === shade[format];
      setShowCopiedOverlay(isCopied);
    }, [copiedColor, shade, format]);

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onCopy(shade[format]);
    };

    return (
      <div className="relative group overflow-hidden rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
        {/* Fondo de color */}
        <div
          className="h-16 sm:h-20 md:h-24 w-full transition-transform duration-300 hover:scale-105"
          style={{ backgroundColor: shade.hex }}
        ></div>

        {/* Panel de información */}
        <div className="p-2 md:p-3 bg-white border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">
              {shade.level}
            </span>
            {/* Botón de copiar */}
            <button
              onClick={handleClick}
              className="p-1 md:p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Copiar"
            >
              <div className="relative w-3.5 h-3.5">
                <AnimatePresence initial={false} mode="sync">
                  {copiedColor === shade[format] ? (
                    <motion.div
                      key="check"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex items-center justify-center text-green-500"
                    >
                      <Check className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex items-center justify-center text-gray-500 group-hover:text-gray-700 dark:text-zinc-400 dark:group-hover:text-zinc-100"
                    >
                      <Copy className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </div>
          <div
            className="font-mono text-xs text-gray-600 dark:text-zinc-400 break-all select-all cursor-pointer truncate md:truncate-none"
            onClick={() => onCopy(shade[format])}
            title={shade[format]}
          >
            {shade[format]}
          </div>
        </div>

        {/* Indicador de copiado */}
        <AnimatePresence>
          {showCopiedOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/10 pointer-events-none rounded-lg overflow-hidden"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white/80 dark:bg-white/20 backdrop-blur-md border border-white/50 dark:border-white/30 text-gray-800 dark:text-white text-xs md:text-sm font-medium px-2 py-1 md:px-3 md:py-1.5 rounded-lg shadow-lg"
              >
                ¡Copiado!
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ColorCard.displayName = "ColorCard";

export default ColorCard;
