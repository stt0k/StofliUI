import React, { memo } from "react";
import { Palette } from "lucide-react";

interface ColorSelectorProps {
  colorNames: string[];
  selectedFamily: string | null;
  onSelect: (family: string | null) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = memo(
  ({ colorNames, selectedFamily, onSelect }) => {
    return (
      <div className="bg-white border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-xl p-4 md:p-6 shadow-lg dark:shadow-2xl">
        <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
          <Palette className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-500" />
          Selecciona una familia
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onSelect(null)}
            className={`px-2 py-1.5 md:px-3 md:py-2 rounded-md text-xs md:text-sm font-medium transition-colors ${
              selectedFamily === null
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:text-gray-800 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            Todos
          </button>
          {colorNames.map((name) => (
            <button
              key={name}
              onClick={() => onSelect(name)}
              className={`px-2 py-1.5 md:px-3 md:py-2 rounded-md text-xs md:text-sm font-medium capitalize transition-colors ${
                selectedFamily === name
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:text-gray-800 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    );
  }
);

ColorSelector.displayName = "ColorSelector";

export default ColorSelector;
