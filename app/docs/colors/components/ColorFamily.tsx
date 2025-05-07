import React, { memo } from "react";
import ColorCard from "./ColorCard";

interface ColorShade {
  level: string | number;
  hex: string;
  rgb: string;
  hsl: string;
  oklch: string;
}

interface ColorFamilyProps {
  name: string;
  shades: ColorShade[];
  format: "hex" | "rgb" | "hsl" | "oklch";
  copiedColor: string | null;
  onCopy: (value: string) => void;
}

const ColorFamily: React.FC<ColorFamilyProps> = memo(
  ({ name, shades, format, copiedColor, onCopy }) => {
    return (
      <div className="mb-10 md:mb-16">
        <div className="flex items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold capitalize text-black dark:text-white">
            {name}
          </h2>
          <div className="h-0.5 bg-gradient-to-r from-zinc-700 to-transparent flex-grow ml-4"></div>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-11 gap-2 md:gap-3">
          {shades.map((shade) => (
            <ColorCard
              key={`${name}-${shade.level}`}
              shade={shade}
              format={format}
              copiedColor={copiedColor}
              onCopy={onCopy}
            />
          ))}
        </div>
      </div>
    );
  }
);

ColorFamily.displayName = "ColorFamily";

export default ColorFamily;
