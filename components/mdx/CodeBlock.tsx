"use client";

import React, { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = async () => {
    try {
      if (preRef.current) {
        const text = preRef.current.textContent || "";
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  return (
    <div className="relative group">
      <pre
        ref={preRef}
        className={`${className} bg-zinc-900 rounded-lg p-4 overflow-x-auto mb-4`}
      >
        <code className={className}>
          {typeof children === "string" ? children.trim() : children}
        </code>
      </pre>
      <motion.button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 p-2 rounded-lg bg-zinc-700/50 transition-colors duration-300 hover:bg-zinc-700 cursor-pointer"
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
                <Check className="h-5 w-5" />
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
                <Copy className="h-5 w-5" />
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
            className="absolute top-14 right-3 bg-zinc-800 text-zinc-300 text-xs font-medium px-2.5 py-1 rounded shadow-lg"
          >
            ¡Copiado!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodeBlock;
