import React, { memo } from "react";
import { Copy, Check } from "lucide-react";

interface ColorCardProps {
  colorName: string;
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
        <div className="p-2 md:p-3 bg-zinc-900 border border-zinc-800">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs md:text-sm font-semibold text-white">
              {shade.level}
            </span>
            {/* Botón de copiar */}
            <button
              onClick={handleClick}
              className="p-1 md:p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
              aria-label="Copiar"
            >
              {copiedColor === shade[format] ? (
                <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 md:w-3.5 md:h-3.5 text-zinc-400 group-hover:text-zinc-100" />
              )}
            </button>
          </div>
          <div
            className="font-mono text-xs text-zinc-400 break-all select-all cursor-pointer truncate md:truncate-none"
            onClick={() => onCopy(shade[format])}
            title={shade[format]}
          >
            {shade[format]}
          </div>
        </div>

        {/* Indicador de copiado */}
        {copiedColor === shade[format] && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/10 transition-all duration-300 pointer-events-none">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs md:text-sm font-medium px-2 py-1 md:px-3 md:py-1.5 rounded-lg shadow-lg">
              ¡Copiado!
            </div>
          </div>
        )}
      </div>
    );
  }
);

ColorCard.displayName = "ColorCard";

export default ColorCard;
