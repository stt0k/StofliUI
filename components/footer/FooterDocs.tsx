import React from "react";
const Footer = () => {
  return (
    <footer
      className="bg-white dark:bg-black mt-44 text-white py-4 z-50 border-t border-dashed border-gray-400/20"
      role="contentinfo"
    >
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} stofli/ui. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
