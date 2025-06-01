"use client";

import React, { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  "data-language"?: string;
  "data-theme"?: string;
  excludeFromCopy?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = (props) => {
  const { children, className, ...rest } = props;
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  // Verifica si el componente está siendo procesado por rehype-pretty-code
  const isProcessedByPrettyCode = rest["data-language"] || rest["data-theme"];

  // Verifica si está en la página de inicio (w-full o inline-flex indica que está en la página de inicio)
  const isHomePage =
    className?.includes("w-full") || className?.includes("inline-flex");

  const copyToClipboard = async () => {
    try {
      if (preRef.current) {
        // Enfoque simple: buscar específicamente el comando npm sin el símbolo $
        let textToCopy = '';
        
        // Si estamos en la página de inicio con el comando npm
        if (isHomePage && preRef.current.textContent?.includes('npm install')) {
          // Extraer solo el comando npm, ignorando el símbolo $
          const match = preRef.current.textContent.match(/\$?\s*(npm install.*)/);
          if (match && match[1]) {
            textToCopy = match[1].trim();
          } else {
            textToCopy = preRef.current.textContent.trim();
          }
        } else {
          // Para otros bloques de código, usar todo el contenido
          textToCopy = preRef.current.textContent || '';
        }
        
        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  return (
    <div
      className={`relative group ${
        isHomePage
          ? "h-10 flex items-center min-w-[200px] sm:min-w-[220px]"
          : ""
      }`}
    >
      <pre
        ref={preRef}
        className={
          isProcessedByPrettyCode
            ? className
            : `${className} ${
                isHomePage
                  ? "bg-black/80 backdrop-blur-sm rounded-xl py-0 pl-4 pr-10 mb-0 flex items-center whitespace-nowrap border border-zinc-800/40 h-10 w-full overflow-hidden"
                  : "bg-black rounded-lg p-4 overflow-x-auto mb-4"
              }`
        }
        {...rest}
      >
        {isProcessedByPrettyCode ? (
          children
        ) : (
          <code
            className={`${className} ${
              isHomePage ? "text-sm font-medium text-white pl-4" : ""
            }`}
          >
            {typeof children === "string" ? children.trim() : children}
          </code>
        )}
      </pre>
      <motion.button
        onClick={copyToClipboard}
        className={`absolute ${
          isHomePage ? "top-1.5 right-2 p-1" : "top-3 right-3 p-2"
        } rounded-lg bg-zinc-700/50 transition-colors duration-300 hover:bg-zinc-700 cursor-pointer`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        aria-label="Copiar código"
      >
        <div className="relative w-5 h-5">
          <AnimatePresence mode="sync" initial={false}>
            {isCopied ? (
              <motion.div
                key="check"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center text-zinc-400"
              >
                <Check className="h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center text-zinc-400 hover:text-zinc-300"
              >
                <Copy className="h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      <AnimatePresence>
        {isCopied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${
              isHomePage ? "bottom-[-30px]" : "top-14"
            } right-3 bg-zinc-800 text-zinc-300 text-xs font-medium px-2.5 py-1 rounded shadow-lg z-50`}
          >
            ¡Copiado!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodeBlock;
