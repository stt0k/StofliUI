"use client";

import React, { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";

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
        {children}
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 p-2 rounded-lg bg-zinc-700/50 transition-colors duration-200 hover:bg-zinc-700 cursor-pointer"
        aria-label="Copiar código"
      >
        {isCopied ? (
          <Check className="h-5 w-5 text-zinc-400" />
        ) : (
          <Copy className="h-5 w-5 text-zinc-400 hover:text-zinc-300" />
        )}
      </button>
    </div>
  );
};

export default CodeBlock;
