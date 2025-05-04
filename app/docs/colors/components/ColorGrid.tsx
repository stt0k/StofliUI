import React, { memo } from "react";
import ColorFamily from "./ColorFamily";

interface ColorInfo {
  name: string;
  shades: {
    level: string | number;
    hex: string;
    rgb: string;
    hsl: string;
    oklch: string;
  }[];
}

interface ColorGridProps {
  colors: ColorInfo[];
  selectedFamily: string | null;
  format: "hex" | "rgb" | "hsl" | "oklch";
  copiedColor: string | null;
  onCopy: (value: string) => void;
}

const ColorGrid: React.FC<ColorGridProps> = memo(
  ({ colors, selectedFamily, format, copiedColor, onCopy }) => {
    // Filtrar por familia seleccionada si es necesario
    const filteredColors = selectedFamily
      ? colors.filter((c) => c.name === selectedFamily)
      : colors;

    return (
      <div>
        {filteredColors.map((color) => (
          <ColorFamily
            key={color.name}
            name={color.name}
            shades={color.shades}
            format={format}
            copiedColor={copiedColor}
            onCopy={onCopy}
          />
        ))}
      </div>
    );
  }
);

ColorGrid.displayName = "ColorGrid";

export default ColorGrid;
