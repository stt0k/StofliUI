import React from "react";
const Footer = () => {
  return (
    <footer
      className="bg-white dark:bg-black mt-44 py-4 z-50 border-t border-dashed border-gray-400/20 text-black dark:text-white"
      role="contentinfo"
    >
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} StofliUI. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
